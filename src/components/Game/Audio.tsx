import { IAudioProps } from "../../interfaces/IAudio";

export function Audio(props: IAudioProps) {

    if (typeof props.url === "undefined" || props.url === null) return <></>

    return (
        <div className="AudioWrapper">
            <audio className="AudioControlls" controls autoPlay loop>
                <source src={props.url} type="audio/mpeg" />
            </audio>
        </div>
    )
}