import { IApple } from "../interfaces/IApple";
import { IVector } from "../interfaces/IVector";
import Vector from "./Vector";

export default class Apple implements IApple {

    private _position: IVector;
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


}