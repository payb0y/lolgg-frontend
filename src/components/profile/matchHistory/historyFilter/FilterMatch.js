import { Select, MenuItem } from "@mui/material";
const FilterMatch = ({ matchType, queueChangeHandler }) => {
    const MATCH_TYPES = {
        0: "All",
        420: "Ranked Solo",
        440: "Ranked Flex",
        400: "Normal Draft",
        430: "Normal Blind",
        450: "ARAM",
        700: "Clash",
    };
    return (
        <Select
            autoWidth
            value={matchType}
            defaultValue={"EUW"}
            onChange={queueChangeHandler}
        >
            {Object.keys(MATCH_TYPES).map((type) => (
                <MenuItem key={type} value={type}>
                    {MATCH_TYPES[type]}
                </MenuItem>
            ))}
        </Select>
    );
};
export default FilterMatch;
