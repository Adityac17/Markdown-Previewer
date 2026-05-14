export function PaneLabel({ type, children }) {
  return (
    <div className="mp-pane-label">
      <span className={`mp-pane-dot mp-pane-dot--${type}`} />
      {children}
    </div>
  )
}
