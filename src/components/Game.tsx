import { useEffect, useRef, useState } from "react";
import { IGameProps } from "../interfaces/IGame";
import Snake from "../model/Snake";
import Vector from "../model/Vector";

function formatScore(score: number): string {

    if (score < 10) return `000${score}`;
    if (score < 100) return `00${score}`;
    if (score < 1000) return `0${score}`;
    return score.toString();
}

function Game(props: IGameProps) {

    const [score, setScore] = useState(0);
    const [snake, setSnake] = useState(new Snake(new Vector()))

    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setScore(score + 1);
            if (ref.current) {
                const ctx = ref.current.getContext('2d');
                if (!ctx) return;
                snake.draw(ctx)
                snake.move()
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [score]);

    useEffect(() => {
        if (ref.current) {
            const ctx = ref.current.getContext('2d');
            if (!ctx) return;
            // ctx.moveTo(0, 0);
            // ctx.lineTo(200, 100);
            // ctx.stroke();

            ctx.fillStyle = "#747369";
            ctx.fillRect(25, 25, 5, 5)
        }
    }, [])

    return <div id="GameDisplay">
        <div>{formatScore(score)}</div>
        <canvas id="GameCanvasRender" ref={ref} width={props.width} height={props.height} />
    </div>
}
export default Game;