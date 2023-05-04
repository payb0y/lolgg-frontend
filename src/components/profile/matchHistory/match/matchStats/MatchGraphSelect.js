import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const MatchGraphSelect = ({ graphData, setGraphData }) => {
    const handleChange = (event) => {
        setGraphData(event.target.value);
    };
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={graphData}
                onChange={handleChange}
            >
                <FormControlLabel
                    value="totalDamageDealt"
                    control={<Radio />}
                    label="Total Damage Dealt"
                />
                <FormControlLabel
                    value="totalDamageDealtToChampions"
                    control={<Radio />}
                    label="Total Damage To Champions"
                />
                <FormControlLabel
                    value="totalDamageTaken"
                    control={<Radio />}
                    label="Total Damage Taken"
                />
                <FormControlLabel
                    value="damageDealtToObjectives"
                    control={<Radio />}
                    label="Total Damage To Objectives"
                />
                <FormControlLabel
                    value="damageDealtToTurrets"
                    control={<Radio />}
                    label="Total Damage To Turrets"
                />
                <FormControlLabel
                    value="totalHeal"
                    control={<Radio />}
                    label="Healing Done"
                />
                <FormControlLabel
                    value="goldEarned"
                    control={<Radio />}
                    label="Gold Earned"
                />
                <FormControlLabel
                    value="goldSpent"
                    control={<Radio />}
                    label="Gold Spent"
                />
                <FormControlLabel
                    value="visionScore"
                    control={<Radio />}
                    label="Vision Score"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default MatchGraphSelect;
