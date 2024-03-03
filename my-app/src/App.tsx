import "./App.css"
import { GameSetup } from "./features/killer/game/GameSetup"

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <GameSetup />
      </header>
    </div>
  )
}

export default App
