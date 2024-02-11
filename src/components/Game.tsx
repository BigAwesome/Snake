import { useEffect, useRef, useState } from "react";
import { DirectionMap } from "../InputBinding";
import { IGameProps } from "../interfaces/IGame";
import Snake from "../model/Snake";
import Vector from "../model/Vector";
import Apple from "../model/Apple";

function formatScore(score: number): string {

    if (score < 10) return `000${score}`;
    if (score < 100) return `00${score}`;
    if (score < 1000) return `0${score}`;
    return score.toString();
}


function inputHandler(e: KeyboardEvent, snake: Snake) {
    const match: string[] = Object.keys(DirectionMap).filter(dm => dm === e.key || dm === e.key.toUpperCase())
    if (match.length <= 0) return;
    snake.turn(DirectionMap[match[0]]);
}

function enforceBorder(props: IGameProps, snake: Snake): boolean {
    if (snake.head.x < 0 || snake.head.y < 0) return true
    if (props.width && snake.head.x > (props.width - 5)) return true
    if (props.height && snake.head.y > (props.height - 5)) return true

    return false
}


function Game(props: IGameProps) {
    const randomVector = new Vector(Math.floor(Math.random() * (props.width ? props.width : 10)), Math.floor(Math.random() * (props.height ? props.height : 10)));


    const [score, setScore] = useState(0);
    const [snake] = useState(new Snake(randomVector, () => props.onFail ? props.onFail() : null))
    const [apple, setApple] = useState(new Apple(new Vector(props.width, props.height)))

    const ref = useRef<HTMLCanvasElement>(null)


    useEffect(() => {
        const interval = setInterval(() => {
            setScore(snake.body.length);
            if (ref.current) {
                const ctx = ref.current.getContext('2d');
                if (!ctx) return;
                if (Math.abs(apple.position.x - snake.head.x) <= 6 && Math.abs(apple.position.y - snake.head.y) <= 6) {
                    setApple(new Apple(new Vector(props.width, props.height)));
                    snake.grow()
                }
                snake.move()
                if (enforceBorder(props, snake)) {
                    if (props.onComplete)
                        props.onComplete()
                    else throw new Error("Game Over but no screen defined")
                }
                snake.redraw(ctx, props.width, props.height)
                apple.draw(ctx)
            }
        }, 200);
        if (ref.current) {
            const ctx = ref.current.getContext('2d');
            if (!ctx) return;
        }
        document.addEventListener("keyup", (e: KeyboardEvent) => inputHandler(e, snake));
        return () => {
            clearInterval(interval);
        };
    }, [score]);



    return <div id="GameDisplay">
        <div>{formatScore(score)}</div>
        <canvas id="GameCanvasRender" ref={ref} width={props.width} height={props.height} />
    </div>
}
export default Game;