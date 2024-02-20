import { useEffect, useRef, useState } from "react";
import { IGameProps } from "../../interfaces/IGame";
import Apple from "../../model/Apple";
import Snake from "../../model/Snake";
import Vector from "../../model/Vector";
import { enforceBorder, formatScore, inputHandler } from "../../model/Utils";
import { GameColors } from "../../levelBindings";
import { IApple } from "../../interfaces/IApple";



function Level2(props: IGameProps) {
    const randomVector = new Vector(Math.floor(Math.random() * (props.width ? props.width : 10)), Math.floor(Math.random() * (props.height ? props.height : 10)));


    const [score, setScore] = useState(0);
    const [snake] = useState(new Snake(randomVector, () => props.onFail ? props.onFail() : null))
    const [apple] = useState(new Apple(new Vector(props.width, props.height), GameColors.Black))
    const [decoys, setDecoys] = useState([] as IApple[])
    const [food, setFood] = useState(false)
    const [cleard, setCleard] = useState(false)

    const ref = useRef<HTMLCanvasElement>(null)

    //Getting decoy food behaviour
    useEffect(() => {
        snake.color = GameColors.Black
        for (let index = 0; index < 10; index++) {
            const decoy = new Apple(new Vector(props.width, props.height))
            if (index % 2 == 0) {
                decoy.color = GameColors.Red
            } else {
                decoy.color = GameColors.First
            }
            decoys.push(decoy)
        }
    }, [])


    //Getting Level up behaviour
    useEffect(() => {
        if (cleard) {
            if (props.onComplete) props.onComplete()
        }
        setCleard(false)
    }, [cleard])

    //Getting food behaviour
    useEffect(() => {
        if (food) {
            const tempDecoy = decoys;
            tempDecoy.forEach((td, i) => {
                if (Math.abs(td.position.x - snake.head.x) < snake.scale && Math.abs(td.position.y - snake.head.y) < snake.scale) {
                    tempDecoy[i] = new Apple(new Vector(props.width, props.height), tempDecoy[i].color)
                }
            })
            setDecoys(tempDecoy)
            snake.grow()
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

            decoys.forEach(d => {
                d.draw(ctx);
            })

            if (!food) {
                //Found food and next level
                if (Math.abs(apple.position.x - snake.head.x) < snake.scale && Math.abs(apple.position.y - snake.head.y) < snake.scale) {
                    setCleard(true)
                }
                //Found food but not next level
                if (decoys.filter(d => Math.abs(d.position.x - snake.head.x) < snake.scale && Math.abs(d.position.y - snake.head.y) < snake.scale).length != 0) {
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
        <div>{formatScore(score)}</div>
        <canvas id="GameCanvasRender" ref={ref} width={props.width} height={props.height} />
    </div>
}
export default Level2;