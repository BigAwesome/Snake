import IKillScreenProps from "../../interfaces/IKillScreen";
import SnakeImg from "../../assets/images/Apple_1.png"
import AppleImg from "../../assets/images/Apple_Red_1.png"



function KillScreen(props: IKillScreenProps) {
    return <>
        <div className="ButtonWrapper" >
            <h2>Game Over</h2>
            <div className="Button" onClick={() => {
                props.setReset(false);
                props.setTrys(props.trys + 1);
            }}>
                <img src={AppleImg} className="MenuIcon" />REFLECT</div>
            <div className="Button" onClick={() => { window.location.reload() }}>
                <img src={SnakeImg} className="MenuIcon" />LEAVE</div>
        </div>

    </>
}
export default KillScreen