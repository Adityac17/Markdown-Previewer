import { PaneLabel } from './PaneLabel'

export function EditorPane({ value, onChange, textareaRef }) {
  return (
    <section className="mp-pane mp-editor-pane">
      <PaneLabel type="editor">Editor</PaneLabel>
      <textarea
        ref={textareaRef}
        className="mp-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing Markdown here…"
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        aria-label="Markdown editor"
      />
    </section>
  )
}
