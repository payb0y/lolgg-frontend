import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MatchChampion from "../../MatchChampion";
import MatchItems from "../../MatchItems";
import MatchSpells from "../../MatchSpells";
import MatchRunes from "../../MatchRunes";
import MatchKda from "../../MatchKda";
import LiveMatchRanks from "../../../../liveMatch/LiveMatchRanks";
import ProgressBar from "../../../../../UI/ProgressBar";
import SummonerName from "../../../../../parts/SummonerName";

const MatchOverview = ({ match }) => {
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
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={0}
        height={"100%"}
      >
        <SummonerName
          summonerName={participant.riotIdGameName}
          tagLine={participant.riotIdTagline}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={0.5}
        >
          <MatchChampion
            currentParticipant={participant}
            height={35}
            width={35}
          />
          <MatchSpells
            currentParticipant={participant}
            width={20}
            height={20}
          />
          <MatchRunes perks={participant.perks} width={20} height={20} />
        </Stack>
      </Stack>,
      <MatchKda currentParticipant={participant} />,
      <MatchItems currentParticipant={participant} width={25} height={25} />,
      participant.totalMinionsKilled + participant.neutralMinionsKilled,
      participant.totalDamageDealtToChampions,
      participant.totalDamageTaken,
      <LiveMatchRanks participant={participant} />
    );
  };
  const redTeamWin = match.info.teams[1].win ? "Victory" : "Defeat";
  const blueTeamWin = match.info.teams[0].win ? "Victory" : "Defeat";
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
      <TableContainer
        component={Paper}
        sx={{
          overflow: "hidden",
        }}
      >
        <Table
          size="small"
          sx={{
            minWidth: isMobile ? "" : 500,
            "& .MuiTableCell-root": {
              padding: "0px",
            },
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">{team}</TableCell>
              <TableCell align="center">KDA</TableCell>
              <TableCell align="center">Items</TableCell>
              {!isMobile ? <TableCell align="center">Damage</TableCell> : null}
              {!isMobile ? <TableCell align="center">Rank</TableCell> : null}
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
                <TableCell height={"70px"} align="left">
                  {row.summoner}
                </TableCell>
                <TableCell align="center">{row.kda}</TableCell>
                <TableCell align="center">{row.items}</TableCell>
                {!isMobile ? (
                  <TableCell align="center">
                    {row.damageDealt}
                    <ProgressBar
                      value={row.damageDealt}
                      maxValue={maxDamage}
                      height={10}
                    />
                  </TableCell>
                ) : null}
                {!isMobile ? (
                  <TableCell width={"150px"} align="right">
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
      {redRows && statTable(redRows, `${redTeamWin} (Red Team)`)}
      {blueRows && statTable(blueRows, `${blueTeamWin} (Blue Team)`)}
    </Stack>
  );
};

export default MatchOverview;
