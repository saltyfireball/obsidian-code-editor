export interface CodeEditorSettings {
	enabled: boolean;
	lineNumbers: boolean;
	wordWrap: boolean;
	theme: CodeEditorTheme;
	additionalExtensions: string[];
}

export type CodeEditorTheme =
	| "monokai-pro"
	| "github-dark"
	| "github-light"
	| "dracula"
	| "nord";

export const DEFAULT_SETTINGS: CodeEditorSettings = {
	enabled: true,
	lineNumbers: true,
	wordWrap: false,
	theme: "monokai-pro",
	additionalExtensions: [],
};

export interface TokenStyle {
	color: string;
	bold?: boolean;
	italic?: boolean;
}

export interface HighlightToken {
	text: string;
	classes: string[];
	offset: number;
	length: number;
}
