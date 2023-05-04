import sadporo from "../../assets/404sadporo.png";
import { Stack, Typography } from "@mui/material";

const SummonerNotFound = ({ name }) => {
    //return 404sadporo.png from assets folder
    return (
        <Stack alignItems="center" justifyContent="center">
            <img src={sadporo} alt="404sadporo.png" width={400} />
            <Typography variant="h4" align="center">
                Summoner {name} Not Found.
            </Typography>
        </Stack>
    );
};

export default SummonerNotFound;
