import { IGameProps } from "../../interfaces/IGame"

function Level7(props: IGameProps) {
    return <>
        <button onClick={() => { if (props.onComplete) props.onComplete() }}>RELIVE</button>
        <button onClick={() => { if (props.onComplete) props.onComplete() }}>QUIT</button>
    </>
}


export default Level7