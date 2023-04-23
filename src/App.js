import "./App.css";
import Profile from "./components/profile/Profile";
import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import React from "react";
function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/profile/:summonerName" element={<Profile />} />
            </Routes>
        </>
    );
}

export default App;
