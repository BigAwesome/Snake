import { ISnake } from "../interfaces/ISnake";
import { IVector } from "../interfaces/IVector";
import Vector from "./Vector";

export default class Snake implements ISnake {

    private _direction: IVector;
    private _head: IVector;
    private _body: IVector[];

    constructor(start: IVector, direction?: IVector) {
        this._head = new Vector(start.x, start.y)
        this._direction = direction ? direction : new Vector(1, 0)
        this._body = [this._head]
    }
    grow(): void {
        throw new Error("Method not implemented.");
    }
    move(): void {
        //TODO: Do propper movement
        this.head.x += this.direction.x * 6
        this.head.y += this.direction.y * 6
        console.log(this.head);
    }
    turn(direction: IVector): void {
        throw new Error("Method not implemented.");
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#747369";
        ctx.fillRect(this.head.x, this.head.y, 5, 5)
        // ctx.fillStyle = "red";
        // ctx.fillRect(31 + score * 6, 25, 5, 5)
        // // ctx.fillStyle = "blue";
        // ctx.fillRect(25 + score * 6, 31, 5, 5)
        // // ctx.fillStyle = "yellow";
        // ctx.fillRect(31 + score * 6, 31, 5, 5)
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

}