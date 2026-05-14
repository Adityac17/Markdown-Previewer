import { PaneLabel } from './PaneLabel'
import { EmptyState } from './EmptyState'

export function PreviewPane({ html, isEmpty }) {
  return (
    <section className="mp-pane mp-preview-pane">
      <PaneLabel type="preview">Preview</PaneLabel>
      <div className="mp-preview" aria-live="polite">
        {isEmpty
          ? <EmptyState />
          : <div dangerouslySetInnerHTML={{ __html: html }} />
        }
      </div>
    </section>
  )
}
