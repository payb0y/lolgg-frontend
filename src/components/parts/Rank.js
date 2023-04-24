import { assetsURL } from "../../api/LeagueApi";
const Rank = ({ name, height }) => {
    return (
        <img
            src={assetsURL + "rank/" + name + ".webp"}
            alt="rank"
            height={height}
        />
    );
};

export default Rank;
