import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SummonerContext } from "../../store/SummonerContext";

const SummonerName = ({ summonerName, id }) => {
    const navigate = useNavigate();
    const { region } = useContext(SummonerContext);
    const nameClickHandler = (e) => {
        navigate(`/profile/${region}/${id ? e.target.id : summonerName}`);
    };
    return (
        <span
            onClick={nameClickHandler}
            id={id ? id : summonerName}
            title={summonerName}
            style={{ cursor: "pointer" }}
        >
            {summonerName}
        </span>
    );
};
export default SummonerName;
