import { ISnake } from "../interfaces/ISnake";
import { IVector } from "../interfaces/IVector";
import { SnakeColor } from "../levelBindings";
import Vector from "./Vector";

export default class Snake implements ISnake {

    private _direction: IVector;
    private _head: IVector;
    private _body: IVector[];

    private _color: SnakeColor;

    private _scale: number = 5;



    constructor(start: IVector, direction?: IVector) {
        this._head = new Vector(start.x, start.y)
        this._direction = direction ? direction : new Vector(1, 0)
        this._body = [this._head]
        this._color = SnakeColor.First;
    }

    public get direction(): IVector {
        return this._direction;
    }
    public set direction(v: IVector) {
        this._direction = v;
    }
    public get head(): IVector {
        return this._head;
    }
    public set head(v: IVector) {
        this._head = v;
    }
    public get body(): IVector[] {
        return this._body;
    }
    public set body(v: IVector[]) {
        this._body = v;
    }
    public get color(): SnakeColor {
        return this._color;
    }
    public set color(v: SnakeColor) {
        this._color = v;
    }
    public get scale(): number {
        return this._scale;
    }
    public set scale(v: number) {
        this._scale = v;
    }

    grow(): void {
        this.body.push(new Vector(this.head.x, this.head.y))
    }
    move(): void {
        //TODO: Do propper movement
        if (this.body.length <= 1) return;
        for (let index = this.body.length - 1; index > 0; index--) {
            console.log(index);
            if (index === 0) return;
            const bodypart = this.body[index];
            bodypart.x = this.body[index - 1].x
            bodypart.y = this.body[index - 1].y

        }
        this.head.x += this.direction.x * (this.scale + 1)
        this.head.y += this.direction.y * (this.scale + 1)
    }
    turn(direction: IVector): void {
        this.direction = direction;
    }
    redraw(ctx: CanvasRenderingContext2D, width?: number, height?: number): void {
        ctx.clearRect(0, 0, width ? width : 100, height ? height : 100);
        this.draw(ctx)
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        // ctx.fillRect(this.head.x, this.head.y, 5, 5)
        // Render entire body
        this.body.forEach(bp => {
            ctx.fillRect(bp.x, bp.y, this.scale, this.scale)
        })
        // ctx.fillStyle = "red";
        // ctx.fillRect(31 + score * 6, 25, 5, 5)
        // // ctx.fillStyle = "blue";
        // ctx.fillRect(25 + score * 6, 31, 5, 5)
        // // ctx.fillStyle = "yellow";
        // ctx.fillRect(31 + score * 6, 31, 5, 5)
    }


}