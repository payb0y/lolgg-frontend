import { assetsURL } from "../../api/LeagueApi";
import Champion from "../parts/Champion";
import { useNavigate } from "react-router-dom";
const MatchParticipantsV1 = ({ match, participantData }) => {
    const navigate = useNavigate();
    const { participants, mapId, gameMode } = match.info;
    const participantsData = [];
    const positions = {
        100: {
            UTILITY: { row: 6, col: 4 },
            BOTTOM: { row: 6, col: 5 },
            MIDDLE: { row: 4, col: 3 },
            TOP: { row: 2, col: 1 },
            JUNGLE: { row: 5, col: 4 },
        },
        200: {
            UTILITY: { row: 4, col: 6 },
            BOTTOM: { row: 5, col: 6 },
            MIDDLE: { row: 3, col: 4 },
            TOP: { row: 1, col: 2 },
            JUNGLE: { row: 2, col: 3 },
        },
    };
    const positions_ARAM = {
        100: {
            1: { row: 6, col: 1 },
            2: { row: 6, col: 2 },
            3: { row: 5, col: 1 },
            4: { row: 5, col: 2 },
            5: { row: 4, col: 3 },
        },
        200: {
            1: { row: 1, col: 6 },
            2: { row: 2, col: 6 },
            3: { row: 1, col: 5 },
            4: { row: 2, col: 5 },
            5: { row: 3, col: 4 },
        },
    };

    participants.forEach((participant) => {
        const { championName, individualPosition, lane, teamId, summonerName } =
            participant;
        const laneFix =
            lane === "BOTTOM"
                ? individualPosition
                : lane === "NONE"
                ? individualPosition
                : lane;
        participantsData.push({
            championName,
            individualPosition: laneFix,
            teamId,
            summonerName,
        });
    });

    console.log(match);
    console.log(participantsData);
    const championDisplay = (positions) => {
        return participantsData.map((participant, index) => {
            return (
                <Champion
                    championName={participant.championName}
                    summonerName={participant.summonerName}
                    width={22}
                    onClick={() =>
                        navigate(`/profile/${participant.summonerName}`)
                    }
                    height={22}
                    style={{
                        cursor: "pointer",
                        borderRadius: "50%",
                        border: `1.7px solid ${
                            participant.summonerName ===
                            participantData.summonerName
                                ? "rgba(255, 215, 0,0.7)"
                                : participant.teamId === 100
                                ? "rgba(0,0,255,0.7)"
                                : "rgba(255,0,0,0.7)"
                        }`,
                        gridColumn:
                            gameMode === "ARAM"
                                ? positions_ARAM[participant.teamId][
                                      index + 1 > 5 ? index + 1 - 5 : index + 1
                                  ].col
                                : positions[participant.teamId][
                                      participant.individualPosition
                                  ].col,
                        gridRow:
                            gameMode === "ARAM"
                                ? positions_ARAM[participant.teamId][
                                      index + 1 > 5 ? index + 1 - 5 : index + 1
                                  ].row
                                : positions[participant.teamId][
                                      participant.individualPosition
                                  ].row,
                    }}
                    key={index}
                />
            );
        });
    };
    return (
        <>
            {participantsData && (
                <div
                    style={{
                        backgroundImage: `url(${assetsURL}map/map${mapId}.png)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "130px",
                        height: "130px",
                        borderRadius: "10%",
                        display: "grid",
                        gridTemplateColumns: "repeat(6, 1fr)",
                        gridTemplateRows: "repeat(6, 1fr)",
                    }}
                >
                    {championDisplay(positions)}
                </div>
            )}
        </>
    );
};

export default MatchParticipantsV1;
