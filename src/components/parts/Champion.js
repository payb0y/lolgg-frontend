import { assetsURL } from "../../api/LeagueApi";

const Champion = ({ championName, width, height, style }) => {
    if (championName === "FiddleSticks") championName = "Fiddlesticks";
    return (
        <img
            src={assetsURL + "champion/" + championName + ".png"}
            alt={championName}
            width={width}
            height={height}
            style={style ? style : { borderRadius: "50%" }}
            title={championName}
        />
    );
};
export default Champion;
