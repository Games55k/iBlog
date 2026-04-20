/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
	readonly GITHUB_BRANCH?: string;
	readonly GITHUB_OWNER?: string;
	readonly GITHUB_REPO?: string;
	readonly GITHUB_TOKEN?: string;
	readonly THOUGHTS_DIR?: string;
	readonly THOUGHT_API_TOKEN?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
