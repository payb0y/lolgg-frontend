import champions from "../../../../data/champions.json";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Champion from "../../../parts/Champion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { assetsURL } from "../../../../api/LeagueApi";
const AutoCompleteChamps = ({ selectedChamp, onChange }) => {
    const ITEMS = [];
    //loop through champions.json
    for (const [key, value] of Object.entries(champions.data)) {
        ITEMS.push({
            name: value.name,
            icon: value.image.full,
        });
    }
    console.log(ITEMS);
    return (
        <Autocomplete
            freeSolo
            disableClearable
            onChange={onChange}
            sx={{ width: "150px" }}
            options={ITEMS}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                >
                    <img
                        src={assetsURL + "champion/" + option.icon}
                        alt={option.name}
                        width={25}
                        height={25}
                        style={{ borderRadius: "50%" }}
                    />
                    <Typography>{option.name}</Typography>
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search"
                    InputProps={{
                        ...params.InputProps,
                        type: "search",
                    }}
                />
            )}
        />
    );
};
export default AutoCompleteChamps;
