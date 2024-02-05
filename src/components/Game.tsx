import { useEffect, useRef, useState } from "react";
import { DirectionMap } from "../InputBinding";
import { IGameProps } from "../interfaces/IGame";
import Snake from "../model/Snake";
import Vector from "../model/Vector";

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

function Game(props: IGameProps) {

    const [score, setScore] = useState(0);
    const [snake, setSnake] = useState(new Snake(new Vector(10, 10)))

    const ref = useRef<HTMLCanvasElement>(null)


    useEffect(() => {
        const interval = setInterval(() => {
            setScore(score + 1);
            if (ref.current) {
                const ctx = ref.current.getContext('2d');
                if (!ctx) return;
                if (snake.head.x === 10 && snake.head.y === 10) snake.grow()
                if (snake.head.x === 16 && snake.head.y === 10) snake.grow()
                if (snake.head.x === 88 && snake.head.y === 10) snake.grow()
                if (snake.head.x === 94 && snake.head.y === 10) snake.grow()
                snake.redraw(ctx, props.width, props.height)
                snake.move()
            }
        }, 1000);
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