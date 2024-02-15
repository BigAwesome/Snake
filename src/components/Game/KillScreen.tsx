import IKillScreenProps from "../../interfaces/IKillScreen";

function KillScreen(props: IKillScreenProps) {
    return <>
        Game Over
        <button onClick={() => {
            props.setReset(false);
            props.setTrys(props.trys + 1);
        }}>Restart</button>
    </>
}
export default KillScreen