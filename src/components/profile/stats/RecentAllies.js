import SummonerName from "../../parts/SummonerName";
import CustomPaper from "../../UI/CustomPaper";
import WinLoseBar from "../../UI/WinLoseBar";
import { Card, Typography, Divider, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getRecentlyPlayedWith } from "../../utils/Utils";
import SummonerIcon from "../../parts/SummonerIcon";
// import { getUserV1 } from "../../api/LeagueApi";

const RecentAllies = ({ matchHistory, summonerData }) => {
    const [allies, setAllies] = useState([]);
    const createData = (name, wins, winrate) => {
        return { name, wins, winrate };
    };
    let rows = [];
    useEffect(() => {
        const getAllies = async () => {
            const filteredAllies = await getRecentlyPlayedWith(
                matchHistory,
                summonerData
            );
            setAllies(filteredAllies);
        };

        getAllies();
    }, [matchHistory, summonerData]);
    if (allies.length > 0) {
        rows = allies.map((ally) =>
            createData(
                <Stack direction="row" alignItems="center" spacing={1}>
                    <SummonerIcon icon={ally.icon} width={30} height={30} />
                    <SummonerName summonerName={ally.name} />
                </Stack>,
                <Stack direction="row" alignItems="center" spacing={2}>
                    <WinLoseBar
                        wins={ally.wins}
                        losses={ally.gamesPlayed - ally.wins}
                    />
                    <span>
                        {Math.round((ally.wins / ally.gamesPlayed) * 100) + "%"}
                    </span>
                </Stack>
            )
        );
    }
    return (
        <CustomPaper>
            <Card>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    Recently played with (Recent {matchHistory.length} Games)
                </Typography>
                <Divider />
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">W/L</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows &&
                                rows.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell
                                            sx={{ padding: "0px" }}
                                            align="right"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">
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
export default RecentAllies;
