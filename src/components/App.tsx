import { useEffect, useState } from 'react';
import '../assets/style/App.css';
import '../assets/style/Game.css';
import GameLoader from './GameLoader';
import Video from './Video';
import SplashImg from "../assets/images/Splash.png"

function App() {
  const [menu, setMenu] = useState(false);
  const [splash, setSplash] = useState(true);

  const w = window.innerWidth;
  const h = window.innerHeight;

  useEffect(() => {
    setTimeout(() => {

      setSplash(false)
    }, 5000)
  }, [])

  if (splash)
    return <div className="App" onClick={() => { setSplash(false) }}>
      <div id="GameWrapper" className={"Level1"}>
        <div id="GameDisplay">
          <img src={SplashImg} />
        </div>
      </div>
    </div>

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
