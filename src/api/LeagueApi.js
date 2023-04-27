import axios from "axios";
const dev = false;
export const baseURL = dev
    ? "http://localhost:8080/api/v1"
    : "https://lolgg.herokuapp.com/api/v1";

export const assetsURL = dev
    ? "http://localhost:8080/images/"
    : "https://lolgg.herokuapp.com/images/";
export async function getMatchHistoryV1(puuid, start) {
    return await axios
        .post(baseURL + "/matches", {
            puuid: puuid,
            region: "EUW",
            start: start,
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response.data;
        });
}
export async function getMatchDetailsV1(matchId, region) {
    return await axios
        .post(baseURL + "/match", {
            matchId: matchId,
            region: region,
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response.data;
        });
}
export async function getUserV1(summonerName, region) {
    return await axios
        .post(baseURL + "/summoner", {
            summonerName: summonerName,
            region: region,
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response.data;
        });
}
export async function getLiveMatchV1(summonerId, region) {
    return await axios
        .post(baseURL + "/liveMatch", {
            summonerId: summonerId,
            region: region,
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response.data;
        });
}
export async function getSummonerLeagueV1(summonerId, region) {
    return await axios
        .post(baseURL + "/summoner/league", {
            summonerId: summonerId,
            region: region,
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response.data;
        });
}
export async function getMatchTimelineV1(matchId, region) {
    return await axios
        .post(baseURL + "/match/timeline", {
            matchId: matchId,
            region: region,
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response.data;
        });
}
// /mainChampion
export async function getMainChampion(summonerId, region) {
    return await axios
        .post(baseURL + "/mainChampion", {
            summonerId: summonerId,
            region: region,
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response.data;
        });
}
