import { assetsURL } from "../../api/LeagueApi";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";
const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: "#f5f5f9",
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 250,

        fontSize: theme.typography.pxToRem(13),
    },
}));
const Champion = ({
    onClick,
    championName,
    width,
    height,
    style,
    summonerName,
}) => {
    if (championName === "FiddleSticks") championName = "Fiddlesticks";
    return (
        <HtmlTooltip
            title={summonerName ? summonerName : championName}
            placement="top"
            arrow
        >
            <img
                src={assetsURL + "champion/" + championName + ".png"}
                alt={championName}
                width={width}
                height={height}
                style={style ? style : { borderRadius: "50%" }}
                onClick={onClick ? onClick : null}
            />
        </HtmlTooltip>
    );
};
export default Champion;
