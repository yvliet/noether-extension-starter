# Noether Extension Starter

Official starter template for building, testing, and publishing standalone community extensions for Noether.

---

## 1. Overview

This repository provides everything needed to build a high-performance community extension for Noether:
- TypeScript setup configured against the official Noether SDK (`noether`).
- Esbuild bundling pipeline for producing compact single-file `dist/main.js` bundles.
- Manifest validation and community registry publishing scripts.

## 2. Quick Start

### 1. Clone the Template
```bash
git clone https://github.com/yvliet/noether-extension-starter.git my-noether-extension
cd my-noether-extension
npm install
```

### 2. Development Workflow
```bash
# Watch for file changes and recompile bundle
npm run dev

# Build production bundle
npm run build
```

### 3. Testing in Your Local Vault
Copy the output directory (`dist/main.js` and `manifest.json`) into your local vault's `.noether/extensions/<your-extension-id>/` folder and reload Noether.

## 3. Architecture & SDK Overview

Every Noether extension extends the base `Extension` class and implements lifecycle hooks:

```typescript
import { Extension, NoetherApp } from 'noether';

export default class MyExtension extends Extension {
  async onload(): Promise<void> {
    this.addCommand({
      id: 'my-command',
      title: 'Hello from Extension',
      action: (app: NoetherApp) => {
        app.workspace.showToast('Hello from Noether Extension!', 'info');
      },
    });

    this.registerTool({
      name: 'hello_tool',
      description: 'Greets the user from an AI agent',
      parameters: { type: 'object', properties: {} },
      execute: async () => ({ text: 'Hello from MCP!' }),
    });
  }

  async onunload(): Promise<void> {
    // Teardown resources, event listeners, and timers
  }
}
```

## 4. License

MIT © [Yuliet Li](https://github.com/yvliet)
