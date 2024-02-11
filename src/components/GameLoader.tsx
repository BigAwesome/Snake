import { useState } from "react";
import { IGameLoaderProps } from "../interfaces/IGameLoader";
import Game from "./Game";

function GameLoader(props: IGameLoaderProps) {
    const [level, setLevel] = useState(1);
    const [reset, setReset] = useState(false);
    const [trys, setTrys] = useState(1);

    if (reset) {
        setReset(false)
        setTrys(trys + 1)
        return <>
            Loading...
        </>
    } else {
        return <div id="GameWrapper" key={level + " " + trys} className={" Level" + level}>
            <Game width={props.game?.width} height={props.game?.height} onComplete={() => { setLevel(level + 1) }} onFail={() => { setReset(true) }} />
        </div>
    }
}
export default GameLoader;