import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const SummonerName = ({ summonerName, id, color }) => {
    const navigate = useNavigate();
    const { region } = useParams();

    const nameClickHandler = (e) => {
        navigate(`/profile/${region}/${id ? e.target.id : summonerName}`);
    };
    return (
        <span
            onClick={nameClickHandler}
            id={id ? id : summonerName}
            title={id ? id : summonerName}
            style={{ cursor: "pointer", color: color ? color : "" }}
        >
            {summonerName}
        </span>
    );
};
export default SummonerName;
