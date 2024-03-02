import { useState } from "react"
import { IGameProps } from "../../interfaces/IGame"
import Video from "../Video";


function Level7(props: IGameProps) {
    const [video, setVideo] = useState(false);
    if (video) return <Video level={7} setVideo={(e) => { window.location.reload(); }} trys={0} game={props} />
    return <>
        <div className="ButtonWrapper">
            <div className="Button ButtonWide" onClick={() => { window.location.reload() }}>
                RELIVE</div>
        </div >
        <div className="ButtonWrapper">
            <div className="Button ButtonWide" onClick={() => { setVideo(true) }}>
                QUIT</div>
        </div >
    </>
}


export default Level7