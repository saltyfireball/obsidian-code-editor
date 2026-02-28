# Code Editor

![VHS Tracking](https://img.shields.io/badge/vhs%20tracking-adjusting-fff?style=flat&logo=youtube&logoColor=FFFFFF&label=VHS%20tracking&labelColor=5B595C&color=78DCE8) ![Troll Face](https://img.shields.io/badge/troll%20face-classic-fff?style=flat&logo=reddit&logoColor=FFFFFF&label=troll%20face&labelColor=5B595C&color=FFD866) ![Containers](https://img.shields.io/badge/containers-its%20turtles%20all%20the%20way%20down-fff?style=flat&logo=docker&logoColor=FFFFFF&label=containers&labelColor=5B595C&color=5C7CFA) ![Oops](https://img.shields.io/badge/oops-deployed%20to%20prod-fff?style=flat&logo=vercel&logoColor=FFFFFF&label=oops&labelColor=5B595C&color=78DCE8) ![JavaScript](https://img.shields.io/badge/javascript-NaN%20%3D%3D%3D%20NaN-fff?style=flat&logo=javascript&logoColor=FFFFFF&label=JS&labelColor=5B595C&color=78DCE8) ![Monitoring](https://img.shields.io/badge/monitoring-check%20twitter-fff?style=flat&logo=grafana&logoColor=FFFFFF&label=monitoring&labelColor=5B595C&color=FFD866) ![Backup Plan](https://img.shields.io/badge/backup%20plan-cry-fff?style=flat&logo=icloud&logoColor=FFFFFF&label=backup%20plan&labelColor=5B595C&color=AB9DF2) ![Search History](https://img.shields.io/badge/search%20history-please%20dont-fff?style=flat&logo=google&logoColor=FFFFFF&label=search%20history&labelColor=5B595C&color=5C7CFA) ![Git Blame](https://img.shields.io/badge/git%20blame-it%20was%20the%20intern-fff?style=flat&logo=git&logoColor=FFFFFF&label=git%20blame&labelColor=5B595C&color=A9DC76)

<p align="center">
  <img src="assets/header.svg" width="600" />
</p>

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

**Might not be approved yet**

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

## Acknowledgments

This plugin uses [highlight.js](https://github.com/highlightjs/highlight.js) for syntax highlighting, licensed under the [BSD 3-Clause License](https://github.com/highlightjs/highlight.js/blob/main/LICENSE). Copyright (c) 2006, Ivan Sagalaev.

## License

[MIT](LICENSE)
