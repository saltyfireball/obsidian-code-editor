// Extensions already registered by Obsidian (do not register these)
const OBSIDIAN_EXTENSIONS = new Set(["md", "canvas", "pdf", "svg"]);

// Built-in supported extensions
export const TEXT_EXTENSIONS = [
	// Code
	"js", "ts", "jsx", "tsx", "py", "rb", "go", "rs", "java", "c", "cpp", "h",
	"cs", "php", "swift", "kt", "scala", "lua", "pl", "r", "m", "mm",
	// Config/Data
	"json", "yaml", "yml", "toml", "xml", "ini", "env", "conf",
	// Web
	"html", "htm", "css", "scss", "sass", "less",
	// Shell/Scripts
	"sh", "bash", "zsh", "fish", "ps1", "bat", "cmd",
	// Other
	"sql", "graphql", "dockerfile", "makefile", "gitignore", "txt", "log",
];

// Map file extensions to highlight.js language identifiers
export function getLanguageFromExtension(ext: string): string {
	const langMap: Record<string, string> = {
		js: "javascript",
		ts: "typescript",
		jsx: "javascript",
		tsx: "typescript",
		py: "python",
		rb: "ruby",
		rs: "rust",
		yml: "yaml",
		sh: "bash",
		zsh: "bash",
		fish: "bash",
		ps1: "powershell",
		bat: "dos",
		cmd: "dos",
		h: "c",
		hpp: "cpp",
		mm: "objectivec",
		m: "objectivec",
		kt: "kotlin",
	};
	return langMap[ext.toLowerCase()] || ext.toLowerCase();
}

// Get all extensions (built-in + user-configured), excluding Obsidian-native extensions
export function getAllExtensions(additionalExtensions: string[]): string[] {
	const combined = new Set([...TEXT_EXTENSIONS, ...additionalExtensions]);
	return Array.from(combined).filter(
		(ext) => ext.trim().length > 0 && !OBSIDIAN_EXTENSIONS.has(ext.toLowerCase())
	);
}
