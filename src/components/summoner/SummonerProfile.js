import { useContext, useState } from "react";
import { SummonerContext } from "../../store/SummonerContext";
import { Card, Stack, Button } from "@mui/material";
import LiveMatch from "../liveMatch/LiveMatch";
import { baseURL } from "../../api/LeagueApi";
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
                            src={
                                baseURL +
                                "/assets/profileIcon?icon=" +
                                summonerData.profileIconId
                            }
                            alt="profile icon"
                            width={100}
                            height={100}
                        />
                        <span className="summoner-level">
                            {summonerData.summonerLevel}
                        </span>
                        <Button variant="contained" onClick={HandleLive}>
                            Live Match
                        </Button>
                    </div>
                </Stack>
            </Card>
        </>
    );
};

export default SummonerProfile;
