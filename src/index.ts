/**
 * @module SampleExtension
 * @description
 * Official starter community extension for Noether.
 * Demonstrates best practices for:
 * - Commands & hotkeys
 * - Omnibox search provider (`prefix: 'sample:'`)
 * - Tab context menu actions
 * - Document title decorators (universal status pills)
 * - Custom Canvas card renderers via EventBus
 * - Model Context Protocol (MCP) AI tools
 * - Semantic theme variable styling (`--noether-*`)
 *
 * @author Community Developer
 */

import React from 'react';
import { Extension, ExtensionManifest, McpToolResult } from 'noether';

export const MANIFEST: ExtensionManifest = {
  id: 'noether-sample-extension',
  name: 'Sample Extension',
  version: '1.1.0',
  description: 'A starter extension demonstrating commands, omnibox search, tab actions, and MCP tools.',
  author: 'Community Developer',
  tags: ['sample', 'starter', 'template'],
};

export default class SampleExtension extends Extension {
  public async onload(): Promise<void> {
    console.log(`[${this.manifest.name}] Loaded successfully.`);

    // 1. Register a command in the Command Palette (Ctrl+P / Ctrl+K)
    this.addCommand({
      id: 'greet',
      title: 'Sample Extension: Greet User',
      section: 'Sample',
      action: (app) => {
        app.workspace.showToast('Hello from your new Noether extension!', 'success');
      },
    });

    // 2. Register an Omnibox Search Provider (Ctrl+P with 'sample:' prefix)
    if (typeof (this as any).registerSearchProvider === 'function') {
      (this as any).registerSearchProvider({
        id: 'sample-search',
        prefix: 'sample:',
        placeholder: 'Search sample items or run action...',
        search: async (query: string) => {
          const q = query.toLowerCase().trim();
          return [
            {
              id: 'sample:hello',
              title: `Sample Item: "${q || 'Default'}"`,
              description: 'Click to trigger sample toast',
              category: 'Sample Extension',
              badge: 'Demo',
              onSelect: () => {
                this.app.workspace.showToast(`Selected sample item: ${q || 'Default'}`, 'info');
              },
            },
          ];
        },
      });
    }

    // 3. Register a Tab Context Menu Action (Right-click on document tabs)
    if (typeof (this as any).registerTabContextMenuAction === 'function') {
      (this as any).registerTabContextMenuAction({
        id: 'sample:tab-action',
        title: 'Sample Action on Tab',
        order: 70,
        action: (tab: any) => {
          this.app.workspace.showToast(`Action invoked on tab: "${tab.title}"`, 'info');
        },
      });
    }

    // 4. Register a Universal Document Title Decorator (Status pill in header)
    if (typeof (this as any).registerDocumentTitleDecorator === 'function') {
      (this as any).registerDocumentTitleDecorator({
        id: 'sample:doc-pill',
        order: 60,
        render: (doc: any) => {
          if (!doc) return null;
          return React.createElement(
            'span',
            {
              className:
                'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono select-none bg-[var(--noether-btn-hover-bg,#333)] text-[var(--noether-text-muted,#888)] border border-[var(--noether-border,#222)]',
              title: 'Sample Extension Active',
            },
            React.createElement('span', { className: 'w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0' }),
            React.createElement('span', null, 'Sample')
          );
        },
      });
    }

    // 5. Register a Custom Infinite Canvas Card Renderer via EventBus
    this.app.events.emit('canvas:register-card-renderer', {
      id: 'sample-card',
      match: (doc: any) => doc?.title?.toLowerCase?.().includes('sample') || false,
      render: (props: any) => {
        return React.createElement(
          'div',
          {
            className:
              'w-full h-full p-3 bg-[var(--noether-bg-card,#1c1c1c)] border border-[var(--noether-border,#2a2a2a)] rounded-lg text-xs font-sans select-none flex flex-col justify-between',
          },
          React.createElement(
            'div',
            { className: 'font-medium text-[var(--noether-text,#fff)]' },
            props.doc?.title || 'Sample Card'
          ),
          React.createElement(
            'div',
            { className: 'text-[10px] text-[var(--noether-text-muted,#888)]' },
            'Custom spatial board card renderer'
          )
        );
      },
    });

    // 6. Register a Model Context Protocol (MCP) AI Tool
    this.registerTool({
      name: 'get_sample_info',
      description: 'Returns metadata and status from the sample extension.',
      parameters: {
        type: 'object',
        properties: {},
      },
      handler: async (): Promise<McpToolResult> => {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'operational',
                version: this.manifest.version,
                timestamp: new Date().toISOString(),
              }),
            },
          ],
        };
      },
    });
  }

  public onunload(): void {
    console.log(`[${this.manifest.name}] Unloaded.`);
  }
}
