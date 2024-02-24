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

    private _score: number;


    constructor(start: IVector, onSelfCollision: () => void, direction?: IVector) {
        this._head = new Vector(start.x, start.y)
        this._direction = direction ? direction : new Vector(1, 0)
        this._body = [this._head]
        this._color = GameColors.First;
        this._onSelfCollision = onSelfCollision
        this._head.x -= this._head.x % this._scale
        this._head.y -= this._head.y % this._scale
        this._frozen = false;
        this._score = 0;
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
    public get score(): number {
        return this._score;
    }
    public set score(v: number) {
        this._score = v;
    }

    grow(amount?: number): void {
        if (amount !== null && typeof amount !== "undefined" && amount > 1) {
            for (let index = 0; index < amount; index++) {
                return this.grow(1)
            }
        }
        this.score += amount ? amount : 1;
        if (this.score <= 0) return;

        this.body.push(new Vector(this.body[this._body.length - 1].x, this.body[this._body.length - 1].y))
        if (this._body.length === 2) {
            this.body[1].x -= this.direction.x * (this.scale)
            this.body[1].y -= this.direction.x * (this.scale)
        }
    }

    shrink(amount?: number | undefined): void {
        if (amount !== null && typeof amount !== "undefined" && amount > 1) {
            for (let index = 0; index < amount; index++) {
                return this.shrink(1);
            }
        }
        this.score -= amount ? amount : 1;

        if (this.score <= 0) {
            this.body = [this.head]
            return;
        }
        let newBody = [...this.body];
        newBody = newBody.slice(newBody.length - 1, 1);
        if (this.body.length === 1) {
            return;
        }
        this.body = newBody;
    }
    move(): void {
        if (this._frozen) return;
        for (let index = this.body.length - 1; index > 0; index--) {
            const bodypart = this.body[index];
            if (bodypart === this.head) continue;
            this.body[index].x = this.body[index - 1].x
            this.body[index].y = this.body[index - 1].y
        }
        this.head.x += this.direction.x * (this.scale)
        this.head.y += this.direction.y * (this.scale)
        if (this.body.filter(bp => bp.x === this.head.x && bp.y === this.head.y).length !== 1) return this._onSelfCollision()
    }
    turn(direction: IVector): void {
        if (direction.x === 0 && direction.y === 0) return;
        if (this.direction.x === 1 && direction.x === -1) return // Horizontal 180 flip
        if (this.direction.x === -1 && direction.x === 1) return // Horizontal 180 flip
        if (this.direction.y === 1 && direction.y === -1) return // Vertical 180 flip
        if (this.direction.y === -1 && direction.y === 1) return // Vertical 180 flip
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