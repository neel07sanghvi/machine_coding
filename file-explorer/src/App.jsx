import { FileExplorer } from './components/FileExplorer'
import json from './components/data.json'

function App() {
  return (
    <FileExplorer defaultData={json} />
  )
}

export default App
