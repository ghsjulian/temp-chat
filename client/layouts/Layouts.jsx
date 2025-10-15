import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../styles/app.layout.css";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Settings from "../components/Settings";
import useApp from "../store/useApp";
import ChatHeader from "./ChatHeader";
import VideoCall from "../components/VideoCall"


const Layouts = () => {
    const {
        isactiveChatHeader,
        activeHeader,
        isSettingOpen,
        isAudioCalling,
        isVideoCalling
    } = useApp();

    return (
        <div className="app-container">
            {isactiveChatHeader && (
                <header>
                    {" "}
                    <ChatHeader />
                </header>
            )}
            <Sidebar />
            {isVideoCalling && <VideoCall />}
            {isSettingOpen && <Settings />}
            <main>
                <Outlet />
            </main>
            {isactiveChatHeader && <Footer />}
        </div>
    );
};

export default Layouts;
