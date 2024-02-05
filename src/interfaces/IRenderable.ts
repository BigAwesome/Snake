import { GameColors } from "../levelBindings";

export interface IRenderable {
    scale: number;
    color: GameColors;
    draw(ctx: CanvasRenderingContext2D): void;
    redraw(ctx: CanvasRenderingContext2D, width?: number, height?: number): void;
}