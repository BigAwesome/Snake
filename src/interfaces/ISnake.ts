import { GameColors } from "../levelBindings";
import { IRenderable } from "./IRenderable";
import { IVector } from "./IVector";

export interface ISnake extends IRenderable {
    direction: IVector;
    head: IVector;
    body: IVector[];
    color: GameColors;
    frozen: boolean;
    grow(): void;
    move(): void;
    turn(direction: IVector): void;
}