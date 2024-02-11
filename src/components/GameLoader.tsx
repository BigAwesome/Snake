import { useState } from "react";
import { IGameLoaderProps } from "../interfaces/IGameLoader";
import Game from "./Game";

function GameLoader(props: IGameLoaderProps) {
    const [level, setLevel] = useState(1);
    const [reset, setReset] = useState(false);
    const [video, setVideo] = useState(false);
    const [trys, setTrys] = useState(1);

    if (reset) {
        setReset(false)
        setTrys(trys + 1)
        return <>
            Loading...
        </>
    } else {
        if (video)
            return <div id="VideoWrapper" key={level + " " + trys} className={" Level" + (level - 1)}>
                <div className="LevelLabel">Level {level - 1} Video</div>
                <div id="VideoDisplay">
                    <div id="NextLevelBtn"><button title="Next Level" onClick={() => { setVideo(false); }}>X</button></div>
                    <iframe width="1280" height="720" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up (Official Music Video)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </div>

        return <div id="GameWrapper" key={level + " " + trys} className={" Level" + level}>
            <div className="LevelLabel">Level {level}</div>
            <Game width={props.game?.width} height={props.game?.height} onComplete={() => { setLevel(level + 1); setVideo(true); }} onFail={() => { setReset(true) }} />
        </div>
    }
}
export default GameLoader;