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
                <CustomPaper
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                >
                    <div>{wins + losses} Games</div>
                    <div>
                        {wins}W-{losses}L
                    </div>
                    <div>
                        Win Rate: {Math.round((wins / (wins + losses)) * 100)}%
                    </div>
                </CustomPaper>
                {v2.map((champion, index) => {
                    if (index < 3)
                        return (
                            <Stack
                                key={index}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <CustomPaper
                                    sx={{
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.5)",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Champion
                                            key={index}
                                            championName={champion.name}
                                            width="50px"
                                            height="50px"
                                        />
                                        <Stack>
                                            <div>
                                                {Math.round(
                                                    (champion.wins /
                                                        champion.gamesPlayed) *
                                                        100
                                                )}
                                                % {champion.wins}W-
                                                {champion.losses}L
                                            </div>
                                            <div>
                                                {champion.deaths > 0
                                                    ? (
                                                          (champion.kills +
                                                              champion.assists) /
                                                          champion.deaths
                                                      ).toFixed(2)
                                                    : "Perfect KDA"}{" "}
                                                KDA
                                            </div>
                                        </Stack>
                                    </Stack>
                                </CustomPaper>
                            </Stack>
                        );
                    else return null;
                })}
            </Stack>
        </CustomPaper>
    );
};
export default HistoryStats;
