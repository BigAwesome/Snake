import { IGameProps } from "../../interfaces/IGame";


function Level7(props: IGameProps) {

    return <>
        <div className="SmallButtonGroup">
            <div className="SmallButtonWrapper" onClick={() => { window.location.reload() }}>
                <div className="SmallButton">
                    RELIVE
                </div>
            </div>
            <div className="SmallButtonWrapper" onClick={() => { if (props.onComplete) props.onComplete() }}>
                <div className="SmallButton">
                    QUIT
                </div>
            </div>
        </div>
    </>
}


export default Level7