const SummonerIcon = ({ summoner, width, height }) => {
    return (
        <div className="summoner-icon">
            <img
                src={
                    "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/" +
                    summoner.profileIconId +
                    ".png"
                }
                //https://ddragon.leagueoflegends.com/cdn/{version}/img/profileicon/{profileIconId}.png
                alt="profile icon"
                width={width}
                height={height}
            />
            <span className="summoner-level">{summoner.summonerLevel}</span>
        </div>
    );
};
export default SummonerIcon;
