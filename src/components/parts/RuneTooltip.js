import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

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

const RuneTooltip = ({ rune, children }) => {
    const lines = rune.longDesc?.split("<br>");
    const description = lines?.map((line) => {
        return line.replace(/<[^>]+>/g, "");
    });
    return (
        <HtmlTooltip
            disableFocusListener
            arrow
            placement="top"
            title={
                <React.Fragment>
                    <Typography color="black">{rune.name}</Typography>
                    {description?.map((line, index) => {
                        return <div key={index}>{line}</div>;
                    })}
                </React.Fragment>
            }
        >
            {children}
        </HtmlTooltip>
    );
};
export default RuneTooltip;
