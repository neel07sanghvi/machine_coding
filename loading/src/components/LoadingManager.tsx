import { useState } from "react"
import { Loading } from "./Loading"

export function LoadingManager({ numOfLoaders = 4 }) {
  const [loaders, setLoaders] = useState(() =>
    Array.from({ length: numOfLoaders }, (_, index) => ({
      id: index,
      width: 0,
      timer: null,
      isRunning: false
    }))
  )

  const updateLoader = (id, updates) => {
    setLoaders(prev => prev.map(loader =>
      loader.id === id ? { ...loader, ...updates } : loader
    ))
  }

  const startLoader = (id) => {
    const loader = loaders[id]
    if (loader.isRunning) return

    const timer = setInterval(() => {
      setLoaders(prev => prev.map(l => {
        if (l.id === id && l.width < 100) {
          return { ...l, width: l.width + 1 }
        }
        return l
      }))
    }, 100)

    updateLoader(id, { timer, isRunning: true })
  }

  const stopLoader = (id) => {
    const loader = loaders[id]
    if (loader.timer) {
      clearInterval(loader.timer)
      updateLoader(id, { timer: null, isRunning: false })
    }
  }

  const resetLoader = (id) => {
    stopLoader(id)
    updateLoader(id, { width: 0 })
  }

  const startAll = () => {
    loaders.forEach(loader => {
      if (!loader.isRunning) startLoader(loader.id)
    })
  }

  const stopAll = () => {
    loaders.forEach(loader => stopLoader(loader.id))
  }

  const resetAll = () => {
    loaders.forEach(loader => resetLoader(loader.id))
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={startAll} style={{ cursor: 'pointer' }} > Start All </button>
        <button onClick={stopAll} style={{ marginLeft: '10px', cursor: 'pointer' }}> Stop All </button>
        <button onClick={resetAll} style={{ marginLeft: '10px', cursor: 'pointer' }}> Reset All </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {loaders.map(loader => (
          <Loading
            key={loader.id}
            width={loader.width}
            isRunning={loader.isRunning}
            onStart={() => startLoader(loader.id)}
            onStop={() => stopLoader(loader.id)}
            onReset={() => resetLoader(loader.id)}
          />
        ))}
      </div>
    </div>
  )
}