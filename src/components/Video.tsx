import { Videos } from "../config";
import { IVideoProps } from "../interfaces/IVideo";

export default function Video(props: IVideoProps) {
    const video = props.url ? props.url : Videos[props.level]
    return <div id="VideoWrapper" key={props.level + " " + props.trys} className={" Level" + (props.level - 1)}>
        <div className="LevelLabel"></div>
        <div id="VideoDisplay">
            <div id="NextLevelBtn"><div className="CloseButton" title="Next Level" onClick={() => { props.setVideo(false); }}>X</div></div>
            <iframe width={props.game?.width} height={props.game?.height} src={video} title="Rick Astley - Never Gonna Give You Up (Official Music Video)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
    </div>
}