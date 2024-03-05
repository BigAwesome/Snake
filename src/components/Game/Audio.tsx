import { IAudioProps } from "../../interfaces/IAudio";

export function Audio(props: IAudioProps) {

    console.log(props.url);
    if (typeof props.url === "undefined" || props.url === null || props.url === "") return <div></div>

    return (
        <div className="AudioWrapper">
            <audio className="AudioControlls" controls autoPlay loop>
                <source src={props.url} type="audio/mpeg" />
            </audio>
        </div>
    )
}