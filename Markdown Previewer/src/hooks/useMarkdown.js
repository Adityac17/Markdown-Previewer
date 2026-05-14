import { useMemo, useCallback } from 'react'
import { marked } from 'marked'
import { useLocalStorage } from './useLocalStorage'

marked.setOptions({ breaks: true, gfm: true })

const DEFAULT = `# Welcome to Markdown Previewer

Type on the **left** — see the result on the **right**.

---

## What you can write

### Text formatting

You can write **bold**, *italic*, or ***both***.
Inline \`code\` looks like this.

### Blockquote

> "Simplicity is the ultimate sophistication."
> — Leonardo da Vinci

### Code block

\`\`\`js
const greet = (name) => {
  return \`Hello, \${name}!\`;
};
\`\`\`

### Lists

- Clean split-screen layout
- Live render as you type
- Content saved automatically

1. Write Markdown
2. See the preview
3. Copy or use it anywhere

### Table

| Syntax | Result |
|--------|--------|
| \`**bold**\` | **bold** |
| \`*italic*\` | *italic* |
| \`\`code\`\` | \`code\` |

---

Start editing to make it your own ✦
`

export function useMarkdown() {
  const [markdown, setMarkdown] = useLocalStorage('mp-content', DEFAULT)

  const html = useMemo(() => marked.parse(markdown), [markdown])

  const stats = useMemo(() => {
    const trimmed = markdown.trim()
    return {
      words: trimmed ? trimmed.split(/\s+/).length : 0,
      chars: markdown.length,
      lines: markdown.split('\n').length,
    }
  }, [markdown])

  const reset = useCallback(() => setMarkdown(DEFAULT), [setMarkdown])

  return { markdown, html, stats, setMarkdown, reset }
}
