import { useState } from "react";
import MatchChampion from "../match/MatchChampion";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from "@mui/material";
import ProgressBar from "../UI/ProgressBar";
import Champion from "../parts/Champion";
import MatchGraphSelect from "./MatchGraphSelect";
import Stack from "@mui/material/Stack";

const MatchGraph = ({ participants, participantId }) => {
    const [graphData, setGraphData] = useState("totalDamageDealtToChampions");
    const getMax = (graphData) => {
        let max = 0;
        participants.forEach((participant) => {
            if (participant[graphData] > max) {
                max = participant[graphData];
            }
        });
        return max;
    };
    const createData = (summoner, data, teamId) => {
        return {
            summoner,
            data,
            teamId,
        };
    };
    const rows = (participant) => {
        return createData(
            <Champion
                championName={participant.championName}
                height={35}
                width={35}
            />,
            participant[graphData],
            participant.teamId
        );
    };
    const blueTeam = [];
    const redTeam = [];
    const allParticipants = [];
    participants.forEach((participant) => {
        if (participant.teamId === 100) {
            blueTeam.push(rows(participant));
        } else {
            redTeam.push(rows(participant));
        }
        allParticipants.push(rows(participant));
    });

    return (
        <Stack direction="row">
            <MatchGraphSelect
                setGraphData={setGraphData}
                graphData={graphData}
            />
            <TableContainer component={Paper}>
                <Table size="small" aria-label="simple table">
                    <TableBody>
                        {allParticipants.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    width={30}
                                    padding="normal"
                                    align="left"
                                >
                                    {row.summoner}
                                </TableCell>
                                <TableCell align="center">
                                    {row.data}
                                    <ProgressBar
                                        value={row.data}
                                        maxValue={getMax(graphData)}
                                        teamId={row.teamId}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};

export default MatchGraph;
