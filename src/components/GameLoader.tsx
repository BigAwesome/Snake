import { useState } from "react";
import { IGameLoaderProps } from "../interfaces/IGameLoader";
import KillScreen from "./Game/KillScreen";
import { Levels } from "../config";


function GameLoader(props: IGameLoaderProps) {

    const [level, setLevel] = useState(1); //TODO: reset to 1 after testing 
    const [reset, setReset] = useState(false);
    const [video, setVideo] = useState(false);
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

    if (reset) {
        return (<div id="GameWrapper" key={level + " " + trys} className={" Level" + level}><KillScreen setReset={setReset} setTrys={setTrys} trys={trys} /></div>)
    } else {
        if (video)
            return <div id="VideoWrapper" key={level + " " + trys} className={" Level" + (level - 1)}>
                <div className="LevelLabel">Level {level - 1} Video</div>
                <div id="VideoDisplay">
                    <div id="NextLevelBtn"><button title="Next Level" onClick={() => { setVideo(false); }}>X</button></div>
                    <iframe width={props.game?.width} height={props.game?.height} src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up (Official Music Video)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </div>
        return <div id="GameWrapper" key={level + " " + trys} className={" Level" + level}>
            <div className="LevelLabel" onClick={() => setLevel(level + 1)}>Level {level}</div>
            <Game {...settings} />
        </div>
    }
}
export default GameLoader;