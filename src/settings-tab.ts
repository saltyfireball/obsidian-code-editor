import { PluginSettingTab, App, Setting } from "obsidian";
import type CodeEditorPlugin from "./main";
import { TEXT_EXTENSIONS } from "./extensions";
import type { CodeEditorTheme } from "./types";

export class CodeEditorSettingTab extends PluginSettingTab {
	plugin: CodeEditorPlugin;

	constructor(app: App, plugin: CodeEditorPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", { text: "Code Editor" });
		containerEl.createEl("p", {
			text: "Edit non-markdown text files (code, config, etc.) directly in Obsidian with syntax highlighting.",
			cls: "ce-hint",
		});

		const settings = this.plugin.settings;

		// Enable/disable toggle
		new Setting(containerEl)
			.setName("Enable code editor")
			.setDesc("Register this plugin to handle text-based file types. Requires Obsidian restart to apply extension changes.")
			.addToggle((toggle) =>
				toggle.setValue(settings.enabled).onChange(async (value) => {
					settings.enabled = value;
					await this.plugin.saveSettings();
				})
			);

		// Theme selector
		new Setting(containerEl)
			.setName("Color theme")
			.setDesc("Syntax highlighting color theme. Requires file reopen to apply.")
			.addDropdown((dropdown) =>
				dropdown
					.addOption("monokai-pro", "Monokai Pro")
					.addOption("github-dark", "GitHub Dark")
					.addOption("github-light", "GitHub Light")
					.addOption("dracula", "Dracula")
					.addOption("nord", "Nord")
					.setValue(settings.theme)
					.onChange(async (value) => {
						settings.theme = value as CodeEditorTheme;
						await this.plugin.saveSettings();
					})
			);

		// Line numbers toggle
		new Setting(containerEl)
			.setName("Show line numbers")
			.setDesc("Display line numbers in the editor gutter. Requires file reopen to apply.")
			.addToggle((toggle) =>
				toggle.setValue(settings.lineNumbers).onChange(async (value) => {
					settings.lineNumbers = value;
					await this.plugin.saveSettings();
				})
			);

		// Word wrap toggle
		new Setting(containerEl)
			.setName("Word wrap")
			.setDesc("Wrap long lines instead of horizontal scrolling.")
			.addToggle((toggle) =>
				toggle.setValue(settings.wordWrap).onChange(async (value) => {
					settings.wordWrap = value;
					await this.plugin.saveSettings();
				})
			);

		// Additional extensions
		new Setting(containerEl)
			.setName("Additional file extensions")
			.setDesc("Comma-separated list of additional file extensions to handle (e.g., 'vue,svelte,astro'). Requires restart.")
			.addTextArea((text) =>
				text
					.setPlaceholder("vue, svelte, astro")
					.setValue(settings.additionalExtensions.join(", "))
					.onChange(async (value) => {
						settings.additionalExtensions = value
							.split(",")
							.map((ext) => ext.trim().replace(/^\./, ""))
							.filter((ext) => ext.length > 0);
						await this.plugin.saveSettings();
					})
			);

		// Show built-in extensions
		containerEl.createEl("h3", { text: "Built-in Extensions" });
		containerEl.createEl("p", {
			text: "The following extensions are supported by default:",
			cls: "ce-hint",
		});

		const extList = containerEl.createDiv({ cls: "ce-extension-list" });
		extList.createEl("code", {
			text: TEXT_EXTENSIONS.join(", "),
			cls: "ce-code-inline",
		});

		// Attribution
		const attrEl = containerEl.createDiv("ce-attribution");
		attrEl.innerHTML =
			"Syntax highlighting powered by "
			+ '<a href="https://github.com/highlightjs/highlight.js">highlight.js</a>'
			+ " (BSD 3-Clause License).";

		// Status indicator
		if (settings.enabled) {
			const statusEl = containerEl.createDiv("ce-status ce-enabled");
			statusEl.createEl("span", { text: "Code editor is active", cls: "ce-status-text" });
		} else {
			const statusEl = containerEl.createDiv("ce-status ce-disabled");
			statusEl.createEl("span", { text: "Code editor is disabled", cls: "ce-status-text" });
		}
	}
}
