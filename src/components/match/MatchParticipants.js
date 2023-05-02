import { useContext } from "react";
import { SummonerContext } from "../../store/SummonerContext";
import { Stack } from "@mui/material";
import Champion from "../parts/Champion";
import SummonerName from "../parts/SummonerName";

const MatchParticipants = (props) => {
    const { summonerData } = useContext(SummonerContext);
    const participants = props.match.info.participants;
    const BlueTeam = participants.filter(
        (participant) => participant.teamId === 100
    );
    const RedTeam = participants.filter(
        (participant) => participant.teamId === 200
    );
    const div = (participant) => {
        const name = participant.summonerName;
        let name1 = participant.summonerName;
        if (participant.summonerName.length > 9) {
            name1 = name1.substring(0, 7) + "...";
        }
        return (
            <Stack
                spacing={0.5}
                direction="row"
                className="participant_info"
                width="90px"
                key={participant.summonerName}
            >
                <Champion
                    championName={participant.championName}
                    width={20}
                    height={20}
                    style={{ borderRadius: "10%" }}
                />
                <div
                    className={
                        participant.summonerName === summonerData.name
                            ? "sn summoner_name"
                            : "sn"
                    }
                    key={participant.summonerName}
                >
                    <SummonerName summonerName={name1} id={name} />
                </div>
            </Stack>
        );
    };
    return (
        <Stack direction="row" spacing={1} justifyContent="space-between">
            <div className="participant_ally">
                {BlueTeam.map((ally) => div(ally))}
            </div>
            <div className="participant_enemy">
                {RedTeam.map((enemy) => div(enemy))}
            </div>
        </Stack>
    );
};

export default MatchParticipants;
