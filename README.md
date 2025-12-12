# opencode-optimal-model-temps

Minimal OpenCode plugin that hooks `chat.params` and nudges specific models to their preferred sampling temperature. Right now it only pinches Google Gemini 3 Pro to **0.35**, following the recommendation in [Optimal Temperature for Gemini 3 Pro](https://lynchmark.com/blog/gemini-optimal-temperature).

## Usage

Add the plugin to your `~/.config/opencode/opencode.json`:

```json
{
  "plugin": [
    "opencode-optimal-model-temps"
  ]
}
```

You can override the defaults with env vars:

- `OPENCODE_GEMINI3_TEMPERATURE`: override target (defaults to `0.35`).
- `OPENCODE_GEMINI3_BASELINE`: baseline value (defaults to `1`). The plugin only overrides when the CLI is still using this baseline, so your explicit agent temperatures still win.

Feel free to extend `src/index.ts` with more entries in `TEMPERATURE_RULES` as the “perfect” settings for other models surface.
