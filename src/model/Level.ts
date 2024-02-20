import { IApple } from "../interfaces/IApple";
import { ILevel, ILevelProps } from "../interfaces/ILevel";
import { ISnake } from "../interfaces/ISnake";
import Apple from "./Apple";
import Snake from "./Snake";
import Vector from "./Vector";

export default class Level implements ILevel {
    private _score: number;
    private _eating: boolean;
    private _food: IApple[];
    private _snake: ISnake;

    onComplete(): void { }
    onFail(): void { }

    constructor(props: ILevelProps) {
        const randomVector = new Vector(Math.floor(Math.random() * (props.width ? props.width : 10)), Math.floor(Math.random() * (props.height ? props.height : 10)));
        this._snake = new Snake(randomVector, () => props.onFail ? props.onFail() : null)
        this._food = [new Apple(new Vector(props.width, props.height))]
        this._score = 0;
        this._eating = false;

        this.onComplete = props.onComplete ? props.onComplete : () => { }
        this.onComplete = this.onComplete.bind(this);
        this.onFail = props.onFail ? props.onFail : () => { }
        this.onFail = this.onFail.bind(this);
    }


    public get eating(): boolean {
        return this._eating;
    }
    public set eating(v: boolean) {
        this._eating = v;
    }

    public get food(): IApple[] {
        return this._food;
    }
    public set food(v: IApple[]) {
        this._food = v;
    }
    public get snake(): ISnake {
        return this._snake;
    }
    public set snake(v: ISnake) {
        this._snake = v;
    }
    public get score(): number {
        return this._score;
    }
    public set score(v: number) {
        this._score = v;
    }

}