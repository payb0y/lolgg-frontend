import { Stack } from "@mui/material";
import Item from "../parts/Item";
const MatchItems = ({ participant, height, width }) => {
    const { item0, item1, item2, item3, item4, item5, item6 } = participant;
    const items = [item0, item1, item2, item3, item4, item5, item6];
    return (
        <Stack
            direction="row"
            spacing={0.3}
            justifyContent="center"
            alignItems="center"
        >
            {items.map((item, index) => (
                <Item item={item} width={width} height={height} key={index} />
            ))}
        </Stack>
    );
};

export default MatchItems;
