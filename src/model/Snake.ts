import { IVector } from "../interfaces/IVector";
import Vector from "./Vector";

export default class Snake {

    private _direction: IVector;
    private _head: IVector;
    private _body: IVector[];

    constructor(start: IVector, direction?: IVector) {
        this._head = new Vector(start.x, start.y)
        this._direction = direction ? direction : new Vector(1, 1)
        this._body = [this._head]
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