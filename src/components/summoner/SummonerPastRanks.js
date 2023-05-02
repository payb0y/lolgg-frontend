import React, { useState, useEffect } from "react";
import { Chip, Tooltip, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { getPastRanks } from "../../api/LeagueApi";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: "#f5f5f9",
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 250,

        fontSize: theme.typography.pxToRem(13),
    },
}));
const SummonerPastRanks = () => {
    const { summonerName, region } = useParams();
    const [pastRanks, setPastRanks] = useState([]);
    useEffect(() => {
        const fetchPastRanks = async () => {
            const pastRanks = await getPastRanks(summonerName, region);
            setPastRanks(pastRanks.data);
        };
        fetchPastRanks();
    }, [summonerName, region]);
    const rankToolTip = (pastRankSolo, pastRankFlex) => {
        return (
            <>
                <Box>Solo Queue {pastRankSolo ? pastRankSolo : "Unranked"}</Box>
                <Box>Flex Queue {pastRankFlex ? pastRankFlex : "Unranked"}</Box>
            </>
        );
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "2.5px",
            }}
        >
            {pastRanks.map((pastRank) => (
                <HtmlTooltip
                    title={rankToolTip(pastRank.soloDuoRank, pastRank.flexRank)}
                    placement="top"
                    key={pastRank.season}
                >
                    <Chip
                        key={pastRank.season}
                        label={`S${pastRank.season} ${
                            pastRank.soloDuoRank
                                ? pastRank.soloDuoRank
                                : pastRank.flexRank
                        }`}
                        color="primary"
                        variant="outlined"
                        size="small"
                        sx={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            color: "rgba(255,255,255,0.8)",
                            borderColor: "rgba(255,255,255,0.8)",
                        }}
                    />
                </HtmlTooltip>
            ))}
        </div>
    );
};

export default SummonerPastRanks;
