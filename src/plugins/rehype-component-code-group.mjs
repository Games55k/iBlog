import { h } from "hastscript";

const LANGUAGE_LABELS = {
	bash: "Bash",
	c: "C",
	cpp: "C++",
	csharp: "C#",
	cs: "C#",
	css: "CSS",
	go: "Go",
	golang: "Go",
	html: "HTML",
	java: "Java",
	javascript: "JavaScript",
	js: "JavaScript",
	json: "JSON",
	kotlin: "Kotlin",
	lua: "Lua",
	php: "PHP",
	plaintext: "Text",
	ps1: "PowerShell",
	py: "Python",
	python: "Python",
	ruby: "Ruby",
	rs: "Rust",
	rust: "Rust",
	sh: "Shell",
	shell: "Shell",
	shellsession: "Shell",
	sql: "SQL",
	swift: "Swift",
	ts: "TypeScript",
	tsx: "TSX",
	typescript: "TypeScript",
	vue: "Vue",
	xml: "XML",
	yaml: "YAML",
	yml: "YAML",
};

let codeGroupCount = 0;

function isElement(node) {
	return node?.type === "element";
}

function findLanguage(node) {
	if (!isElement(node)) return null;

	const properties = node.properties || {};
	const language = properties["data-language"] || properties.dataLanguage;
	if (typeof language === "string" && language.length > 0) {
		return language;
	}

	for (const child of node.children || []) {
		const nestedLanguage = findLanguage(child);
		if (nestedLanguage) return nestedLanguage;
	}

	const serializedNode = JSON.stringify(node);
	const serializedMatch =
		serializedNode.match(/"data-language":"([^"]+)"/i) ||
		serializedNode.match(/"dataLanguage":"([^"]+)"/i) ||
		serializedNode.match(/data-language=\\?"([^"]+)\\?"/i);
	if (serializedMatch?.[1]) {
		return serializedMatch[1];
	}

	return null;
}

function formatLanguageLabel(language) {
	if (!language) return "Code";

	const normalized = language.toLowerCase();
	return LANGUAGE_LABELS[normalized] || language.toUpperCase();
}

export function CodeGroupComponent(properties, children) {
	const codeBlocks = children.filter(isElement);

	if (codeBlocks.length === 0) {
		return h(
			"div",
			{ class: "hidden" },
			"Invalid code-group directive. (code-group directives must contain fenced code blocks.)",
		);
	}

	const groupId = `code-group-${++codeGroupCount}`;
	const tabs = codeBlocks.map((child, index) => {
		const language = findLanguage(child) || `code-${index + 1}`;
		const label = formatLanguageLabel(language);
		const tabId = `${groupId}-tab-${index}`;
		const panelId = `${groupId}-panel-${index}`;
		const isActive = index === 0;

		return {
			child,
			isActive,
			label,
			language,
			panelId,
			tabId,
		};
	});

	return h(
		"code-group-tabs",
		{ class: "code-group", "data-pagefind-ignore": true },
		[
			h(
				"div",
				{
					class: "code-group-header hide-scrollbar",
					role: "tablist",
					"aria-label": properties?.title || "Code examples",
				},
				tabs.map((tab) =>
					h(
						"button",
						{
							type: "button",
							id: tab.tabId,
							class: `code-group-tab ${tab.isActive ? "is-active" : ""}`,
							role: "tab",
							"aria-controls": tab.panelId,
							"aria-selected": String(tab.isActive),
							tabindex: tab.isActive ? "0" : "-1",
							"data-language": tab.language,
						},
						tab.label,
					),
				),
			),
			h(
				"div",
				{ class: "code-group-body" },
				tabs.map((tab) =>
					h(
						"div",
						{
							id: tab.panelId,
							class: `code-group-panel ${tab.isActive ? "is-active" : ""}`,
							role: "tabpanel",
							"aria-labelledby": tab.tabId,
							"data-language": tab.language,
							hidden: tab.isActive ? undefined : true,
						},
						[tab.child],
					),
				),
			),
		],
	);
}
