import { h } from "hastscript";

function normalizeDifficulty(value) {
	const label = String(value || "").trim();
	const normalized = label.toLowerCase();

	if (normalized === "easy") return { label, tone: "easy" };
	if (normalized === "mid") return { label, tone: "mid" };
	if (normalized === "hard") return { label, tone: "hard" };

	return { label, tone: "default" };
}

function getProblemId(number) {
	return `leetcode-${String(number || "").trim()}`;
}

export function LeetCodeComponent(properties, children) {
	const number = String(properties?.number || "").trim();
	const title = String(properties?.title || "").trim();
	const tags = String(properties?.tags || "").trim();
	const difficulty = normalizeDifficulty(properties?.difficulty);

	if (!number || !title || !tags || !difficulty.label) {
		return h(
			"div",
			{ class: "hidden" },
			'Invalid leetcode directive. Use :::leetcode{number="数字" title="题目名" difficulty="难度" tags="标签"}',
		);
	}

	return h("details", { id: getProblemId(number), class: "leetcode-item" }, [
		h("summary", { class: "leetcode-item-summary" }, [
			h("span", { class: "leetcode-item-cell" }, [
				h("span", { class: "leetcode-item-number" }, number),
			]),
			h("span", { class: "leetcode-item-cell leetcode-item-title" }, title),
			h("span", { class: "leetcode-item-cell" }, [
				h(
					"span",
					{
						class: "leetcode-item-difficulty",
						"data-tone": difficulty.tone,
					},
					difficulty.label,
				),
			]),
			h("span", { class: "leetcode-item-cell leetcode-item-tags" }, tags),
		]),
		h("div", { class: "leetcode-item-content" }, children),
	]);
}
