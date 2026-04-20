import { Buffer } from "node:buffer";
import type { APIRoute } from "astro";

export const prerender = false;

type AddThoughtPayload = {
	content?: string;
	tags?: string[];
	name?: string;
};

const DEFAULT_BRANCH = "main";
const DEFAULT_THOUGHTS_DIR = "src/content/thoughts";

function json(body: unknown, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	});
}

function methodNotAllowed(body: unknown) {
	return new Response(JSON.stringify(body), {
		status: 405,
		headers: {
			Allow: "POST, OPTIONS",
			"Content-Type": "application/json; charset=utf-8",
		},
	});
}

function getBearerToken(header: string | null) {
	if (!header?.startsWith("Bearer ")) {
		return "";
	}

	return header.slice("Bearer ".length).trim();
}

function normalizeTag(tag: string) {
	return tag.trim().replace(/^#+/, "").slice(0, 20);
}

function sanitizeFilenamePart(value: string) {
	return value
		.normalize("NFKC")
		.trim()
		.replace(/[<>:"/\\|?*]/g, " ")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "")
		.slice(0, 48);
}

function extractFilenameSeed(content: string, customName?: string) {
	const preferred = customName?.trim();
	if (preferred) {
		return sanitizeFilenamePart(preferred);
	}

	const firstLine = content
		.split("\n")
		.map((line) => line.trim())
		.find(Boolean);

	if (!firstLine) {
		return "thought";
	}

	return (
		sanitizeFilenamePart(
			firstLine.replace(/^#+\s*/, "").replace(/[*_~`[\]()!]/g, ""),
		) || "thought"
	);
}

function buildFrontmatterContent(
	content: string,
	tags: string[],
	published: string,
) {
	const frontmatter = [
		"---",
		`published: ${published}`,
		"draft: false",
		"tags:",
		...tags.map((tag) => `  - ${JSON.stringify(tag)}`),
		"---",
		"",
		content.trim(),
		"",
	];

	return frontmatter.join("\n");
}

function joinGitHubPath(...segments: string[]) {
	return segments.map((segment) => encodeURIComponent(segment)).join("/");
}

export const GET: APIRoute = async () => {
	return methodNotAllowed({
		success: false,
		message:
			"请使用 POST /api/add-thought/ 提交碎碎念，浏览器地址栏直接访问不是有效测试方式。",
	});
};

export const OPTIONS: APIRoute = async () => {
	return new Response(null, {
		status: 204,
		headers: {
			Allow: "POST, OPTIONS",
		},
	});
};

export const POST: APIRoute = async ({ request }) => {
	const apiToken = import.meta.env.THOUGHT_API_TOKEN;
	const githubToken = import.meta.env.GITHUB_TOKEN;
	const githubOwner = import.meta.env.GITHUB_OWNER;
	const githubRepo = import.meta.env.GITHUB_REPO;
	const githubBranch = import.meta.env.GITHUB_BRANCH || DEFAULT_BRANCH;
	const thoughtsDir = import.meta.env.THOUGHTS_DIR || DEFAULT_THOUGHTS_DIR;

	if (!apiToken || !githubToken || !githubOwner || !githubRepo) {
		return json(
			{
				success: false,
				message:
					"服务端环境变量未配置完整，需要 THOUGHT_API_TOKEN、GITHUB_TOKEN、GITHUB_OWNER、GITHUB_REPO。",
			},
			500,
		);
	}

	if (getBearerToken(request.headers.get("Authorization")) !== apiToken) {
		return json(
			{
				success: false,
				message: "API Token 无效。",
			},
			401,
		);
	}

	let payload: AddThoughtPayload;

	try {
		payload = await request.json();
	} catch {
		return json(
			{
				success: false,
				message: "请求体不是合法 JSON。",
			},
			400,
		);
	}

	const content = payload.content?.trim() || "";
	if (!content) {
		return json(
			{
				success: false,
				message: "内容不能为空。",
			},
			400,
		);
	}

	const tags = Array.from(
		new Set(
			(payload.tags || [])
				.map((tag) => normalizeTag(tag))
				.filter(Boolean)
				.slice(0, 8),
		),
	);

	if (tags.length === 0) {
		tags.push("日常");
	}

	const now = new Date();
	const datePrefix = now.toISOString().slice(0, 10);
	const timeSuffix = now.toTimeString().slice(0, 8).replace(/:/g, "");
	const filenameSeed = extractFilenameSeed(content, payload.name);
	const filename = `${datePrefix}-${timeSuffix}-${filenameSeed}.md`;
	const fileContent = buildFrontmatterContent(content, tags, now.toISOString());
	const contentPath = `${thoughtsDir}/${filename}`;
	const encodedPath = joinGitHubPath(...contentPath.split("/"));

	const response = await fetch(
		`https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${encodedPath}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${githubToken}`,
				"Content-Type": "application/json",
				"User-Agent": `${githubOwner}-${githubRepo}-thought-publisher`,
				"X-GitHub-Api-Version": "2022-11-28",
			},
			body: JSON.stringify({
				message: `feat: add thought ${filename}`,
				content: Buffer.from(fileContent, "utf-8").toString("base64"),
				branch: githubBranch,
			}),
		},
	);

	const data = await response.json();

	if (!response.ok) {
		const message =
			typeof data?.message === "string"
				? data.message
				: "GitHub API 请求失败。";

		return json(
			{
				success: false,
				message,
			},
			response.status,
		);
	}

	return json({
		success: true,
		data: {
			filename,
			github: {
				commitUrl: data.commit?.html_url || "",
				fileUrl: data.content?.html_url || "",
			},
		},
	});
};
