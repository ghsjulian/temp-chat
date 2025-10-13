import React from "react";
import useApp from "../store/useApp";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoColorPalette } from "react-icons/io5";

const Settings = () => {
    const { openSetting,logout } = useApp();

    return (
        <div
            onClick={e => {
                if (e.target.classList.contains("settings-page")) {
                    openSetting(false);
                } else {
                    return;
                }
            }}
            className="settings-page"
        >
            <div className="settings">
                <li>
                    <div className="left">
                        <div className="icon">
                            <IoColorPalette size={30} />
                        </div>
                        App Theme
                    </div>
                    <select>
                        <option value="Dark">Dark</option>
                        <option value="Light">Light</option>
                    </select>
                </li>
                <li>
                    <div className="left">
                        <div className="icon">
                            <IoColorPalette size={30} />
                        </div>
                        Chat Theme
                    </div>
                    <select>
                        <option value="Dark">Dark</option>
                        <option value="Light">Light</option>
                    </select>
                </li>
                <li onClick={logout}>
                    <div className="left">
                        <div className="icon">
                            <RiLogoutCircleRLine size={30} />
                        </div>
                        Logout
                    </div>
                </li>
            </div>
        </div>
    );
};

export default Settings;
