import { useState, useEffect } from "react";
const SummonerIcon = ({ icon, width, height }) => {
    //get latest version from https://ddragon.leagueoflegends.com/api/versions.json
    const [version, setVersion] = useState("13.9.1");
    useEffect(() => {
        const fetchVersion = async () => {
            const version = await fetch(
                "https://ddragon.leagueoflegends.com/api/versions.json"
            )
                .then((response) => response.json())
                .then((data) => data[0]);
            setVersion(version);
        };
        fetchVersion();
    }, []);
    return (
        <img
            src={
                `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/` +
                icon +
                ".png"
            }
            alt="profile icon"
            width={width}
            height={height}
            style={{
                borderRadius: "50%",
            }}
        />
    );
};
export default SummonerIcon;
