import CustomPaper from "../UI/CustomPaper";
import Stack from "@mui/material/Stack";
import Champion from "../parts/Champion";
const HistoryStats = ({ matchHistory, summonerData }) => {
    let wins = 0;
    let losses = 0;
    let champions = [];
    matchHistory.forEach((match) => {
        match.info.participants.forEach((participant) => {
            if (participant.summonerId === summonerData.id) {
                if (
                    !champions.find(
                        (champion) => champion.name === participant.championName
                    )
                ) {
                    champions.push({
                        name: participant.championName,
                        wins: participant.win ? 1 : 0,
                        losses: !participant.win ? 1 : 0,
                        kills: participant.kills,
                        deaths: participant.deaths,
                        assists: participant.assists,
                        winRate: participant.win ? 100 : 0,
                        gamesPlayed: 1,
                    });
                } else {
                    champions = champions.map((champion) =>
                        champion.name === participant.championName
                            ? {
                                  ...champion,
                                  wins: champion.wins + participant.win,
                                  losses: champion.losses + !participant.win,
                                  kills: champion.kills + participant.kills,
                                  deaths: champion.deaths + participant.deaths,
                                  assists:
                                      champion.assists + participant.assists,

                                  winRate: Math.round(
                                      ((champion.wins + participant.win) /
                                          (champion.wins +
                                              participant.win +
                                              champion.losses +
                                              !participant.win)) *
                                          100
                                  ),
                                  gamesPlayed: champion.gamesPlayed + 1,
                              }
                            : champion
                    );
                }
                if (participant.win) {
                    wins++;
                } else {
                    losses++;
                }
            }
        });
    });
    const v1 = champions
        .sort((a, b) => b.wins + b.losses - (a.wins + a.losses))
        .slice(0, 3);
    const v2 = v1.sort((a, b) => b.winRate - a.winRate);
    return (
        <CustomPaper>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <div>
                    <div>{wins + losses} Games</div>
                    <div>Wins: {wins}</div>
                    <div>Losses: {losses}</div>
                    <div>
                        Win Rate: {Math.round((wins / (wins + losses)) * 100)}%
                    </div>
                </div>
                {v2.map((champion, index) => {
                    if (index < 3)
                        return (
                            <Stack
                                key={index}
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Champion
                                    key={index}
                                    championName={champion.name}
                                    width="50px"
                                    height="50px"
                                />
                                <div>Wins: {champion.wins}</div>
                                <div>Losses: {champion.losses}</div>
                                <div>
                                    {" "}
                                    kda {champion.kills}/{champion.deaths}/
                                    {champion.assists}
                                </div>
                                <div>Win Rate: {champion.winRate}%</div>
                            </Stack>
                        );
                    else return null;
                })}
            </Stack>
        </CustomPaper>
    );
};
export default HistoryStats;
