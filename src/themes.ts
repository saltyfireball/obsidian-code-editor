import type { CodeEditorTheme, TokenStyle } from "./types";

interface ThemeColors {
	background: string;
	foreground: string;
	keyword: string;
	string: string;
	comment: string;
	function: string;
	variable: string;
	type: string;
	number: string;
	operator: string;
	attribute: string;
	className: string;
	params: string;
}

const THEME_COLORS: Record<CodeEditorTheme, ThemeColors> = {
	"monokai-pro": {
		background: "#2d2a2e",
		foreground: "#c1c0c0",
		keyword: "#ff6188",
		string: "#a9dc76",
		comment: "#727072",
		function: "#a9dc76",
		variable: "#a9dc76",
		type: "#a9dc76",
		number: "#ff6188",
		operator: "#ff6188",
		attribute: "#ab9df2",
		className: "#fcfcfa",
		params: "#c1c0c0",
	},
	"github-dark": {
		background: "#0d1117",
		foreground: "#c9d1d9",
		keyword: "#ff7b72",
		string: "#a5d6ff",
		comment: "#8b949e",
		function: "#d2a8ff",
		variable: "#ffa657",
		type: "#79c0ff",
		number: "#79c0ff",
		operator: "#ff7b72",
		attribute: "#79c0ff",
		className: "#ffa657",
		params: "#c9d1d9",
	},
	"github-light": {
		background: "#ffffff",
		foreground: "#24292f",
		keyword: "#cf222e",
		string: "#0a3069",
		comment: "#6e7781",
		function: "#8250df",
		variable: "#953800",
		type: "#0550ae",
		number: "#0550ae",
		operator: "#cf222e",
		attribute: "#0550ae",
		className: "#953800",
		params: "#24292f",
	},
	"dracula": {
		background: "#282a36",
		foreground: "#f8f8f2",
		keyword: "#ff79c6",
		string: "#f1fa8c",
		comment: "#6272a4",
		function: "#50fa7b",
		variable: "#f8f8f2",
		type: "#8be9fd",
		number: "#bd93f9",
		operator: "#ff79c6",
		attribute: "#50fa7b",
		className: "#8be9fd",
		params: "#f8f8f2",
	},
	"nord": {
		background: "#2e3440",
		foreground: "#d8dee9",
		keyword: "#81a1c1",
		string: "#a3be8c",
		comment: "#616e88",
		function: "#88c0d0",
		variable: "#d8dee9",
		type: "#8fbcbb",
		number: "#b48ead",
		operator: "#81a1c1",
		attribute: "#8fbcbb",
		className: "#8fbcbb",
		params: "#d8dee9",
	},
};

export function getThemeColors(theme: CodeEditorTheme): ThemeColors {
	return THEME_COLORS[theme] || THEME_COLORS["monokai-pro"];
}

export function getForegroundColor(theme: CodeEditorTheme): string {
	return getThemeColors(theme).foreground;
}

export function getStyleMap(theme: CodeEditorTheme): Record<string, TokenStyle> {
	const colors = getThemeColors(theme);

	return {
		"hljs-keyword": { color: colors.keyword, bold: true },
		"hljs-tag": { color: colors.keyword },
		"hljs-selector-tag": { color: colors.keyword, bold: true },
		"hljs-literal": { color: colors.keyword, bold: true },
		"hljs-number": { color: colors.number },
		"hljs-name": { color: colors.keyword },
		"hljs-strong": { color: colors.keyword, bold: true },
		"hljs-code": { color: colors.type },
		"hljs-attribute": { color: colors.attribute },
		"hljs-attr": { color: colors.attribute },
		"hljs-symbol": { color: colors.attribute },
		"hljs-regexp": { color: colors.attribute },
		"hljs-link": { color: colors.attribute },
		"hljs-string": { color: colors.string },
		"hljs-bullet": { color: colors.string },
		"hljs-subst": { color: colors.string },
		"hljs-title": { color: colors.string, bold: true },
		"hljs-section": { color: colors.string, bold: true },
		"hljs-emphasis": { color: colors.string, italic: true },
		"hljs-type": { color: colors.type, bold: true },
		"hljs-built_in": { color: colors.string },
		"hljs-selector-attr": { color: colors.string },
		"hljs-selector-pseudo": { color: colors.string },
		"hljs-addition": { color: colors.string },
		"hljs-variable": { color: colors.variable },
		"hljs-template-tag": { color: colors.string },
		"hljs-template-variable": { color: colors.string },
		"hljs-function": { color: colors.function },
		"hljs-comment": { color: colors.comment },
		"hljs-quote": { color: colors.comment },
		"hljs-deletion": { color: colors.comment },
		"hljs-meta": { color: colors.comment },
		"hljs-doctag": { color: colors.keyword, bold: true },
		"hljs-selector-id": { color: colors.keyword, bold: true },
		"hljs-params": { color: colors.params },
	};
}

export function getCombinedOverrides(theme: CodeEditorTheme): Array<{ match: string[]; style: TokenStyle }> {
	const colors = getThemeColors(theme);

	return [
		{ match: ["hljs-title", "class_"], style: { color: colors.className } },
	];
}
