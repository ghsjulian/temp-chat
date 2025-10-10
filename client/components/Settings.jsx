import React from "react";
import useApp from "../store/useApp";

const Settings = () => {
    const { openSetting } = useApp();

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
                    Choose Theme{" "}
                    <select>
                        <option value="Dark">Dark</option>
                        <option value="Light">Light</option>
                    </select>
                </li>
                <li>
                    Chat Theme{" "}
                    <select>
                        <option value="Dark">Dark</option>
                        <option value="Light">Light</option>
                    </select>
                </li>
            </div>
        </div>
    );
};

export default Settings;
