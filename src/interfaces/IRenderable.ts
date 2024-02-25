import { GameColors } from "../levelBindings";

export interface IRenderable {
    scale: number;
    color: GameColors;
    draw(ctx: CanvasRenderingContext2D, img?: HTMLImageElement): void;
    redraw(ctx: CanvasRenderingContext2D, width?: number, height?: number, img?: HTMLImageElement): void;
}