import { IGameProps } from "../../interfaces/IGame"
import DecoyImgRed from "../../assets/images/Apple_Red_1.png"
import AppleImg from "../../assets/images/Apple_Black_1.png"



function Level6(props: IGameProps) {
    return <>
        <div className="ButtonWrapper6">
            <div className="Button" onClick={() => { if (props.onComplete) props.onComplete() }}>
                <img src={DecoyImgRed} className="MenuIcon" />WIN</div>
            <div className="Button" onClick={() => { if (props.onComplete) props.onComplete() }}>
                <img src={AppleImg} className="MenuIcon" />LOSS</div>
        </div>
    </>
}


export default Level6