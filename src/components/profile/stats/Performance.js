import React from "react";
import Champion from "../../parts/Champion";
import CustomPaper from "../../UI/CustomPaper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Divider, Stack } from "@mui/material";
import WinLoseBar from "../../UI/WinLoseBar";
import Card from "@mui/material/Card";
import { getPerformance } from "../../utils/Utils";
const Perfomance = ({ matchHistory, summonerData }) => {
    const v1 = getPerformance(matchHistory, summonerData);
    const createData = (
        icon,
        name,
        wins,
        kda,
        gamesPlayed,
        winRate,
        kills,
        deaths,
        assists
    ) => {
        return {
            icon,
            name,
            wins,
            kda,
            gamesPlayed,
            winRate,
            kills,
            deaths,
            assists,
        };
    };
    const rows = v1.map((champion) =>
        createData(
            <Stack>
                <Champion championName={champion.name} height={30} width={30} />
                <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {(champion.cs / champion.gamesPlayed).toFixed(1)} CS
                </Typography>
            </Stack>,
            champion.name,
            <Stack direction="row" alignItems="center" spacing={0.5}>
                <WinLoseBar wins={champion.wins} losses={champion.losses} />
                <span>
                    {Math.round((champion.wins / champion.gamesPlayed) * 100) +
                        "%"}
                </span>
            </Stack>,
            <Stack alignItems="center" spacing={0.1}>
                <Typography color="text.primary">
                    {champion.deaths
                        ? Math.round(
                              ((champion.kills + champion.assists) /
                                  champion.deaths) *
                                  100
                          ) / 100
                        : "Perfect"}{" "}
                    KDA
                </Typography>
                <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {(champion.kills / champion.gamesPlayed).toFixed(1)} /{" "}
                    {(champion.deaths / champion.gamesPlayed).toFixed(1)} /{" "}
                    {(champion.assists / champion.gamesPlayed).toFixed(1)}
                </Typography>
            </Stack>,
            champion.gamesPlayed,
            champion.kills / champion.gamesPlayed,
            champion.deaths / champion.gamesPlayed,
            champion.assists / champion.gamesPlayed
        )
    );
    return (
        <CustomPaper>
            <Card>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    Performance (Recent {matchHistory.length} Games)
                </Typography>
                <Divider />
                <TableContainer component={Paper}>
                    <Table
                        size="small"
                        aria-label="simple table"
                        sx={{
                            "& td": {
                                padding: "1px 8px",
                            },
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="center">KDA</TableCell>
                                <TableCell align="left">W/L</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>{row.icon}</TableCell>
                                    <TableCell>{row.kda}</TableCell>

                                    <TableCell align="left">
                                        {row.wins}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </CustomPaper>
    );
};
export default Perfomance;
