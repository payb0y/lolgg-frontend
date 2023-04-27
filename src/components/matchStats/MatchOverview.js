import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Stack,
} from "@mui/material";
import MatchChampion from "../match/MatchChampion";
import MatchItems from "../match/MatchItems";
import MatchSpells from "../match/MatchSpells";
import MatchRunes from "../match/MatchRunes";
import MatchKda from "../match/MatchKda";
import LiveMatchRanks from "../liveMatch/LiveMatchRanks";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

import ProgressBar from "../UI/ProgressBar";

const MatchOverview = ({ match }) => {
    const navigate = useNavigate();
    const summonerClickHandler = (value) => {
        navigate(`/profile/${value.target.innerText}`);
    };
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const createData = (
        summoner,
        kda,
        items,
        cs,
        damageDealt,
        damageTaken,
        rank
    ) => {
        return {
            summoner,
            kda,
            items,
            cs,
            damageDealt,
            damageTaken,
            rank,
        };
    };
    let maxDamage = 0;
    const redRows = [];
    const blueRows = [];
    const rows = (participant) => {
        return createData(
            <Stack alignItems="center" justifyContent="center" spacing={0}>
                <span
                    onClick={summonerClickHandler}
                    style={{
                        cursor: "pointer",
                    }}
                >
                    {participant.summonerName}
                </span>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={0.5}
                >
                    <MatchChampion
                        participant={participant}
                        height={35}
                        width={35}
                    />
                    <MatchSpells
                        participant={participant}
                        width={20}
                        height={20}
                    />
                    <MatchRunes
                        perks={participant.perks}
                        width={20}
                        height={20}
                    />
                </Stack>
            </Stack>,
            <MatchKda participant={participant} />,
            <MatchItems participant={participant} width={25} height={25} />,
            participant.totalMinionsKilled + participant.neutralMinionsKilled,
            participant.totalDamageDealtToChampions,
            participant.totalDamageTaken,
            <LiveMatchRanks participant={participant} />
        );
    };
    match.info.participants.forEach((participant) => {
        if (participant.totalDamageDealtToChampions > maxDamage) {
            maxDamage = participant.totalDamageDealtToChampions;
        }
        if (participant.teamId === 100) {
            blueRows.push(rows(participant));
        } else {
            redRows.push(rows(participant));
        }
    });

    const statTable = (tRow, team) => {
        return (
            <TableContainer component={Paper}>
                <Table
                    size="small"
                    sx={{ minWidth: isMobile ? "" : 500 }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">{team}</TableCell>
                            <TableCell align="center">KDA</TableCell>
                            <TableCell align="center">Items</TableCell>
                            {!isMobile ? (
                                <TableCell align="center">CS</TableCell>
                            ) : null}
                            {!isMobile ? (
                                <TableCell align="center">Damage</TableCell>
                            ) : null}
                            {!isMobile ? (
                                <TableCell align="center">Rank</TableCell>
                            ) : null}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tRow.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell padding="none" align="left">
                                    {row.summoner}
                                </TableCell>
                                <TableCell padding="none" align="center">
                                    {row.kda}
                                </TableCell>
                                <TableCell padding="none" align="center">
                                    {row.items}
                                </TableCell>
                                {!isMobile ? (
                                    <TableCell align="center">
                                        {row.cs}
                                    </TableCell>
                                ) : null}
                                {!isMobile ? (
                                    <TableCell align="center">
                                        {row.damageDealt}
                                        <ProgressBar
                                            value={row.damageDealt}
                                            maxValue={maxDamage}
                                        />
                                    </TableCell>
                                ) : null}
                                {!isMobile ? (
                                    <TableCell align="center">
                                        {row.rank}
                                    </TableCell>
                                ) : null}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };
    return (
        <Stack spacing={1}>
            {redRows && statTable(redRows, "Red Team")}
            {blueRows && statTable(blueRows, "Blue Team")}
        </Stack>
    );
};

export default MatchOverview;
