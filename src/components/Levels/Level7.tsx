import { useState } from "react"
import { IGameProps } from "../../interfaces/IGame"
import Video from "../Video";


function Level7(props: IGameProps) {

    return <>
        <div className="ButtonWrapper">
            <div className="Button ButtonWide" onClick={() => { window.location.reload() }}>
                RELIVE</div>
        </div >
        <div className="ButtonWrapper">
            <div className="Button ButtonWide" onClick={() => { if (props.onComplete) props.onComplete() }}>
                QUIT</div>
        </div >
    </>
}


export default Level7