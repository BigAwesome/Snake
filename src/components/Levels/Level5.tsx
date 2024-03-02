import { useEffect, useRef, useState } from "react";
import { IGameProps } from "../../interfaces/IGame";
import Apple from "../../model/Apple";
import Snake from "../../model/Snake";
import Vector from "../../model/Vector";
import { enforceBorder, formatScore, inputHandler, mirrorBorder } from "../../model/Utils";
import { GameColors } from "../../levelBindings";



function Level5(props: IGameProps) {
    const randomVector = new Vector(Math.floor(Math.random() * (props.width ? props.width : 10)), Math.floor(Math.random() * (props.height ? props.height : 10)));


    const [score, setScore] = useState(0);
    const [snake] = useState(new Snake(randomVector, () => props.onFail ? props.onFail() : null))
    const [apple, setApple] = useState(new Apple(new Vector(props.width, props.height)))
    const [food, setFood] = useState(false)
    const [size, setSize] = useState(new Vector(props.width, props.height))
    const [sizeCooldown, setCooldown] = useState(0)

    const ref = useRef<HTMLCanvasElement>(null)

    //startup behaviour
    useEffect(() => {
        snake.color = GameColors.Fifth
        // setSize(new Vector(size.x, size.y))

    })

    //Getting food behaviour
    useEffect(() => {
        if (food) {
            setApple(new Apple(new Vector(size.x, size.y)));
            snake.grow()
            snake.frozen = false;
        }
        setFood(false)
    }, [food])

    //Game "ticks" running main loop
    useEffect(() => {
        const interval = setInterval(() => {
            setScore(snake.score);
            if (!ref.current) return
            const ctx = ref.current.getContext('2d');
            if (!ctx) return;
            snake.move()
            if (typeof size.x === "undefined" || typeof size.y === "undefined") throw new Error("Cant read size")

            if (size.x <= snake.scale || size.y <= snake.scale) {
                if (props.onComplete)
                    props.onComplete()
                else throw new Error("Game Over but no screen defined")
            }
            if (sizeCooldown % 4 == 0) {
                setSize(new Vector(size.x - 32, size.y - 32))
            }
            mirrorBorder({ ...props, width: size.x, height: size.y }, snake)

            snake.redraw(ctx, size.x, size.y)

            if (apple.position.x > size.x - snake.scale) apple.position.x = size.x - (snake.scale * 2)
            if (apple.position.y > size.y - snake.scale) apple.position.y = size.y - (snake.scale * 2)
            apple.draw(ctx)

            if (!food && Math.abs(apple.position.x - snake.head.x) < snake.scale && Math.abs(apple.position.y - snake.head.y) < snake.scale) {
                snake.frozen = true;
                setFood(true)
            }
            setCooldown(sizeCooldown + 1)

        }, 400);
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
    }, [score, sizeCooldown, size, food]);


    return <div id="GameDisplay">
        <div></div>
        <canvas id="GameCanvasRender" ref={ref} width={size.x} height={size.y} />
    </div>
}
export default Level5;