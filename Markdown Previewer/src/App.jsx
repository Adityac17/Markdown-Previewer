import { useRef } from 'react'
import { useMarkdown }  from './hooks/useMarkdown'
import { useTheme }     from './hooks/useTheme'
import { Header }       from './components/Header'
import { Toolbar }      from './components/Toolbar'
import { EditorPane }   from './components/EditorPane'
import { PreviewPane }  from './components/PreviewPane'
import { Divider }      from './components/Divider'
import './App.css'

export default function App() {
  const { markdown, html, stats, setMarkdown, reset } = useMarkdown()
  const { theme, toggleTheme } = useTheme()
  const textareaRef = useRef(null)

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = 'document.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mp-root">
      <Header
        stats={stats}
        theme={theme}
        onReset={reset}
        onToggleTheme={toggleTheme}
        onDownload={handleDownload}
      />
      <Toolbar
        textareaRef={textareaRef}
        value={markdown}
        onChange={setMarkdown}
      />
      <main className="mp-main">
        <EditorPane
          value={markdown}
          onChange={setMarkdown}
          textareaRef={textareaRef}
        />
        <Divider />
        <PreviewPane html={html} isEmpty={!markdown.trim()} />
      </main>
    </div>
  )
}
