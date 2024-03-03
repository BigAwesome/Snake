import { IAudioProps } from "../../interfaces/IAudio";

export function Audio(props: IAudioProps) {

    if (typeof props.url === "undefined" || props.url === null) return <></>

    return (<audio controls autoPlay loop><source src={props.url} type="audio/mpeg" /></audio>)
}