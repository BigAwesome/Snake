import { IGameProps } from "../../interfaces/IGame"

function Level6(props: IGameProps) {
    return <>
        <button onClick={() => { if (props.onComplete) props.onComplete() }}>WIN</button>
        <button onClick={() => { if (props.onComplete) props.onComplete() }}>LOSS</button>
    </>
}


export default Level6