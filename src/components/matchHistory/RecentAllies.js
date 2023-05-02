import SummonerName from "../parts/SummonerName";
import CustomPaper from "../UI/CustomPaper";
import WinLoseBar from "../UI/WinLoseBar";
import { Card, Typography, Divider } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { getUserV1 } from "../../api/LeagueApi";

const RecentAllies = ({ matchHistory, summonerData }) => {
    let allies = [];
    matchHistory.forEach((match) => {
        const me = match.info.participants.filter(
            (participant) => participant.summonerId === summonerData.id
        );
        const f = match.info.participants.filter(
            (participant) =>
                participant.teamId === me[0].teamId &&
                participant.summonerId !== summonerData.id
        );
        f.forEach((a) => {
            if (
                !allies.find(
                    (ally) => ally.name === a.summonerName.toLowerCase()
                )
            ) {
                allies.push({
                    name: a.summonerName.toLowerCase(),
                    wins: a.win ? 1 : 0,
                    gamesPlayed: 1,
                    id: a.summonerId,
                    icon: null,
                });
            } else {
                allies = allies.map((ally) =>
                    ally.name === a.summonerName.toLowerCase()
                        ? {
                              ...ally,
                              wins: a.win + ally.wins,
                              gamesPlayed: ally.gamesPlayed + 1,
                          }
                        : ally
                );
            }
        });
    });
    const sortedAllies = allies.sort((a, b) => b.gamesPlayed - a.gamesPlayed);
    //filter out the summoner with less than 2 games
    const filteredAlliesv1 = sortedAllies.filter(
        (ally) => ally.gamesPlayed > 1
    );
    //get only the top 10
    const filteredAllies = filteredAlliesv1.slice(0, 10);
    //get icon from each ally
    const createData = (name, wins, winrate) => {
        return { name, wins, winrate };
    };
    const rows = filteredAllies.map((ally) =>
        createData(
            <SummonerName summonerName={ally.name} />,
            <WinLoseBar
                wins={ally.wins}
                losses={ally.gamesPlayed - ally.wins}
            />,
            Math.round((ally.wins / ally.gamesPlayed) * 100) + "%"
        )
    );
    // const getIcons = async () => {
    //     const icons = await Promise.all(
    //         filteredAllies.map(async (ally) => {
    //             const summoner = await getUserV1(
    //                 ally.name,
    //                 summonerData.region
    //             );
    //             return summoner.profileIconId;
    //         })
    //     );
    //     filteredAllies.forEach((ally, index) => {
    //         ally.icon = icons[index];
    //     });
    // };
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
                                <TableCell>Name</TableCell>
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
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.wins}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.winrate}
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
