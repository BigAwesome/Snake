import { useEffect, useRef, useState } from "react";
import { IGameProps } from "../../interfaces/IGame";
import Apple from "../../model/Apple";
import Snake from "../../model/Snake";
import Vector from "../../model/Vector";
import { enforceBorder, formatScore, inputHandler } from "../../model/Utils";
import { GameColors } from "../../levelBindings";
import { IApple } from "../../interfaces/IApple";
import SnakeImg from "../../assets/images/Snake_1.png"
import AppleImg from "../../assets/images/Apple_Black_1.png"
import DecoyImgRed from "../../assets/images/Apple_Red_1.png"
import DecoyImgGrey from "../../assets/images/Apple_Grey_1.png"





function Level2(props: IGameProps) {
    const randomVector = new Vector(Math.floor(Math.random() * (props.width ? props.width : 10)), Math.floor(Math.random() * (props.height ? props.height : 10)));


    const [score, setScore] = useState(0);
    const [snake] = useState(new Snake(randomVector, () => props.onFail ? props.onFail() : null))
    const [apple] = useState(new Apple(new Vector(props.width, props.height), GameColors.Black))
    const [decoys, setDecoys] = useState([new Apple(new Vector(props.width, props.height), GameColors.Red), new Apple(new Vector(props.width, props.height), GameColors.First)] as IApple[])
    const [food, setFood] = useState(false)
    const [cleard, setCleard] = useState(false)
    const [move, setMove] = useState(false)



    const ref = useRef<HTMLCanvasElement>(null)


    //Add controls
    useEffect(() => {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            setMove(true)
            snake.direction = inputHandler(e)
            setScore(snake.score);
        });
        document.addEventListener("keyup", (e: KeyboardEvent) => {
            snake.direction = inputHandler(e)
            setMove(false)
            setScore(snake.score);
        });

    }, []);



    //Getting decoy food behaviour
    useEffect(() => {
        const interval = setInterval(() => {
            if (decoys.length > 10) return
            const tempDecoys = [...decoys]
            snake.color = GameColors.Black
            for (let index = 0; index < 2; index++) {
                const decoy = new Apple(new Vector(props.width, props.height))
                if (index % 2 == 0) {
                    decoy.color = GameColors.Red
                } else {
                    decoy.color = GameColors.First
                }
                tempDecoys.push(decoy)
            }
            setDecoys(tempDecoys)
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [decoys])


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
        setScore(snake.score);
        const interval = setInterval(() => {
            if (move) snake.move()
            if (!ref.current) return
            const ctx = ref.current.getContext('2d');
            if (!ctx) return;

            if (enforceBorder(props, snake)) {
                if (props.onComplete)
                    return props.onComplete()
                else throw new Error("Game Over but no screen defined")
            }
            const snakeImg = new Image()
            snakeImg.src = SnakeImg
            snake.redraw(ctx, props.width, props.height, snakeImg)

            const appleImg = new Image()

            apple.draw(ctx, appleImg)
            appleImg.src = AppleImg



            console.log(decoys.length);
            decoys.forEach((d, i) => {
                if (i === 0 || i % 2 === 0) {
                    const decoyImgRed = new Image()
                    d.draw(ctx, decoyImgRed);
                    decoyImgRed.src = DecoyImgRed
                }
                else {
                    const decoyImgGrey = new Image()
                    d.draw(ctx, decoyImgGrey);
                    decoyImgGrey.src = DecoyImgGrey
                }
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


        }, 400);
        if (ref.current) {
            const ctx = ref.current.getContext('2d');
            if (!ctx) return;
        }
        return () => {
            clearInterval(interval);
        };
    });

    return <div id="GameDisplay">
        <div><img className="LevelIcon" src={AppleImg} width={snake.scale} height={snake.scale} alt="" />{formatScore(score)}</div>
        <canvas id="GameCanvasRender" ref={ref} width={props.width} height={props.height} />
    </div>
}
export default Level2;