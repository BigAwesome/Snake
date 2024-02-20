import { useEffect, useRef, useState } from "react";
import { IGameProps } from "../../interfaces/IGame";
import Apple from "../../model/Apple";
import Snake from "../../model/Snake";
import Vector from "../../model/Vector";
import { enforceBorder, formatScore, inputHandler } from "../../model/Utils";



function Level3(props: IGameProps) {
    const randomVector = new Vector(Math.floor(Math.random() * (props.width ? props.width : 10)), Math.floor(Math.random() * (props.height ? props.height : 10)));


    const [score, setScore] = useState(0);
    const [snake] = useState(new Snake(randomVector, () => props.onFail ? props.onFail() : null))
    const [apple, setApple] = useState(new Apple(new Vector(props.width, props.height)))
    const [food, setFood] = useState(false)

    const ref = useRef<HTMLCanvasElement>(null)

    //Getting food behaviour
    useEffect(() => {
        if (food) {
            setApple(new Apple(new Vector(props.width, props.height)));
            snake.grow()
            snake.frozen = false;
        }
        setFood(false)
    }, [food])

    //Game "ticks" running main loop
    useEffect(() => {
        const interval = setInterval(() => {
            setScore(snake.body.length);
            if (!ref.current) return
            const ctx = ref.current.getContext('2d');
            if (!ctx) return;
            snake.move()

            if (enforceBorder(props, snake)) {
                if (props.onComplete)
                    props.onComplete()
                else throw new Error("Game Over but no screen defined")
            }
            // snake.grow() // TODO: remove. only for testing!
            snake.redraw(ctx, props.width, props.height)
            apple.draw(ctx)

            if (!food && Math.abs(apple.position.x - snake.head.x) < snake.scale && Math.abs(apple.position.y - snake.head.y) < snake.scale) {
                snake.frozen = true;
                setFood(true)
            }


        }, 200);
        if (ref.current) {
            const ctx = ref.current.getContext('2d');
            if (!ctx) return;
        }
        document.addEventListener("keyup", (e: KeyboardEvent) => {
            snake.turn(inputHandler(e))
        });
        return () => {
            clearInterval(interval);
        };
    }, [score]);


    return <div id="GameDisplay">
        <div>{formatScore(score)}</div>
        <canvas id="GameCanvasRender" ref={ref} width={props.width} height={props.height} />
    </div>
}
export default Level3;