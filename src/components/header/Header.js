import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
const Header = ({ mode, setMode }) => {
    const navigate = useNavigate();
    const onSearch = (value) => {
        // fetchSummonerData(value);
        navigate(`/profile/${value}`);
    };
    return (
        <header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "20px",
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
                style={{ marginLeft: "auto" }}
            />
            {mode === "dark" ? (
                <LightModeIcon
                    onClick={() => {
                        setMode("light");
                    }}
                    style={{ cursor: "pointer", marginLeft: "auto" }}
                />
            ) : (
                <DarkModeIcon
                    onClick={() => {
                        setMode("dark");
                    }}
                    style={{ cursor: "pointer", marginLeft: "auto" }}
                />
            )}
        </header>
    );
};

export default Header;
