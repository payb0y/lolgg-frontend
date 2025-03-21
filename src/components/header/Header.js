import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Search from "./Search";
import logo from "../../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
const Header = ({ mode, setMode }) => {
    const navigate = useNavigate();
    return (
        <header>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "20px",
                }}
            >
                <img
                    src={logo}
                    alt="logo"
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        cursor: "pointer",
                    }}
                    title="Home"
                    onClick={() => {
                        navigate("/");
                    }}
                />
                <Search />
                <div>
                    {mode === "dark" ? (
                        <LightModeIcon
                            onClick={() => {
                                setMode("light");
                            }}
                            style={{ cursor: "pointer" }}
                        />
                    ) : (
                        <DarkModeIcon
                            onClick={() => {
                                setMode("dark");
                            }}
                            style={{ cursor: "pointer" }}
                        />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
