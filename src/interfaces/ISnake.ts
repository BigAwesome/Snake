import { IVector } from "./IVector";

export interface ISnake {
    direction: IVector;
    head: IVector;
    body: IVector[];
    grow(): void;
    move(): void;
    turn(direction: IVector): void;
    draw(ctx: CanvasRenderingContext2D): void;
}