import { useState } from "react";
import { IGameLoaderProps } from "../interfaces/IGameLoader";
import KillScreen from "./Game/KillScreen";
import { Audios, Levels, Videos } from "../config";
import Video from "./Video";
import { Audio } from "./Game/Audio";


function GameLoader(props: IGameLoaderProps) {

    const [level, setLevel] = useState(1); //TODO: reset to 1 after testing 
    const [reset, setReset] = useState(false);
    const [video, setVideo] = useState(true);
    const [trys, setTrys] = useState(1);


    const settings = {
        width: props.game?.width,
        height: props.game?.height,
        onComplete: () => {
            setLevel(level + 1);
            setVideo(true);
        },
        onFail: () => { setReset(true) }
    }
    if (!Object.keys(Levels).includes(level.toString())) {
        return (<div id="GameWrapper" key={level + " " + trys} className={" Level" + level}>Selected Level invalid! <button onClick={() => setLevel(1)}>Go back?</button></div>)
    }
    const Game = Levels[level]
    const VideoUrl = Videos[level]
    const AudioUrl = Audios[level]

    if (reset) {
        return (<div id="GameWrapper" key={level + " " + trys} className={" Level" + level}><KillScreen setReset={setReset} setTrys={setTrys} trys={trys} /></div>)
    } else {
        if (video)
            return <Video game={props.game} level={level} trys={trys} setVideo={setVideo} url={VideoUrl} />
        return <div id="GameWrapper" key={level + " " + trys} className={" Level" + level}>
            <div className="LevelLabel" onClick={() => setLevel(level + 1)}>Level {level}</div>
            <Game {...settings} />
            <Audio url={AudioUrl}></Audio>
        </div>
    }
}
export default GameLoader;