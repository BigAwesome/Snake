import { IVideoProps } from "../interfaces/IVideo";

export default function Video(props: IVideoProps) {
    const video = props.url ? props.url : "https://www.youtube.com/embed/dQw4w9WgXcQ"
    return <div id="VideoWrapper" key={props.level + " " + props.trys} className={" Level" + (props.level - 1)}>
        <div className="LevelLabel">Level {props.level - 1} Video</div>
        <div id="VideoDisplay">
            <div id="NextLevelBtn"><button title="Next Level" onClick={() => { props.setVideo(false); }}>X</button></div>
            <iframe width={props.game?.width} height={props.game?.height} src={video} title="Rick Astley - Never Gonna Give You Up (Official Music Video)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
    </div>
}