import { IRenderable } from "./IRenderable";
import { IVector } from "./IVector";

export interface IApple extends IRenderable {
    position: IVector;
}