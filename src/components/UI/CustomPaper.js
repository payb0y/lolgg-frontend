import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    padding: theme.spacing(1),
}));
const CustomPaper = ({ children, sx }) => {
    return <Item sx={sx}>{children}</Item>;
};

export default CustomPaper;
