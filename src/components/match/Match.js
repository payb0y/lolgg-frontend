import React, { useContext, useState } from "react";
import { SummonerContext } from "../../store/SummonerContext";
import MatchInfo from "./MatchInfo";
import MatchKda from "./MatchKda";
import MatchChampion from "./MatchChampion";
import MatchItems from "./MatchItems";
import MatchParticipants from "./MatchParticipants";
import MatchKills from "./MatchKills";
import { Stack } from "@mui/material";
import MatchStats from "../matchStats/MatchStats";
import MatchSpells from "./MatchSpells";
import MatchRunes from "./MatchRunes";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MatchParticipantsV1 from "./MatchParticipantsV1";

const Match = (props) => {
    const { summonerData } = useContext(SummonerContext);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const match = props.value;
    const participantData = match.info.participants.find(
        (participant) => participant.summonerName === summonerData.name
    );
    const handleDetailsClick = () => {
        setIsDetailsOpen(!isDetailsOpen);
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <>
            <Stack
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                spacing={isMobile ? 1 : 4}
                sx={{
                    backgroundColor: participantData.win
                        ? "rgba(83, 131, 232, 0.7)"
                        : "rgba(232, 64, 87, 0.7)",
                    borderRadius: 1,
                    p: 1,
                    m: 1,
                }}
            >
                <MatchInfo match={match} />
                <Stack>
                    <Stack direction="row" spacing={2}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={1}
                        >
                            <MatchChampion
                                participant={participantData}
                                height={50}
                                width={50}
                            />
                            <MatchSpells
                                participant={participantData}
                                width={30}
                                height={30}
                            />
                            <MatchRunes
                                perks={participantData.perks}
                                width={30}
                                height={30}
                            />
                        </Stack>
                        <MatchKda participant={participantData} />
                        {/* <MatchMinions participant={participantData} /> */}
                    </Stack>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        direction={isMobile ? "column" : "row"}
                        spacing={2}
                    >
                        <MatchItems
                            participant={participantData}
                            width={30}
                            height={30}
                        />
                        <MatchKills participant={participantData} />
                    </Stack>
                </Stack>
                {isMobile ? null : (
                    <MatchParticipants
                        match={match}
                        summoner={participantData}
                    />
                )}
                {/* {isMobile ? null : (
                    <MatchParticipantsV1
                        participantData={participantData}
                        match={match}
                    />
                )} */}

                <div
                    onClick={handleDetailsClick}
                    className="expand-div"
                    title="Details"
                >
                    {isDetailsOpen ? (
                        <ArrowDropUpIcon />
                    ) : (
                        <ArrowDropDownIcon />
                    )}
                </div>
            </Stack>
            {isDetailsOpen && (
                <MatchStats match={match} summoner={participantData} />
            )}
        </>
    );
};

export default Match;
