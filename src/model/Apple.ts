import { IApple } from "../interfaces/IApple";
import { IVector } from "../interfaces/IVector";
import { GameColors } from "../levelBindings";
import Vector from "./Vector";

export default class Apple implements IApple {

    private _position: IVector;
    private _scale: number = 5;
    private _color: GameColors = GameColors.Secound;


    constructor(mapSize?: IVector, position?: IVector) {
        if (!mapSize && !position) throw new Error("Requires eigther mapSize or position to work!");
        this._position = position ? position : new Vector(Math.random() * mapSize!.x, Math.random() * mapSize!.y)
    }
    public get position(): IVector {
        return this._position;
    }
    public set position(v: IVector) {
        this._position = v;
    }
    public get scale(): number {
        return this._scale;
    }
    public set scale(v: number) {
        this._scale = v;
    }
    public get color(): GameColors {
        return this._color;
    }
    public set color(v: GameColors) {
        this._color = v;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        // ctx.fillRect(this.head.x, this.head.y, 5, 5)
        // Render entire body
        ctx.fillRect(this.position.x, this.position.y, this.scale, this.scale)

    }
    redraw(ctx: CanvasRenderingContext2D, width?: number | undefined, height?: number | undefined): void {
        // ctx.clearRect(0, 0, width ? width : 100, height ? height : 100);
        this.draw(ctx)
    }

}