import "./App.css";
import Profile from "./components/profile/Profile";
import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";

function App() {
    const [mode, setMode] = useState(localStorage.getItem("mode") || "dark");
    localStorage.setItem("mode", mode);
    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header mode={mode} setMode={setMode} />
            <Routes>
                <Route path="/profile/:summonerName" element={<Profile />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
