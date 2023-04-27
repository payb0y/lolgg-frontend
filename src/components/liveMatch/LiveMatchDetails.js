import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { getGameType } from "../utils/Utils";
import LiveMatchChampion from "./LiveMatchChampion";
import LiveMatchRanks from "./LiveMatchRanks";
import Box from "@mui/material/Box";
import LiveMatchBanned from "./LiveMatchBanned";
import CustomPaper from "../UI/CustomPaper";

const LiveMatchDetails = ({ liveMatch }) => {
    const [time, setTime] = useState(
        `${Math.floor((Date.now() - liveMatch.gameStartTime) / 60000)}:${
            Math.floor((Date.now() - liveMatch.gameStartTime) / 1000) % 60
        }`
    );
    useEffect(() => {
        const interval = setInterval(() => {
            // Split the time string into minutes and seconds
            const [minutes, seconds] = time
                .split(":")
                .map((str) => parseInt(str));

            // Increment the seconds
            let newSeconds = seconds + 1;
            let newMinutes = minutes;

            // If the seconds reach 60, reset to 0 and increment the minutes
            if (newSeconds === 60) {
                newMinutes += 1;
                newSeconds = 0;
            }

            // Format the new time string with leading zeros
            const newTime = `${newMinutes
                .toString()
                .padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`;

            setTime(newTime);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);
    const gameType = getGameType(liveMatch.gameQueueConfigId);
    let blueParticipants = [];
    liveMatch.participants.forEach((participant) => {
        if (participant.teamId === 100) {
            blueParticipants.push(participant);
        }
    });
    let redParticipants = [];
    liveMatch.participants.forEach((participant) => {
        if (participant.teamId === 200) {
            redParticipants.push(participant);
        }
    });

    return (
        <Box>
            <Stack spacing={2}>
                <Stack spacing={2} direction="row" justifyContent="center">
                    <CustomPaper>{gameType}</CustomPaper>
                    <CustomPaper>{time}</CustomPaper>
                </Stack>
                <LiveMatchBanned match={liveMatch} />
                <Stack spacing={10} direction="row">
                    {blueParticipants && (
                        <Stack spacing={1}>
                            {blueParticipants.map((participant) => (
                                <Stack direction="row" spacing={1}>
                                    <CustomPaper
                                        sx={{
                                            width: "150px",
                                            backgroundColor: `${
                                                participant.teamId === 200
                                                    ? "rgba(83, 131, 232, 0.7)"
                                                    : "rgba(232, 64, 87, 0.7)"
                                            }`,
                                        }}
                                    >
                                        {participant.summonerName}
                                        <LiveMatchChampion
                                            participant={participant}
                                        />
                                    </CustomPaper>
                                    <LiveMatchRanks participant={participant} />
                                </Stack>
                            ))}
                        </Stack>
                    )}
                    {redParticipants && (
                        <Stack spacing={1}>
                            {redParticipants.map((participant) => (
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="flex-end"
                                >
                                    <LiveMatchRanks participant={participant} />
                                    <CustomPaper
                                        sx={{
                                            width: "150px",
                                            backgroundColor: `${
                                                participant.teamId === 200
                                                    ? "rgba(83, 131, 232, 0.7)"
                                                    : "rgba(232, 64, 87, 0.7)"
                                            }`,
                                        }}
                                    >
                                        {participant.summonerName}
                                        <LiveMatchChampion
                                            participant={participant}
                                        />
                                    </CustomPaper>
                                </Stack>
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};

export default LiveMatchDetails;
