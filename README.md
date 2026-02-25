# Code Editor

Edit non-markdown text files (code, config, data files) directly in Obsidian with syntax highlighting, line numbers, and word wrap.

## Features

- Edit 50+ file types directly in Obsidian (JS, TS, Python, Go, Rust, JSON, YAML, HTML, CSS, SQL, and more)
- Syntax highlighting with 5 built-in color themes (Monokai Pro, GitHub Dark, GitHub Light, Dracula, Nord)
- Line numbers with active line highlighting
- Word wrap toggle
- Bracket matching
- Undo/redo history
- Tab indentation support
- Binary file detection (prevents editing binary files)
- Add custom file extensions

## Installation

### From Obsidian Community Plugins

**Not yet submitted**

1. Open **Settings** > **Community Plugins**
2. Search for **Code Editor**
3. Click **Install**, then **Enable**

### Manual Installation

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](../../releases/latest)
2. Create a folder called `code-editor` in your vault's `.obsidian/plugins/` directory
3. Copy the downloaded files into that folder
4. Restart Obsidian and enable the plugin in **Settings** > **Community Plugins**

## Usage

Once enabled, the plugin automatically handles supported file types. Simply open any supported file and it will open in the code editor.

### Supported File Types

**Code:** js, ts, jsx, tsx, py, rb, go, rs, java, c, cpp, h, cs, php, swift, kt, scala, lua, pl, r, m, mm

**Config/Data:** json, yaml, yml, toml, xml, ini, env, conf

**Web:** html, htm, css, scss, sass, less

**Shell/Scripts:** sh, bash, zsh, fish, ps1, bat, cmd

**Other:** sql, graphql, dockerfile, makefile, gitignore, txt, log

### Settings

- **Enable code editor** - Toggle the plugin on/off (restart required)
- **Color theme** - Choose from 5 syntax highlighting themes
- **Show line numbers** - Toggle line number gutter
- **Word wrap** - Toggle line wrapping
- **Additional file extensions** - Add custom extensions (comma-separated)

### Command

- **Open current file in Code Editor** - Available from the command palette for non-markdown files

## License

[MIT](LICENSE)
