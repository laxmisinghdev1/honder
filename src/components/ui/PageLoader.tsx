

export function PageLoader({ isLoading }: { isLoading: boolean }) {

  return (
    <div
      className={`loading-screen ${isLoading ? 'loading-screen--visible' : 'loading-screen--hidden'}`}
      aria-hidden={!isLoading}
    >
      <div className="loading-screen__grid" />
      <div className="loading-screen__core">
        <span className="loading-screen__eyebrow">Urban motion store</span>
        <strong>HONDAR</strong>
        <div className="loading-screen__track">
          <span />
        </div>
      </div>
    </div>
  )
}
