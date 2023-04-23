import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const onSearch = (value) => {
        // fetchSummonerData(value);
        navigate(`/profile/${value}`);
    };
    return (
        <header
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
                minWidth: "800px",
            }}
        >
            <TextField
                id="outlined-basic"
                label="Summoner"
                variant="outlined"
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        onSearch(e.target.value);
                    }
                }}
            />
        </header>
    );
};

export default Header;
