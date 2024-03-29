import { useEffect, useRef, useState } from "react";
import { IGameProps } from "../../interfaces/IGame";
import Apple from "../../model/Apple";
import Snake from "../../model/Snake";
import Vector from "../../model/Vector";
import { enforceBorder, formatScore, inputHandler } from "../../model/Utils";
import SnakeImg from "../../assets/images/Snake_1.png"
import AppleImg from "../../assets/images/Apple_1.png"




function Level1(props: IGameProps) {
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
            setScore(snake.score);
            if (!ref.current) return
            const ctx = ref.current.getContext('2d');
            if (!ctx) return;
            snake.move()

            if (enforceBorder(props, snake)) {
                if (props.onComplete)
                    props.onComplete()
                else throw new Error("Game Over but no screen defined")
            }

            const snakeImg = new Image()
            snakeImg.src = SnakeImg
            snake.redraw(ctx, props.width, props.height, snakeImg)


            const appleImg = new Image();
            appleImg.src = AppleImg
            // snake.grow() // TODO: remove. only for testing!
            apple.draw(ctx, appleImg)

            if (!food && Math.abs(apple.position.x - snake.head.x) < snake.scale && Math.abs(apple.position.y - snake.head.y) < snake.scale) {
                snake.frozen = true;
                setFood(true)
            }


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
    }, [score]);


    return <div id="GameDisplay">
        <div> <img className="LevelIcon" src={AppleImg} width={snake.scale} height={snake.scale} alt="" /> {formatScore(score)}</div>
        <canvas id="GameCanvasRender" ref={ref} width={props.width} height={props.height} />
    </div>
}
export default Level1;