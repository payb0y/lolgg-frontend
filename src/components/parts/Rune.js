import { assetsURL } from "../../api/LeagueApi";

const Rune = ({ rune, width, height }) => {
    return (
        <img
            src={assetsURL + rune.icon}
            alt={rune.name}
            width={width}
            height={height}
            title={rune.name}
            style={{
                backgroundColor: "black",
                borderRadius: "50%",
            }}
        />
    );
};
export default Rune;
