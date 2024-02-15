import { globalScaleFactor } from "../config";
import { ISnake } from "../interfaces/ISnake";
import { IVector } from "../interfaces/IVector";
import { GameColors } from "../levelBindings";
import Vector from "./Vector";

export default class Snake implements ISnake {

    private _direction: IVector;
    private _head: IVector;
    private _body: IVector[];

    private _frozen: boolean;

    private _color: GameColors;

    private _scale: number = globalScaleFactor;

    private _onSelfCollision: Function;

    constructor(start: IVector, onSelfCollision: () => void, direction?: IVector) {
        this._head = new Vector(start.x, start.y)
        this._direction = direction ? direction : new Vector(1, 0)
        this._body = [this._head]
        this._color = GameColors.First;
        this._onSelfCollision = onSelfCollision
        this._head.x -= this._head.x % this._scale
        this._head.y -= this._head.y % this._scale
        this._frozen = false;
        if (this._head.x <= 0) this._head.x = this._scale
        if (this._head.y <= 0) this._head.y = this._scale
    }
    public get frozen(): boolean {
        return this._frozen;
    }
    public set frozen(v: boolean) {
        this._frozen = v;
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
    public get color(): GameColors {
        return this._color;
    }
    public set color(v: GameColors) {
        this._color = v;
    }
    public get scale(): number {
        return this._scale;
    }
    public set scale(v: number) {
        this._scale = v;
    }

    grow(): void {
        this.body.push(new Vector(this.body[this._body.length - 1].x, this.body[this._body.length - 1].y))
    }
    move(): void {
        if (this._frozen) return;
        this.head.x += this.direction.x * (this.scale)
        this.head.y += this.direction.y * (this.scale)
        if (this.body.length <= 1) {
            return
        }
        for (let index = this.body.length - 1; index > 0; index--) {
            if (index === 0) return;
            const bodypart = this.body[index];
            if (bodypart.x == this.head.x && bodypart.y == this.head.y) return this._onSelfCollision()
            bodypart.x = this.body[index - 1].x
            bodypart.y = this.body[index - 1].y

        }
    }
    turn(direction: IVector): void {
        if (this.direction.x == 1 && direction.x == -1 || this.direction.x == -1 && direction.x == 1) return // Horizontal 180 flip
        if (this.direction.y == 1 && direction.y == -1 || this.direction.y == -1 && direction.y == 1) return // Vertical 180 flip
        this.direction = direction;
    }
    redraw(ctx: CanvasRenderingContext2D, width?: number, height?: number): void {
        ctx.clearRect(0, 0, width ? width : 100, height ? height : 100);
        this.draw(ctx)
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        // Render entire body
        this.body.forEach(bp => {
            ctx.fillRect(bp.x - this.scale / 2, bp.y - this.scale / 2, this.scale, this.scale)
        })
    }


}