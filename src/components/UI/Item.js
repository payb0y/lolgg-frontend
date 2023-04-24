import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Card = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black ",
}));
const Item = ({ children, backgroundColor, sx }) => {
    return <Card sx={sx}>{children}</Card>;
};

export default Item;
