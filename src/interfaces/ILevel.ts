import { IApple } from "./IApple";
import { IGameProps } from "./IGame";
import { ISnake } from "./ISnake";

export interface ILevel {
    score: Number;
    snake: ISnake;
    food: IApple[];
    eating: boolean;
    onComplete?(): void;
    onFail?(): void;
}

export interface ILevelProps extends IGameProps {

}