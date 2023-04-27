import React from "react";
import { Divider, Stack } from "@mui/material";
import Rune from "../../parts/Rune.js";
import runes from "../../../data/runes.json";
import CustomPaper from "../../UI/CustomPaper.js";

const MatchRunes = ({ participant }) => {
    const primaryStyle = participant.perks.styles[0].style;
    const secondaryStyle = participant.perks.styles[1].style;
    const primaryStyleName = runes.find((rune) => rune.id === primaryStyle);
    const secondaryStyleName = runes.find((rune) => rune.id === secondaryStyle);
    let primaryRunesNames = [];
    let secondaryRunesNames = [];
    let statPerksIcons = [];
    statPerksIcons.push(
        participant.perks.statPerks.defense,
        participant.perks.statPerks.flex,
        participant.perks.statPerks.offense
    );
    participant.perks.styles[0].selections.forEach((selection) => {
        primaryRunesNames.push(
            primaryStyleName.slots
                .map((slot) => {
                    return slot.runes.find(
                        (rune) => rune.id === selection.perk
                    );
                })
                .filter((rune) => rune !== undefined)
        );
    });
    participant.perks.styles[1].selections.forEach((selection) => {
        secondaryRunesNames.push(
            secondaryStyleName.slots
                .map((slot) => {
                    return slot.runes.find(
                        (rune) => rune.id === selection.perk
                    );
                })
                .filter((rune) => rune !== undefined)
        );
    });
    return (
        <Stack
            direction="row"
            spacing={5}
            justifyContent="center"
            alignItems="center"
        >
            <CustomPaper
                sx={{
                    backgroundColor: "rgba(128, 128, 128, 0.3)",
                    padding: "10px",
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    divider={<Divider orientation="vertical" flexItem />}
                >
                    <Stack spacing={1}>
                        <Rune rune={primaryStyleName} width={35} height={35} />
                        <Rune
                            rune={secondaryStyleName}
                            width={35}
                            height={35}
                        />
                    </Stack>
                    <Stack
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Stack direction="row" spacing={0.3}>
                            {primaryRunesNames.map((rune, index) => (
                                <Rune
                                    rune={rune[0]}
                                    width={35}
                                    height={35}
                                    key={index}
                                />
                            ))}
                        </Stack>
                        <Stack direction="row" spacing={0.3}>
                            {secondaryRunesNames.map((rune, index) => (
                                <Rune
                                    rune={rune[0]}
                                    width={35}
                                    height={35}
                                    key={index}
                                />
                            ))}
                        </Stack>
                        <Stack direction="row" spacing={0.3}>
                            {statPerksIcons.map((icon, index) => (
                                <img
                                    src={`https://opgg-static.akamaized.net/meta/images/lol/perkShard/${icon}.png?image=q_auto,f_webp,w_48&v=1681967972545`}
                                    alt="statPerk"
                                    width={25}
                                    height={25}
                                    style={{
                                        borderRadius: "50%",
                                        background: "black",
                                    }}
                                    key={index}
                                />
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </CustomPaper>
        </Stack>
    );
};
export default MatchRunes;
