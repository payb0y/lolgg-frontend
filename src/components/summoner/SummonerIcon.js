import { baseURL } from "../../api/LeagueApi";

const SummonerIcon = ({ summoner, width, height }) => {
    return (
        <div className="summoner-icon">
            <img
                src={
                    baseURL +
                    "/assets/profileIcon?icon=" +
                    summoner.profileIconId
                }
                alt="profile icon"
                width={width}
                height={height}
            />
            <span className="summoner-level">{summoner.summonerLevel}</span>
        </div>
    );
};
export default SummonerIcon;
