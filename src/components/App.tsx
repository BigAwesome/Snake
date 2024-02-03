import '../assets/style/App.css';
import '../assets/style/Game.css';
import GameLoader from './GameLoader';

function App() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  console.log(w, h);
  return (
    <div className="App">
      <GameLoader game={{ width: parseInt((w / 3).toString()), height: parseInt((h / 2).toString()) }} />
    </div>
  );
}

export default App;
