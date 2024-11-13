import axios from "axios";
const retryDelay = 5000;
const dev = false;
export const baseURL = dev
  ? "http://localhost:8080/api/v1"
  : "https://lolgg.herokuapp.com/api/v1";

export const assetsURL = dev
  ? "http://localhost:8080/images/"
  : "https://lolgg.herokuapp.com/images/";
export async function getMatchHistoryV1(puuid, start, region, queue) {
  while (true) {
    try {
      const response = await axios.post(baseURL + "/matches", {
        puuid: puuid,
        region: region,
        start: start,
        queue: queue === 0 ? "" : queue,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      if (error.response && error.response.status !== 200) {
        console.log(`Error: ${error}. Retrying...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        return error.response.data;
      }
    }
  }
}
export async function getMatchDetailsV1(matchId, region) {
  while (true) {
    try {
      const response = await axios.post(baseURL + "/match", {
        matchId: matchId,
        region: region,
      });

      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      if (error.response && error.response.status !== 200) {
        console.log(`Error: ${error}. Retrying...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        return error.response.data;
      }
    }
  }
}
export async function getUserV1(summonerName, region) {
  while (true) {
    try {
      const response = await axios.post(baseURL + "/summoner", {
        summonerName: summonerName,
        region: region,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status !== 200 &&
        error.response.status !== 500
      ) {
        console.log(`Error: ${error}. Retrying...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        return error.response.data;
      }
    }
  }
}
export async function getLiveMatchV1(puuid, region) {
  return await axios
    .post(baseURL + "/liveMatch", {
      summonerId: puuid,
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
  while (true) {
    try {
      const response = await axios.post(baseURL + "/summoner/league", {
        summonerId: summonerId,
        region: region,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      if (error.response && error.response.status !== 200) {
        console.log(`Error: ${error}. Retrying...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        return error.response.data;
      }
    }
  }
}
export async function getMatchTimelineV1(matchId, region) {
  while (true) {
    try {
      const response = await axios.post(baseURL + "/match/timeline", {
        matchId: matchId,
        region: region,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      if (error.response && error.response.status !== 200) {
        console.log(`Error: ${error}. Retrying...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        return error.response.data;
      }
    }
  }
}
export async function getMainChampion(summonerId, region) {
  while (true) {
    try {
      const response = await axios.post(baseURL + "/mainChampion", {
        summonerId: summonerId,
        region: region,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      if (error.response && error.response.status !== 200) {
        console.log(`Error: ${error}. Retrying...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        return error.response.data;
      }
    }
  }
}
export async function getPastRanks(summonerName, region) {
  while (true) {
    try {
      const response = await axios.post(baseURL + "/summoner/pastRanks", {
        summonerName: summonerName,
        region: region,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status !== 200 &&
        error.response.status !== 500
      ) {
        console.log(`Error: ${error}. Retrying...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        return error.response.data;
      }
    }
  }
}

export async function getSummonerV2(gameName, tagLine, region) {
  const response = await axios.post(
    "https://lolgg.herokuapp.com/api/v2/summoner",
    {
      gameName: gameName,
      tagLine: tagLine,
      region: region,
    }
  );
  if (response.status === 200) {
    return response;
  }
  return response;
}

export async function updateSummonerV2(gameName, tagLine, region) {
  const response = await axios.post(
    "https://lolgg.herokuapp.com/api/v2/updateSummoner",
    {
      gameName: gameName,
      tagLine: tagLine,
      region: region,
    }
  );
  if (response.status === 200) {
    return response;
  }
  return response;
}

export async function updateMatchHistoryV2(puuid, region, type, start, count) {
  const response = await axios.post(
    "https://lolgg.herokuapp.com/api/v2/updateMatchHistory",
    {
      puuid: puuid,
      region: region,
      type: type,
      start: start,
      count: count,
    }
  );
  if (response.status === 200) {
    return response;
  }
  return response;
}
export async function getMatchHistoryV2(puuid, region, type, start, count) {
  const response = await axios.post(
    "https://lolgg.herokuapp.com/api/v2/matchHistory",
    {
      puuid: puuid,
      region: region,
      type: type,
      start: start,
      count: count,
    }
  );
  if (response.status === 200) {
    return response;
  }
  return response;
}
