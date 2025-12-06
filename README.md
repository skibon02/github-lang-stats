# GitHub Stats Server

A minimal Node.js server that serves GitHub top-langs cards using the github-readme-stats library.

## Prerequisites

- Node.js >= 22
- A GitHub Personal Access Token (PAT)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a token file:
```bash
echo "ghp_your_token_here" > github-token.txt
chmod 600 github-token.txt
```

3. (Optional) Configure host/port in `.env` file:
```bash
cp .env.example .env
# Edit .env to change HOST/PORT if needed
# HOST=your-domain.com (default: localhost)
# PORT=3000 (default: 3000)
```

### How to get a GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name and select **no scopes** (read-only access is enough)
4. Generate and copy the token
5. Add it to your `.env` file

## Running the Server

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start at `http://localhost:3000`

## Usage

### Basic Usage

```
http://localhost:3000/top-langs?username=YOUR_GITHUB_USERNAME
```

### Examples

**Normal layout:**
```
http://localhost:3000/top-langs?username=anuraghazra
```

**Donut chart:**
```
http://localhost:3000/top-langs?username=anuraghazra&layout=donut
```

**Compact with dark theme:**
```
http://localhost:3000/top-langs?username=anuraghazra&layout=compact&theme=dark
```

**Pie chart with custom colors:**
```
http://localhost:3000/top-langs?username=anuraghazra&layout=pie&theme=radical
```

## Available Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | Required | GitHub username |
| `layout` | string | "normal" | Layout type: `normal`, `compact`, `donut`, `donut-vertical`, `pie` |
| `langs_count` | number | 5-6 | Number of languages to show (1-20) |
| `theme` | string | "default" | Theme name (e.g., dark, radical, merko, tokyonight) |
| `hide` | string | - | Languages to hide (comma-separated, e.g., `hide=html,css`) |
| `exclude_repo` | string | - | Repositories to exclude (comma-separated) |
| `card_width` | number | 300 | Card width in pixels |
| `hide_title` | boolean | false | Hide card title |
| `hide_border` | boolean | false | Hide card border |
| `hide_progress` | boolean | false | Hide progress bars (normal/compact layouts) |
| `stats_format` | string | "percentages" | Format: `percentages` or `bytes` |
| `title_color` | string | - | Custom title color (hex without #) |
| `text_color` | string | - | Custom text color (hex without #) |
| `bg_color` | string | - | Custom background color (hex without #) |
| `border_color` | string | - | Custom border color (hex without #) |
| `border_radius` | number | 4.5 | Card corner radius |
| `disable_animations` | boolean | false | Disable SVG animations |
| `custom_title` | string | "Most Used Languages" | Custom card title |
| `locale` | string | "en" | Language locale for UI text |

## Using in Markdown

You can embed the generated SVG in your README:

```markdown
![Top Langs](http://localhost:3000/top-langs?username=YOUR_USERNAME&layout=compact)
```

Or in HTML:

```html
<img src="http://localhost:3000/top-langs?username=YOUR_USERNAME&layout=donut" alt="Top Languages" />
```

## Troubleshooting

**"Failed to load top-langs handler"**
- Make sure the `github-readme-stats` repository is cloned at `/home/skygrel19/packages/github-readme-stats`
- Or set `GITHUB_STATS_PATH` in your `.env` file to the correct path

**Rate limit errors:**
- Add more GitHub tokens to your `.env` file (PAT_2, PAT_3, etc.)
- The library will automatically rotate between them

**"User not found" error:**
- Check that the GitHub username is correct and public
- Verify your GitHub token is valid

## License

MIT License - see LICENSE file for details.

This project includes code from [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) by Anurag Hazra, also licensed under MIT.
