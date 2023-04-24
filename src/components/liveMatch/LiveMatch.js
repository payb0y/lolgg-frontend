import { useState, useContext, useEffect } from "react";
import { getLiveMatchV1 } from "../../api/LeagueApi";
import { SummonerContext } from "../../store/SummonerContext";
import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LiveMatchDetails from "./LiveMatchDetails";
import DialogContent from "@mui/material/DialogContent";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const LiveMatch = ({ setLiveMatchVisible }) => {
    const [liveMatch, setLiveMatch] = useState(null);
    const { summonerData } = useContext(SummonerContext);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setLiveMatchVisible(false);
    };
    useEffect(() => {
        const fetchLiveMatch = async () => {
            const liveMatchResponse = await getLiveMatchV1(
                summonerData?.id,
                "EUW"
            ).catch(() => {
                console.log("No live match found");
                // message.info({
                //     type: "warning",
                //     content: "No live match found",
                //     duration: 2,
                //     maxCount: 1,
                //     style: {
                //         marginTop: "8vh",
                //     },
                // });
                setLiveMatchVisible(false);
            });
            if (liveMatchResponse?.status === 200) {
                setLiveMatch(liveMatchResponse.data);
                setOpen(true);
            } else {
                setLiveMatchVisible(false);
            }
        };
        fetchLiveMatch();
    }, [summonerData?.id, setLiveMatchVisible]);
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
