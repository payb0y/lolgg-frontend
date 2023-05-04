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
import { Typography, Divider } from "@mui/material";
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
            <Champion championName={champion.name} height={30} width={30} />,
            champion.name,
            <WinLoseBar wins={champion.wins} losses={champion.losses} />,
            champion.deaths
                ? Math.round(
                      ((champion.kills + champion.assists) / champion.deaths) *
                          100
                  ) / 100
                : "Perfect KDA",
            champion.gamesPlayed,
            Math.round((champion.wins / champion.gamesPlayed) * 100) + "%",
            champion.kills,
            champion.deaths,
            champion.assists
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
                    <Table size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell sx={{ width: "15px" }} align="left">
                                    KDA
                                </TableCell>
                                <TableCell align="left">W/L</TableCell>
                                <TableCell align="left">Winrate</TableCell>
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
                                    <TableCell sx={{ padding: "0px" }}>
                                        {row.icon}
                                    </TableCell>
                                    <TableCell>{row.kda}</TableCell>

                                    <TableCell align="left">
                                        {row.wins}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.winRate}
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
