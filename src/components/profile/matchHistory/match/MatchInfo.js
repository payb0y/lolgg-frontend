import { Stack } from "@mui/material";
import { getGameType, getGameDate } from "../../../utils/Utils";
import { useTheme } from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";

const MatchInfo = ({ match, currentParticipant }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { gameDuration, gameEndTimestamp, queueId } = match.info;

  const gameResult = currentParticipant.win ? "Victory" : "Defeat";
  const gameDate = getGameDate(gameEndTimestamp);
  const duration =
    parseInt(gameDuration / 60) + "m : " + (gameDuration % 60) + "s";
  const mode = getGameType(queueId);
  console.log(queueId);
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={0.5}
      sx={{
        width: isMobile ? "80px" : "115px",
        fontSize: isMobile ? "13px" : "14px",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{mode}</div>
      <div className="">{gameDate}</div>
      <div className="bar"></div>
      <div className="">{gameResult}</div>
      <div className="">{duration}</div>
    </Stack>
  );
};

export default MatchInfo;
