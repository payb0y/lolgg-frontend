import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const SummonerName = ({ summonerName, tagLine, id, color, blank }) => {
  const navigate = useNavigate();
  const { region } = useParams();

  const nameClickHandler = (e) => {
    if (blank) {
      //open in new tab but
      window.open(
        `https://lolgg.tech/#/profile/${region}/${summonerName}-${tagLine}`
      );
    } else {
      navigate(
        `/profile/${region}/${id ? e.target.id : summonerName}-${tagLine}`
      );
    }
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
