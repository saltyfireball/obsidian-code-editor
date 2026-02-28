import hljs from "highlight.js";
import type { HighlightToken } from "./types";

export function highlightCode(
	code: string,
	language: string | undefined,
	autoDetect: boolean
): string {
	if (language && isLanguageSupported(language)) {
		return hljs.highlight(code, { language }).value;
	}
	if (autoDetect && !language) {
		return hljs.highlightAuto(code).value;
	}
	return escapeHtml(code);
}

export function highlightToTokens(
	code: string,
	language: string | undefined,
	autoDetect: boolean
): HighlightToken[] {
	const html = highlightCode(code, language, autoDetect);
	const parsed = new DOMParser().parseFromString(`<pre>${html}</pre>`, "text/html");
	const container = parsed.body.firstElementChild;

	const tokens: HighlightToken[] = [];
	let offset = 0;

	function walk(node: Node, inheritedClasses: string[]) {
		if (node.nodeType === Node.TEXT_NODE) {
			const text = node.textContent ?? "";
			if (text.length > 0) {
				if (inheritedClasses.length > 0) {
					tokens.push({
						text,
						classes: inheritedClasses,
						offset,
						length: text.length,
					});
				}
				offset += text.length;
			}
			return;
		}
		if (node.nodeType === Node.ELEMENT_NODE) {
			const el = node as Element;
			const classes = [...inheritedClasses];
			Array.from(el.classList).forEach((cls) => {
				if (!classes.includes(cls)) {
					classes.push(cls);
				}
			});
			Array.from(node.childNodes).forEach((child) => {
				walk(child, classes);
			});
		}
	}

	if (container) {
		Array.from(container.childNodes).forEach((child) => {
			walk(child, []);
		});
	}

	return tokens;
}

export function isLanguageSupported(lang: string): boolean {
	return hljs.getLanguage(lang) !== undefined;
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}
