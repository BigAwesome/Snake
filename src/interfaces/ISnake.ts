import { SnakeColor } from "../levelBindings";
import { IVector } from "./IVector";

export interface ISnake {
    direction: IVector;
    head: IVector;
    body: IVector[];
    color: SnakeColor;
    scale: number;
    grow(): void;
    move(): void;
    turn(direction: IVector): void;
    draw(ctx: CanvasRenderingContext2D): void;
    redraw(ctx: CanvasRenderingContext2D, width?: number, height?: number): void;
}