const SummonerIcon = ({ icon, width, height }) => {
    return (
        <img
            src={
                "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/" +
                icon +
                ".png"
            }
            alt="profile icon"
            width={width}
            height={height}
            style={{
                borderRadius: "50%",
            }}
        />
    );
};
export default SummonerIcon;
