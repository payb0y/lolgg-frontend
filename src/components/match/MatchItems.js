import { Items } from "../../store/Items";
import Item from "../parts/Item";
import { Stack } from "@mui/material";
import { baseURL } from "../../api/LeagueApi";
const MatchItems = ({ participant, height, width }) => {
    const { item0, item1, item2, item3, item4, item5, item6 } = participant;
    const items = [item0, item1, item2, item3, item4, item5, item6];
    const itemsName = items.map((item) => Items.data[item]);

    return (
        <Stack
            direction="row"
            spacing={0.3}
            justifyContent="center"
            alignItems="center"
        >
            {items.map((item, index) => (
                <Item
                    alt={"item"}
                    src={baseURL + "/itemIcon?icon=" + item}
                    width={width}
                    height={height}
                    content={itemsName[index]}
                    item={item}
                    key={index}
                />
            ))}
        </Stack>
    );
};

export default MatchItems;
