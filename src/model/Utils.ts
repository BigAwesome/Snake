import { DirectionMap } from "../InputBinding";
import { IGameProps } from "../interfaces/IGame";
import { IVector } from "../interfaces/IVector";
import Snake from "./Snake";
import Vector from "./Vector";

export function formatScore(score: number): string {
    let renderString = "";
    let absScore = Math.abs(score);
    if (score < 0) renderString = "-"
    if (absScore < 10) renderString += `000${absScore}`;
    else if (absScore < 100) renderString += `00${absScore}`;
    else if (absScore < 1000) renderString += `0${absScore}`;
    else renderString += absScore.toString();
    return renderString
}


export function inputHandler(e: KeyboardEvent): IVector {
    const match: string[] = Object.keys(DirectionMap).filter(dm => dm === e.key || dm === e.key.toUpperCase())
    if (match.length <= 0) return new Vector(0, 0);
    return DirectionMap[match[0]];
}

export function enforceBorder(props: IGameProps, snake: Snake): boolean {
    if (snake.head.x < 0 || snake.head.y < 0) return true
    if (props.width && snake.head.x > (props.width - snake.scale)) return true
    if (props.height && snake.head.y > (props.height - snake.scale)) return true

    return false
}

export function getRandomPosition(width: number, height: number) {
    return new Vector(Math.floor(Math.random() * (width ? width : 10)), Math.floor(Math.random() * (height ? height : 10)));

}
