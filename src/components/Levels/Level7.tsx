import { useState } from "react"
import { IGameProps } from "../../interfaces/IGame"
import Video from "../Video";

function Level7(props: IGameProps) {
    const [video, setVideo] = useState(false);
    if (video) return <Video level={7} setVideo={(e) => { window.location.reload(); }} trys={0} game={props} />
    return <>
        <button onClick={() => { window.location.reload() }}>RELIVE</button>
        <button onClick={() => { setVideo(true) }}>QUIT</button>
    </>
}


export default Level7