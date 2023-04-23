const MatchKills = (props) => {
    const { doubleKills, tripleKills, quadraKills, pentaKills } =
        props.participant;
    let text = "";
    if (pentaKills) {
        text = "Penta Kill";
    } else if (quadraKills) {
        text = "Quadra Kill";
    } else if (tripleKills) {
        text = "Triple Kill";
    } else if (doubleKills) {
        text = "Double Kill";
    }
    return <div className="kill-text">{text}</div>;
};
export default MatchKills;
