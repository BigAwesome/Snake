import '../assets/style/App.css';
import '../assets/style/Game.css';
import GameLoader from './GameLoader';
import AppleBase from "../assets/images/Apple_1.png"
import AppleBlack from "../assets/images/Apple_Black_1.png"
import AppleGrey from "../assets/images/Apple_Grey_1.png"
import AppleRed from "../assets/images/Apple_Red_1.png"
import Snake from "../assets/images/Snake_1.png"

function App() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return (
    <div className="App">
      <div className='HiddenIconCache'>
        <img id='AppleBase' src={AppleBase} alt="" />
        <img id='AppleBlack' src={AppleBlack} alt="" />
        <img id='AppleGrey' src={AppleGrey} alt="" />
        <img id='AppleRed' src={AppleRed} alt="" />
        <img id='Snake' src={Snake} alt="" />
      </div>

      <GameLoader game={{ width: parseInt((w / 3).toString()), height: parseInt((h / 2).toString()) }} />
    </div>
  );
}

export default App;
