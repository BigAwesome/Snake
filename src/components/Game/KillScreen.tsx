import IKillScreenProps from "../../interfaces/IKillScreen";

function KillScreen(props: IKillScreenProps) {
    return <>
        Game Over
        <div onClick={() => {
            props.setReset(false);
            props.setTrys(props.trys + 1);
        }}>REFLECT</div>
        <div onClick={() => { }}>LEAVE</div>
    </>
}
export default KillScreen