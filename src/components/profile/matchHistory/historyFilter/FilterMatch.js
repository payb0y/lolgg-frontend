//i want this to be a dropdown menu that filters the matches by the selected option
import { Select, MenuItem } from "@mui/material";
const FilterMatch = ({ type, handleChange }) => {
    return (
        <Select
            autoWidth
            value={type}
            defaultValue={"EUW"}
            onChange={handleChange}
        >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="ranked">Ranked</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
        </Select>
    );
};
export default FilterMatch;
