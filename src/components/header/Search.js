import { TextField, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [region, setRegion] = useState("EUW");
  const handleChange = (event) => {
    setRegion(event.target.value);
  };
  const navigate = useNavigate();
  const onSearch = (value) => {
    //print all the characters in the value
    const cleanValue = value.replace(/[^ -~]+/g, "");
    const parts = cleanValue.split("#").map((part) => part.trim()); // Split and trim both parts
    let gameName = parts[0]; // Encode gameName to handle special characters
    let tagLine = parts.length > 1 ? parts[1] : ""; // Encode tagLine, handle absence of tagLine
    //format the parts in utf-8

    navigate(`/profile/${region}/${gameName}-${tagLine}`);
  };
  return (
    <div>
      <Select
        autoWidth
        value={region}
        defaultValue={"EUW"}
        onChange={handleChange}
      >
        <MenuItem value={"EUW"}>EUW</MenuItem>
        <MenuItem value={"EUNE"}>EUNE</MenuItem>
        <MenuItem value={"NA"}>NA</MenuItem>
        <MenuItem value={"KR"}>KR</MenuItem>
        <MenuItem value={"JP"}>JP</MenuItem>
        <MenuItem value={"BR"}>BR</MenuItem>
        <MenuItem value={"TR"}>TR</MenuItem>
        <MenuItem value={"RU"}>RU</MenuItem>
        <MenuItem value={"LAN"}>LAN</MenuItem>
        <MenuItem value={"LAS"}>LAS</MenuItem>
        <MenuItem value={"OCE"}>OCE</MenuItem>
      </Select>
      <TextField
        id="outlined-basic"
        label="gameName#Tag"
        variant="outlined"
        autoComplete="off"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSearch(e.target.value);
          }
        }}
        style={{ marginLeft: "auto", width: "160px" }}
      />
    </div>
  );
};

export default Search;
