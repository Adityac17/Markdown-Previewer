import { useCallback } from 'react'

/* ── Formatting helpers ─────────────────────────────────── */
function applyFormat(ref, value, onChange, action) {
  const el    = ref.current
  if (!el) return
  const start = el.selectionStart
  const end   = el.selectionEnd
  const sel   = value.slice(start, end)
  const before = value.slice(0, start)
  const after  = value.slice(end)

  let insert = sel
  let cursorOffset = 0

  const wrap = (l, r = l) => {
    insert = `${l}${sel || 'text'}${r}`
    cursorOffset = sel ? insert.length : l.length
  }

  const lineWrap = (prefix) => {
    const lines = (sel || 'text').split('\n')
    insert = lines.map(ln => `${prefix}${ln}`).join('\n')
    cursorOffset = insert.length
  }

  switch (action) {
    case 'bold':        wrap('**');              break
    case 'italic':      wrap('*');               break
    case 'strike':      wrap('~~');              break
    case 'code':        wrap('`');               break
    case 'quote':       lineWrap('> ');          break
    case 'upper':       insert = sel.toUpperCase(); cursorOffset = insert.length; break
    case 'lower':       insert = sel.toLowerCase(); cursorOffset = insert.length; break
    case 'link':        insert = `[${sel || 'link text'}](url)`; cursorOffset = insert.length; break
    case 'ul':          lineWrap('- ');          break
    case 'ol': {
      const lines = (sel || 'text').split('\n')
      insert = lines.map((ln, i) => `${i + 1}. ${ln}`).join('\n')
      cursorOffset = insert.length
      break
    }
    case 'hr':          insert = '\n---\n';       cursorOffset = insert.length; break
    case 'h1': lineWrap('# ');  break
    case 'h2': lineWrap('## '); break
    case 'h3': lineWrap('### '); break
    case 'h4': lineWrap('#### '); break
    case 'h5': lineWrap('##### '); break
    case 'h6': lineWrap('###### '); break
    case 'clear': onChange(''); el.focus(); return
    case 'undo':  document.execCommand('undo'); return
    case 'redo':  document.execCommand('redo'); return
    default: return
  }

  const next = before + insert + after
  onChange(next)

  requestAnimationFrame(() => {
    el.focus()
    const pos = start + cursorOffset
    el.setSelectionRange(pos, pos)
  })
}

/* ── Button ─────────────────────────────────────────────── */
function Btn({ label, children, action, onAction, className = '' }) {
  return (
    <button
      className={`mp-tb-btn ${className}`}
      title={label}
      aria-label={label}
      onMouseDown={e => { e.preventDefault(); onAction(action) }}
    >
      {children}
    </button>
  )
}

const Sep = () => <div className="mp-tb-sep" aria-hidden="true" />

/* ── SVG icons ──────────────────────────────────────────── */
const UndoIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h10a5 5 0 0 1 0 10H9"/><polyline points="7 3 3 7 7 11"/></svg>
const RedoIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7H11a5 5 0 0 0 0 10h4"/><polyline points="17 3 21 7 17 11"/></svg>
const ClearIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
const LinkIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
const ULIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/></svg>
const OLIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="6" x2="20" y2="6"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="10" y1="18" x2="20" y2="18"/><text x="3" y="8" fontSize="7" fill="currentColor" stroke="none" fontFamily="monospace">1.</text><text x="3" y="14" fontSize="7" fill="currentColor" stroke="none" fontFamily="monospace">2.</text><text x="3" y="20" fontSize="7" fill="currentColor" stroke="none" fontFamily="monospace">3.</text></svg>
const HRIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="2" y1="12" x2="22" y2="12"/></svg>

/* ── Toolbar ─────────────────────────────────────────────── */
export function Toolbar({ textareaRef, value, onChange }) {
  const act = useCallback(
    (action) => applyFormat(textareaRef, value, onChange, action),
    [textareaRef, value, onChange]
  )

  return (
    <div className="mp-toolbar" role="toolbar" aria-label="Markdown formatting toolbar">

      {/* Undo / Redo / Clear */}
      <Btn label="Undo"  action="undo"  onAction={act}><UndoIcon /></Btn>
      <Btn label="Redo"  action="redo"  onAction={act}><RedoIcon /></Btn>
      <Btn label="Clear" action="clear" onAction={act}><ClearIcon /></Btn>

      <Sep />

      {/* Inline formatting */}
      <Btn label="Bold"          action="bold"   onAction={act} className="mp-tb-bold"><b>B</b></Btn>
      <Btn label="Strikethrough" action="strike" onAction={act} className="mp-tb-strike"><s>S</s></Btn>
      <Btn label="Italic"        action="italic" onAction={act} className="mp-tb-italic"><i>I</i></Btn>
      <Btn label="Blockquote"    action="quote"  onAction={act}><span style={{fontSize:'13px'}}>"</span></Btn>
      <Btn label="Inline code"   action="code"   onAction={act}><span style={{fontFamily:'monospace',fontSize:'11px'}}>Aa</span></Btn>
      <Btn label="Uppercase"     action="upper"  onAction={act}><span style={{fontWeight:600}}>A</span></Btn>
      <Btn label="Lowercase"     action="lower"  onAction={act}><span>a</span></Btn>

      <Sep />

      {/* Link */}
      <Btn label="Link"  action="link" onAction={act}><LinkIcon /></Btn>

      <Sep />

      {/* Headings */}
      {['h1','h2','h3','h4','h5','h6'].map((h, i) => (
        <Btn key={h} label={`Heading ${i+1}`} action={h} onAction={act}>
          <span className="mp-tb-heading">H<sub>{i+1}</sub></span>
        </Btn>
      ))}

      <Sep />

      {/* Lists + HR */}
      <Btn label="Unordered list" action="ul" onAction={act}><ULIcon /></Btn>
      <Btn label="Ordered list"   action="ol" onAction={act}><OLIcon /></Btn>
      <Btn label="Horizontal rule" action="hr" onAction={act}><HRIcon /></Btn>
    </div>
  )
}
