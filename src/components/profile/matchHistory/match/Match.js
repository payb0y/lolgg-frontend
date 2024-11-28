import React, { useState } from "react";
import MatchInfo from "./MatchInfo";
import MatchKda from "./MatchKda";
import MatchChampion from "./MatchChampion";
import MatchItems from "./MatchItems";
import MatchParticipants from "./MatchParticipants";
import MatchKills from "./MatchKills";
import { Stack } from "@mui/material";
import MatchStats from "./matchStats/MatchStats";
import MatchSpells from "./MatchSpells";
import MatchRunes from "./MatchRunes";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomPaper from "../../../UI/CustomPaper";

const Match = ({ match, currentParticipant }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const handleDetailsClick = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  console.log(match);
  return (
    <>
      {!match.info.gameMode.includes("TUTORIAL") && currentParticipant && (
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          spacing={isMobile ? 1 : 4}
          sx={{
            backgroundColor: currentParticipant.win
              ? "rgba(83, 131, 232, 0.8)"
              : "rgba(232, 64, 87, 0.8)",
            borderRadius: 1,
            p: 1,
          }}
        >
          <MatchInfo match={match} currentParticipant={currentParticipant} />
          <Stack>
            <Stack direction="row" spacing={2}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
              >
                <MatchChampion
                  currentParticipant={currentParticipant}
                  height={50}
                  width={50}
                />
                <MatchSpells
                  currentParticipant={currentParticipant}
                  width={30}
                  height={30}
                />
                <MatchRunes
                  perks={currentParticipant.perks}
                  width={30}
                  height={30}
                />
              </Stack>
              <MatchKda currentParticipant={currentParticipant} />
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="center"
              direction={isMobile ? "column" : "row"}
              spacing={2}
            >
              <MatchItems
                currentParticipant={currentParticipant}
                width={30}
                height={30}
              />
              <MatchKills currentParticipant={currentParticipant} />
            </Stack>
          </Stack>
          {isMobile ? null : (
            <MatchParticipants
              match={match}
              currentParticipant={currentParticipant}
            />
          )}
          <div
            onClick={handleDetailsClick}
            className="expand-div"
            title="Details"
          >
            {isDetailsOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </div>
        </Stack>
      )}
      {isDetailsOpen && (
        <CustomPaper>
          <MatchStats match={match} currentParticipant={currentParticipant} />
        </CustomPaper>
      )}
    </>
  );
};

export default Match;
