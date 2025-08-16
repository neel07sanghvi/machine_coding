export function Loading({ width, onStart, onStop, onReset, isRunning }) {
  return (
    <div className="loading-container" style={{ padding: '20px', border: '1px solid #ccc' }}>
      <div style={{ width: '300px', height: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${width}%`,
            height: '100%',
            backgroundColor: '#007bff',
            transition: 'width 0.1s ease',
            borderRadius: '10px'
          }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <span>{width}%</span>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={onStart} disabled={isRunning} style={{ cursor: 'pointer' }}> Start </button>
        <button onClick={onStop} disabled={!isRunning} style={{ marginLeft: '5px', cursor: 'pointer' }}> Stop </button>
        <button onClick={onReset} style={{ marginLeft: '5px', cursor: 'pointer' }}> Reset </button>
      </div>
    </div>
  )
}