import { Button } from "antd";
import { useContext, useState } from "react";
import { SummonerContext } from "../../store/SummonerContext";
import Card from "@mui/material/Card";
import { Stack } from "@mui/material";
import LiveMatch from "../liveMatch/LiveMatch";

const SummonerProfile = () => {
    const { summonerData } = useContext(SummonerContext);
    const [liveMatchVisible, setLiveMatchVisible] = useState(false);
    const HandleLive = () => {
        setLiveMatchVisible(true);
    };
    return (
        <>
            {liveMatchVisible && (
                <LiveMatch setLiveMatchVisible={setLiveMatchVisible} />
            )}
            <Card
                sx={{
                    width: 200,
                    height: 300,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Stack
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                    p={2}
                >
                    <h2>{summonerData.name}</h2>
                    <div className="summoner-icon">
                        <img
                            src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${summonerData.profileIconId}.png`}
                            alt="profile icon"
                            width={100}
                            height={100}
                        />
                        <span className="summoner-level">
                            {summonerData.summonerLevel}
                        </span>
                        <Button type="primary" onClick={HandleLive}>
                            Live Match
                        </Button>
                    </div>
                </Stack>
            </Card>
        </>
    );
};

export default SummonerProfile;
