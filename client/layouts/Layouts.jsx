import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../styles/app.layout.css";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Settings from "../components/Settings";
import useApp from "../store/useApp";
import ChatHeader from "./ChatHeader";

const Layouts = () => {
    const { isactiveChatHeader, activeHeader, isSettingOpen } = useApp();

    return (
        <div className="app-container">
            {isactiveChatHeader && (
                <header>
                    {" "}
                    <ChatHeader />
                </header>
            )}
            <Sidebar />
            {isSettingOpen && <Settings />}
            <main>
                <Outlet />
            </main>
            {isactiveChatHeader && <Footer />}
        </div>
    );
};

export default Layouts;
