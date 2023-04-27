import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MatchOverview from "./MatchOverview";

import MatchBuild from "./matchBuild/MatchBuild";
import MatchTimeline from "./MatchTimeline";
import MatchGraph from "./MatchGraph";

const MatchStats = ({ match, summoner }) => {
    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box
            sx={{
                width: "100%",
                typography: "body1",
            }}
        >
            <TabContext value={value}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                    }}
                >
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Overview" value="1" />
                        <Tab label="Stats" value="2" />
                        <Tab label="Build" value="3" />
                    </TabList>
                </Box>
                <TabPanel sx={{ padding: "0" }} value="1">
                    <MatchOverview match={match} />
                </TabPanel>
                <TabPanel value="2">
                    {/* <MatchTimeline
                        match={match.info}
                        participantId={summoner.participantId}
                    /> */}
                    <MatchGraph
                        participants={match.info.participants}
                        participantId={summoner.participantId}
                    />
                </TabPanel>
                <TabPanel value="3">
                    <MatchBuild match={match.info} participant={summoner} />
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default MatchStats;
