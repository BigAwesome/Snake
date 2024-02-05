import { IVector } from "./interfaces/IVector"
import Vector from "./model/Vector"

export interface IDirectionMap {
    [name: string]: IVector
}
export const DirectionMap: IDirectionMap = {
    'A': new Vector(-1, 0), 'D': new Vector(1, 0), 'W': new Vector(0, -1), 'S': new Vector(0, 1),
    'ArrowUp': new Vector(0, -1), 'ArrowDown': new Vector(0, 1), 'ArrowLeft': new Vector(-1, 0), 'ArrowRight': new Vector(1, 0),
}
