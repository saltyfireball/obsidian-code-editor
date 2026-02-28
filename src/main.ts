import { Plugin } from "obsidian";
import type { CodeEditorSettings } from "./types";
import { DEFAULT_SETTINGS } from "./types";
import { CodeEditorView, CODE_EDITOR_VIEW_TYPE } from "./view";
import { CodeEditorSettingTab } from "./settings-tab";
import { getAllExtensions } from "./extensions";

export default class CodeEditorPlugin extends Plugin {
	settings!: CodeEditorSettings;

	async onload() {
		await this.loadSettings();

		// Settings tab (always available)
		this.addSettingTab(new CodeEditorSettingTab(this.app, this));

		if (!this.settings.enabled) {
			return;
		}

		// Register the view
		this.registerView(CODE_EDITOR_VIEW_TYPE, (leaf) => {
			return new CodeEditorView(leaf, this.settings);
		});

		// Register file extensions
		const extensions = getAllExtensions(this.settings.additionalExtensions);
		this.registerExtensions(extensions, CODE_EDITOR_VIEW_TYPE);

		// Command to open current file in code editor
		this.addCommand({
			id: "open-current-file",
			name: "Open current file",
			checkCallback: (checking) => {
				const file = this.app.workspace.getActiveFile();
				if (!file || file.extension === "md") {
					return false;
				}
				if (!checking) {
					const leaf = this.app.workspace.getLeaf(false);
					void leaf.setViewState({
						type: CODE_EDITOR_VIEW_TYPE,
						state: { file: file.path },
					});
				}
				return true;
			},
		});
	}

	async loadSettings() {
		const data = (await this.loadData()) as Partial<CodeEditorSettings> | null;
		this.settings = Object.assign({}, DEFAULT_SETTINGS, data ?? {});
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
