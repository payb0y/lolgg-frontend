import { useState, useEffect } from "react";
import { getLiveMatchV1 } from "../../../api/LeagueApi";
import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LiveMatchDetails from "./LiveMatchDetails";
import DialogContent from "@mui/material/DialogContent";
import { message } from "antd";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const LiveMatch = ({ setLiveMatchVisible, summonerData, region }) => {
    const [liveMatch, setLiveMatch] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setLiveMatchVisible(false);
    };
    useEffect(() => {
        const fetchLiveMatch = async () => {
            const liveMatchResponse = await getLiveMatchV1(
                summonerData?.id,
                region
            );
            if (liveMatchResponse?.status === 200) {
                setLiveMatch(liveMatchResponse.data);
                setOpen(true);
            } else {
                message.open({
                    type: "error",
                    top: 100,
                    duration: 2,
                    maxCount: 1,
                    rtl: true,
                    content: "Summoner is not in a live match",
                });
                setLiveMatchVisible(false);
            }
        };
        fetchLiveMatch();
    }, [summonerData?.id, setLiveMatchVisible, region]);
    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="xl"
                maxHeight="xl"
            >
                <DialogContent dividers>
                    <LiveMatchDetails liveMatch={liveMatch} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
};

export default LiveMatch;
