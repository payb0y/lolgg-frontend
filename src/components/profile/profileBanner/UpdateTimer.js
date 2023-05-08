import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const UpdateTimer = ({ time, setTimeBeforeNextUpdate }) => {
    const [timeLeft, setTimeLeft] = useState(time);
    useEffect(() => {
        if (timeLeft > 0) {
            setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else {
            setTimeBeforeNextUpdate(0);
        }
    }, [timeLeft, setTimeBeforeNextUpdate]);
    return (
        <Typography fontSize={12} variant="body1">
            Next update in {timeLeft}s.
        </Typography>
    );
};
export default UpdateTimer;
