import { useState } from 'react';
import '../assets/style/App.css';
import '../assets/style/Game.css';
import GameLoader from './GameLoader';
import Video from './Video';

function App() {
  const [menu, setMenu] = useState(false);

  const w = window.innerWidth;
  const h = window.innerHeight;

  if (menu) {
    return <Video level={0} game={{ width: parseInt((w / 3).toString()), height: parseInt((h / 2).toString()) }} setVideo={setMenu} trys={0} />
  }
  return (
    <div className="App">
      <GameLoader game={{ width: parseInt((w / 3).toString()), height: parseInt((h / 2).toString()) }} />
    </div>
  );
}

export default App;
