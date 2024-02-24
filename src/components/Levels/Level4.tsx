import { useEffect, useRef, useState } from "react";
import { IGameProps } from "../../interfaces/IGame";
import Apple from "../../model/Apple";
import Snake from "../../model/Snake";
import Vector from "../../model/Vector";
import { enforceBorder, formatScore, inputHandler, mirrorBorder } from "../../model/Utils";
import { IApple } from "../../interfaces/IApple";
import { GameColors } from "../../levelBindings";



function Level4(props: IGameProps) {
    const randomVector = new Vector(Math.floor(Math.random() * (props.width ? props.width : 10)), Math.floor(Math.random() * (props.height ? props.height : 10)));


    const [score, setScore] = useState(0);
    const [snake] = useState(new Snake(randomVector, () => props.onComplete ? props.onComplete() : null))
    const [apples, setApples] = useState([] as IApple[])
    const [food, setFood] = useState(false)

    const ref = useRef<HTMLCanvasElement>(null)

    //Getting food behaviour
    useEffect(() => {
        if (food) {
            const tempApples = apples;
            tempApples.forEach((ta, i) => {
                if (Math.abs(ta.position.x - snake.head.x) < snake.scale && Math.abs(ta.position.y - snake.head.y) < snake.scale) {
                    tempApples[i] = new Apple(new Vector(props.width, props.height), tempApples[i].color)
                }
            })
            setApples(tempApples)
            snake.grow()
            snake.frozen = false;
        }
        setFood(false)
    }, [food])

    //Getting decoy food behaviour
    useEffect(() => {
        snake.color = GameColors.Fourth
        for (let index = 0; index < 10; index++) {
            const apple = new Apple(new Vector(props.width, props.height))
            apple.color = GameColors.Fourth
            apples.push(apple)
        }
    }, [])


    //Game "ticks" running main loop
    useEffect(() => {
        const interval = setInterval(() => {
            setScore(snake.score);
            if (!ref.current) return
            const ctx = ref.current.getContext('2d');
            if (!ctx) return;
            snake.move()

            mirrorBorder(props, snake)

            // snake.grow() // TODO: remove. only for testing!
            snake.redraw(ctx, props.width, props.height)
            apples.forEach(a => {
                a.draw(ctx);
            })

            if (!food) {
                //Found food but not next level
                if (apples.filter(a => Math.abs(a.position.x - snake.head.x) < snake.scale && Math.abs(a.position.y - snake.head.y) < snake.scale).length != 0) {
                    setFood(true)
                }
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
        <div></div>
        <canvas id="GameCanvasRender" ref={ref} width={props.width} height={props.height} />
    </div>
}
export default Level4;