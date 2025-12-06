import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const envContent = readFileSync(join(__dirname, '.env'), 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const envKey = key.trim();
        const envValue = valueParts.join('=').trim();
        if (!process.env[envKey]) {
          process.env[envKey] = envValue;
        }
      }
    }
  });
  console.log('✓ Loaded .env file');
} catch (err) {
  console.warn('⚠ Could not load .env file:', err.message);
}

const topLangsModule = await import("./api/top-langs.js");
const topLangsHandler = topLangsModule.default;

const app = express();
const PORT = parseInt(process.env.PORT || '3000');
const HOST = process.env.HOST || 'localhost';

app.get("/", (req, res) => {
  const baseUrl = `http://${HOST}:${PORT}`;
  res.send(`
    <html>
      <head>
        <title>GitHub Stats Server</title>
        <style>
          body { font-family: system-ui; max-width: 800px; margin: 50px auto; padding: 20px; }
          code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; }
          pre { background: #f0f0f0; padding: 15px; border-radius: 5px; overflow-x: auto; }
          h1 { color: #333; }
          .example { margin: 20px 0; }
          img { max-width: 100%; }
        </style>
      </head>
      <body>
        <h1>GitHub Stats Server</h1>
        <p>Server is running! Use the <code>/top-langs</code> endpoint to get language stats.</p>

        <h2>Usage</h2>
        <pre>${baseUrl}/top-langs?username=YOUR_GITHUB_USERNAME</pre>

        <h2>Available Parameters</h2>
        <ul>
          <li><code>username</code> - GitHub username (required)</li>
          <li><code>layout</code> - Layout type: normal, compact, donut, donut-vertical, pie</li>
          <li><code>langs_count</code> - Number of languages to show (1-20)</li>
          <li><code>theme</code> - Theme name (e.g., dark, radical, merko)</li>
          <li><code>hide</code> - Languages to hide (comma-separated)</li>
          <li><code>exclude_repo</code> - Repos to exclude (comma-separated)</li>
          <li><code>card_width</code> - Card width in pixels</li>
          <li><code>hide_title</code> - Hide card title (true/false)</li>
          <li><code>hide_border</code> - Hide card border (true/false)</li>
          <li><code>hide_progress</code> - Hide progress bars (true/false)</li>
          <li><code>stats_format</code> - Format: percentages or bytes</li>
        </ul>

        <h2>Examples</h2>
        <div class="example">
          <h3>Normal Layout</h3>
          <pre>${baseUrl}/top-langs?username=anuraghazra</pre>
          <img src="/top-langs?username=anuraghazra" alt="Normal layout example" />
        </div>

        <div class="example">
          <h3>Donut Layout</h3>
          <pre>${baseUrl}/top-langs?username=anuraghazra&layout=donut</pre>
          <img src="/top-langs?username=anuraghazra&layout=donut" alt="Donut layout example" />
        </div>

        <div class="example">
          <h3>Compact Layout with Theme</h3>
          <pre>${baseUrl}/top-langs?username=anuraghazra&layout=compact&theme=dark</pre>
          <img src="/top-langs?username=anuraghazra&layout=compact&theme=dark" alt="Compact layout example" />
        </div>
      </body>
    </html>
  `);
});

app.get("/top-langs", topLangsHandler);

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║  GitHub Stats Server is running!              ║
║                                               ║
║  URL: http://${HOST}:${PORT}
║                                               ║
║  Example:                                     ║
║  http://${HOST}:${PORT}/top-langs?username=anuraghazra
║                                               ║
╚═══════════════════════════════════════════════╝
  `);
});
