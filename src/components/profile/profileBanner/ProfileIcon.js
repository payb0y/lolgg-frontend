import React from "react";
import SummonerIcon from "../../parts/SummonerIcon";
const ProfileIcon = ({ summoner, width, height }) => {
    return (
        <div className="summoner-icon">
            <SummonerIcon
                icon={summoner.profileIconId}
                width={width}
                height={height}
            />
            <span className="summoner-level">{summoner.summonerLevel}</span>
        </div>
    );
};
export default ProfileIcon;
