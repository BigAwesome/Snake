import { IGameProps } from "./IGame";

export interface IVideoProps {
    game?: IGameProps
    level: number
    trys: number
    setVideo(state:boolean):void
}