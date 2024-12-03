import { Stack, Box, LinearProgress } from "@mui/material";
import MatchHistory from "./matchHistory/MatchHistory";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SummonerBanner from "./profileBanner/SummonerBanner";
import SummonerNotFound from "../errorPages/SummonerNotFound";
import { getSummonerV2 } from "../../api/LeagueApi";
import { profileActions } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { summonerName, region } = useParams();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [extractedName, setExtractedName] = useState("");
  const [extractedTagline, setExtractedTagline] = useState("");
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    setNotFound(false);
    setLoading(true);
    dispatch(profileActions.emptySummonerData());
    const fetchSummonerData = async () => {
      try {
        console.log(summonerName, region);

        // Split summonerName into name and tagline at the last hyphen
        const lastHyphenIndex = summonerName.lastIndexOf("-");
        const name = summonerName.substring(0, lastHyphenIndex);
        const tagline = summonerName.substring(lastHyphenIndex + 1);

        // Save extracted name and tagline for SummonerNotFound
        setExtractedName(name);
        setExtractedTagline(tagline);

        console.log("Name:", name, "Tagline:", tagline);

        const summonerResponseV1 = await getSummonerV2(name, tagline, region);

        if (summonerResponseV1.status === 200 && summonerResponseV1) {
          dispatch(profileActions.setSummonerData(summonerResponseV1.data));
          dispatch(profileActions.setRegion(region));
          setLoading(false);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        }
        setLoading(false);
      }
    };
    fetchSummonerData();
  }, [summonerName, region, dispatch]);

  useEffect(() => {
    if (profile.summonerData) {
      document.title = `LOLGG | ${profile.summonerData.gameName}`;
    }
  }, [profile.summonerData]);

  return (
    <>
      {notFound ? (
        <SummonerNotFound name={extractedName} tagLine={extractedTagline} />
      ) : (
        <>
          {profile.summonerData ? (
            <Box
              sx={{
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
              width={{
                xs: "100%",
                sm: "800px",
                md: "100%",
                lg: "1150px",
              }}
            >
              <SummonerBanner
                summonerData={profile.summonerData}
                region={profile.region}
              />
              <Stack
                spacing={3}
                direction={{
                  xs: "column",
                  sm: "column",
                  md: "column",
                  lg: "row",
                }}
                justifyContent={{
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "flex-start",
                }}
                alignItems={{
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "flex-start",
                }}
                width={"100%"}
              >
                <MatchHistory
                  summonerData={profile.summonerData}
                  region={profile.region}
                />
              </Stack>
            </Box>
          ) : (
            loading && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress color="inherit" />
              </Box>
            )
          )}
        </>
      )}
    </>
  );
};

export default Profile;
