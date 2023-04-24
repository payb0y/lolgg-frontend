import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import shortid from "shortid";

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: "#f5f5f9",
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 250,

        fontSize: theme.typography.pxToRem(13),
    },
}));

const TooltipLeague = ({ children, content }) => {
    const attentionPattern = /<attention>(\d+)<\/attention>/g;
    const attentionDetailPattern = /<\/attention>(.*?)<br>/g;
    const passivePattern = /<passive>(.*?)<\/passive>/g;
    const passiveDetailPattern = /<\/passive>(.*?)\.\s*</g;
    const activePattern = /<active>(.*?)<\/active>/g;
    const activeDetailPattern = /<\/active>(.*?)<br>/g;
    const flavorPattern = /<flavorText>(.*?)<\/flavorText>/;
    const rarityMythicPattern = /<rarityMythic>(.*?)<\/rarityMythic>/g;
    const rarityMythicDetailPattern = /<\/rarityMythic>(.*?)<br>/g;

    const attentionMatches = content?.description.match(attentionPattern);
    const attentionDetailMatches = content?.description.match(
        attentionDetailPattern
    );
    let attentions = [];
    if (attentionMatches) {
        for (let i = 0; i < attentionMatches.length; i++) {
            attentions.push({
                attention: attentionMatches[i]?.match(/\d+/g),
                detail: attentionDetailMatches[i]
                    ?.match(/>(.*?)</g)[0]
                    .slice(2, -1),
            });
        }
    }
    const activeMatches = content?.description
        .replace("<active>Active -</active>", "")
        .match(activePattern);
    const activeDetailMatches = content?.description
        .replace("<active>Active -</active>", "")
        .match(activeDetailPattern);
    let actives = [];
    if (activeMatches) {
        for (let i = 0; i < activeMatches.length; i++) {
            actives.push({
                active: activeMatches[i]?.match(/(?<=>)[^<]+/g),
                detail: activeDetailMatches[i]
                    ?.match(/>(.*?)</g)
                    .map((match) => match.slice(1, -1)),
            });
        }
    }

    const flavorMatches = content?.description.match(flavorPattern);
    let flavorText = "";
    if (flavorMatches) {
        flavorText = flavorMatches[0]?.match(/>(.*?)</g)[0].slice(1, -1);
    }
    const passiveMatches = content?.description.match(passivePattern);
    const passiveDetailMatches =
        content?.description.match(passiveDetailPattern);
    let passives = [];
    if (passiveMatches) {
        for (let i = 0; i < passiveMatches.length; i++) {
            passives.push({
                passive: passiveMatches[i]?.match(/(?<=>)[^<]+/g),
                detail: passiveDetailMatches[i]
                    ?.match(/>(.*?)</g)
                    .map((match) => match.slice(1, -1)),
            });
        }
    }
    const rarityMythicMatches = content?.description.match(rarityMythicPattern);
    const rarityMythicDetailMatches = content?.description.match(
        rarityMythicDetailPattern
    );
    let rarityMythics = [];
    if (rarityMythicMatches) {
        for (let i = 0; i < rarityMythicMatches.length; i++) {
            rarityMythics.push({
                rarityMythic: rarityMythicMatches[i]?.match(/\d+/g),
                detail: rarityMythicDetailMatches[i]
                    ?.match(/>(.*?)</g)
                    .map((match) => match.slice(1, -1))
                    .join(""),
            });
        }
    }
    return (
        <HtmlTooltip
            arrow
            key={shortid.generate()}
            title={
                <React.Fragment>
                    <Typography color="black">{content?.name}</Typography>
                    {content?.plaintext && (
                        <span key={shortid.generate()}>
                            {content?.plaintext}.
                            <br />
                            <br />
                        </span>
                    )}

                    {attentions &&
                        attentions.map((attention) => {
                            return (
                                <span key={shortid.generate()}>
                                    {attention.attention} {attention.detail}
                                    <br />
                                </span>
                            );
                        })}
                    {attentions.length > 0 && <br />}
                    {actives &&
                        actives.map((active) => {
                            return (
                                <span key={shortid.generate()}>
                                    {active.active} {active.detail}
                                    <br />
                                </span>
                            );
                        })}
                    {actives.length > 0 && <br />}
                    {passives &&
                        passives.map((passive) => {
                            return (
                                <span key={shortid.generate()}>
                                    {passive.passive} {passive.detail} <br />
                                </span>
                            );
                        })}
                    {passives.length > 0 && <br />}
                    {rarityMythics &&
                        rarityMythics.map((rarityMythic) => {
                            return (
                                <span key={shortid.generate()}>
                                    Mythic Passive: {rarityMythic.detail} <br />
                                </span>
                            );
                        })}
                    {rarityMythics.length > 0 && <br />}
                    {flavorText && (
                        <span key={shortid.generate()}>{flavorText}</span>
                    )}

                    {content?.gold.total !== 0 && (
                        <span key={shortid.generate()}>
                            Cost: {content?.gold.total} ({content?.gold.sell})
                        </span>
                    )}
                </React.Fragment>
            }
        >
            {children}
        </HtmlTooltip>
    );
};

export default TooltipLeague;
