import React from "react";
import { Stack } from "@mui/material";
import runes from "../../../data/runes.json";
import Rune from "../../parts/Rune";

const LiveMatchRunes = ({ perks }) => {
    const { perkIds, perkStyle, perkSubStyle } = perks;
    const primaryStyle = runes.find((rune) => rune.id === perkStyle);
    const secondaryStyle = runes.find((rune) => rune.id === perkSubStyle);
    const primaryRuneIcons = [];
    const secondaryRuneIcons = [];

    perkIds.forEach((id, index) => {
        if (index < 4) {
            const rune = primaryStyle.slots
                .map((slot) => {
                    return slot.runes.find((rune) => rune.id === id);
                })
                .filter((rune) => rune !== undefined);
            primaryRuneIcons.push(rune);
        } else if (index < 6) {
            const rune = secondaryStyle.slots
                .map((slot) => {
                    return slot.runes.find((rune) => rune.id === id);
                })
                .filter((rune) => rune !== undefined);
            secondaryRuneIcons.push(rune);
        }
    });
    return (
        <Stack>
            <Stack direction="row" spacing={0.1}>
                {primaryRuneIcons.map((rune) => (
                    <Rune rune={rune[0]} width={20} height={20} />
                ))}
            </Stack>
            <Stack direction="row" spacing={0.1}>
                {secondaryRuneIcons.map((rune) => (
                    <Rune rune={rune[0]} width={20} height={20} />
                ))}
            </Stack>
        </Stack>
    );
};

export default LiveMatchRunes;
