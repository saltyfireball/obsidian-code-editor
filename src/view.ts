import { TextFileView, WorkspaceLeaf, Notice } from "obsidian";
import {
	Decoration,
	DecorationSet,
	EditorView,
	ViewPlugin,
	ViewUpdate,
	keymap,
	lineNumbers,
	highlightActiveLine,
	drawSelection,
} from "@codemirror/view";
import { EditorState, Range, Compartment } from "@codemirror/state";
import {
	defaultKeymap,
	history,
	historyKeymap,
	indentWithTab,
} from "@codemirror/commands";
import { indentOnInput, bracketMatching } from "@codemirror/language";
import type { CodeEditorSettings, CodeEditorTheme, TokenStyle } from "./types";
import { getLanguageFromExtension } from "./extensions";
import { highlightToTokens } from "./highlighter";
import { getStyleMap, getCombinedOverrides, getForegroundColor } from "./themes";

// Check if content appears to be binary (contains null bytes)
function isBinaryContent(content: string, checkLength = 8192): boolean {
	const checkPortion = content.slice(0, checkLength);
	return checkPortion.includes("\0");
}

export const CODE_EDITOR_VIEW_TYPE = "code-editor";

// Resolve token classes to inline style string
function resolveStyle(
	classes: string[],
	styleMap: Record<string, TokenStyle>,
	combinedOverrides: Array<{ match: string[]; style: TokenStyle }>,
): string | undefined {
	let resolved: TokenStyle | undefined;

	// Check combined overrides first
	for (let i = 0; i < combinedOverrides.length; i++) {
		const override = combinedOverrides[i]!;
		let allMatch = true;
		for (let j = 0; j < override.match.length; j++) {
			if (classes.indexOf(override.match[j]!) === -1) {
				allMatch = false;
				break;
			}
		}
		if (allMatch) {
			resolved = override.style;
			break;
		}
	}

	// Check individual classes
	if (!resolved) {
		for (let i = 0; i < classes.length; i++) {
			const s = styleMap[classes[i]!];
			if (s) {
				resolved = s;
				break;
			}
		}
	}

	if (!resolved) return undefined;

	let style = "color: " + resolved.color;
	if (resolved.bold) style += "; font-weight: bold";
	if (resolved.italic) style += "; font-style: italic";
	return style;
}

// Build syntax highlighting decorations for entire document
function buildHighlightDecorations(
	view: EditorView,
	language: string,
	theme: CodeEditorTheme,
): DecorationSet {
	const styleMap = getStyleMap(theme);
	const combinedOverrides = getCombinedOverrides(theme);
	const foregroundColor = getForegroundColor(theme);

	const decorations: Range<Decoration>[] = [];
	const doc = view.state.doc;
	const code = doc.toString();

	if (!code) {
		return Decoration.none;
	}

	// Apply base foreground color to entire document
	decorations.push(
		Decoration.mark({
			attributes: { style: `color: ${foregroundColor}` },
		}).range(0, code.length),
	);

	// Get tokens from highlight.js
	const tokens = highlightToTokens(code, language, true);

	for (let t = 0; t < tokens.length; t++) {
		const token = tokens[t]!;
		const tokenFrom = token.offset;
		const tokenTo = tokenFrom + token.length;

		if (tokenFrom >= tokenTo) continue;
		if (tokenTo > code.length) continue;

		const style = resolveStyle(token.classes, styleMap, combinedOverrides);
		if (!style) continue;

		decorations.push(
			Decoration.mark({
				attributes: { style },
			}).range(tokenFrom, tokenTo),
		);
	}

	decorations.sort((a, b) => a.from - b.from || a.to - b.to);
	return Decoration.set(decorations);
}

// Create syntax highlighting ViewPlugin for a specific language and theme
function createSyntaxHighlightPlugin(language: string, theme: CodeEditorTheme) {
	return ViewPlugin.fromClass(
		class {
			decorations: DecorationSet;

			constructor(view: EditorView) {
				this.decorations = buildHighlightDecorations(view, language, theme);
			}

			update(update: ViewUpdate) {
				if (update.docChanged || update.viewportChanged) {
					this.decorations = buildHighlightDecorations(
						update.view,
						language,
						theme,
					);
				}
			}
		},
		{
			decorations: (v) => v.decorations,
		},
	);
}

// Keymaps combining default bindings with tab handling
const editorKeymaps = keymap.of([
	...defaultKeymap,
	...historyKeymap,
	indentWithTab,
]);

export class CodeEditorView extends TextFileView {
	private editorView: EditorView | null = null;
	private readonly settings: CodeEditorSettings;
	private currentContent = "";
	private lineNumbersCompartment = new Compartment();
	private wordWrapCompartment = new Compartment();

	constructor(leaf: WorkspaceLeaf, settings: CodeEditorSettings) {
		super(leaf);
		this.settings = settings;
	}

	getViewType(): string {
		return CODE_EDITOR_VIEW_TYPE;
	}

	getDisplayText(): string {
		return this.file?.name || "Code Editor";
	}

	getIcon(): string {
		return "file-code";
	}

	async onOpen(): Promise<void> {
		const container = this.contentEl;
		container.empty();
		container.addClass("ce-editor-view");

		// Create editor container
		const editorContainer = container.createDiv("ce-editor-container");

		// Determine language from file extension
		const ext = this.file?.extension ?? "";
		const language = getLanguageFromExtension(ext);

		// Build extensions array
		const extensions = [
			// Line numbers (configurable)
			this.lineNumbersCompartment.of(
				this.settings.lineNumbers ? lineNumbers() : [],
			),
			// Word wrap (configurable)
			this.wordWrapCompartment.of(
				this.settings.wordWrap ? EditorView.lineWrapping : [],
			),
			// Core editor features
			highlightActiveLine(),
			drawSelection(),
			EditorState.allowMultipleSelections.of(true),
			indentOnInput(),
			bracketMatching(),
			// Undo/redo history
			history(),
			// Keymaps
			editorKeymaps,
			// Syntax highlighting using highlight.js
			createSyntaxHighlightPlugin(language, this.settings.theme),
			// Save on change
			EditorView.updateListener.of((update) => {
				if (update.docChanged) {
					this.currentContent = update.state.doc.toString();
					this.requestSave();
				}
			}),
			// Theme - use Obsidian's variables (fonts handled via CSS)
			EditorView.theme({
				"&": {
					height: "100%",
				},
				".cm-scroller": {
					overflow: "auto",
				},
				".cm-content": {
					caretColor: "var(--text-normal)",
				},
				"&.cm-focused .cm-cursor": {
					borderLeftColor: "var(--text-normal)",
				},
				"&.cm-focused .cm-selectionBackground, .cm-selectionBackground":
					{
						backgroundColor: "var(--text-selection)",
					},
				".cm-gutters": {
					backgroundColor: "var(--background-secondary)",
					color: "var(--text-muted)",
					borderRight: "1px solid var(--background-modifier-border)",
				},
				".cm-activeLineGutter": {
					backgroundColor: "var(--background-secondary-alt)",
				},
				".cm-activeLine": {
					backgroundColor: "var(--background-secondary-alt)",
				},
			}),
		];

		const state = EditorState.create({
			doc: this.currentContent,
			extensions,
		});

		this.editorView = new EditorView({
			state,
			parent: editorContainer,
		});
	}

	async onClose(): Promise<void> {
		if (this.editorView) {
			this.editorView.destroy();
			this.editorView = null;
		}
	}

	getViewData(): string {
		return this.currentContent;
	}

	setViewData(data: string, clear: boolean): void {
		try {
			if (clear) {
				this.clear();
			}

			// Check for binary content
			if (isBinaryContent(data)) {
				this.currentContent = "";
				this.contentEl.empty();
				this.contentEl.addClass("ce-editor-binary");
				this.contentEl.createDiv({
					cls: "ce-binary-warning",
					text: "This file appears to be binary and cannot be edited as text.",
				});
				return;
			}

			this.currentContent = data;

			if (this.editorView) {
				const currentDoc = this.editorView.state.doc.toString();
				if (currentDoc !== data) {
					this.editorView.dispatch({
						changes: {
							from: 0,
							to: currentDoc.length,
							insert: data,
						},
					});
				}
			}
		} catch (error) {
			console.error("CodeEditorView: Error setting view data", error);
			new Notice("Error loading file content");
		}
	}

	clear(): void {
		this.currentContent = "";
		if (this.editorView) {
			this.editorView.dispatch({
				changes: {
					from: 0,
					to: this.editorView.state.doc.length,
					insert: "",
				},
			});
		}
	}
}
