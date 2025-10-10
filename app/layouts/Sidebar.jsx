import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// search icon
import { MdSearch } from "react-icons/md";
// Settings icon
import { BsGear } from "react-icons/bs";
// usere icon
import { HiOutlineUsers } from "react-icons/hi2";
import useApp from "../store/useApp";

const Sidebar = () => {
    const { openChat, closeChat, isOpen } = useApp();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        const handleChange = () => setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleChange);
        closeChat();
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [closeChat, isOpen]);

    return (
        <aside style={{ left: isMobile && isOpen ? "-100%" : "0" }}>
            <div className="top-header">
                <div className="search-area">
                    <div className="icon">
                        <MdSearch size={30} />
                    </div>
                    <input type="text" placeholder="Search user..." />
                </div>
                <div className="option">
                    <div className="icon">
                        <HiOutlineUsers size={28} />
                    </div>
                    <div className="icon">
                        <BsGear size={26} />
                    </div>
                </div>
            </div>
            <div className="user-list">
                <NavLink onClick={openChat} to="/chats/ghs/id1234">
                    <div className="user">
                        <div className="img">
                            <img src="/images/user.png" />
                        </div>
                        <div className="flex">
                            <span>Ghs Julian</span>
                            <p>This is test message</p>
                        </div>
                    </div>
                    <time>12:00 PM</time>
                </NavLink>
                <NavLink>
                    <div className="user">
                        <div className="img">
                            <img src="/images/user.png" />
                        </div>
                        <div className="flex">
                            <span>Ghs Julian</span>
                            <p>This is test message</p>
                        </div>
                    </div>
                    <time>12:00 PM</time>
                </NavLink>
                <NavLink>
                    <div className="user">
                        <div className="img">
                            <img src="/images/user.png" />
                        </div>
                        <div className="flex">
                            <span>Ghs Julian</span>
                            <p>This is test message</p>
                        </div>
                    </div>
                    <time>12:00 PM</time>
                </NavLink>
                <NavLink>
                    <div className="user">
                        <div className="img">
                            <img src="/images/user.png" />
                        </div>
                        <div className="flex">
                            <span>Ghs Julian</span>
                            <p>This is test message</p>
                        </div>
                    </div>
                    <time>12:00 PM</time>
                </NavLink>
                <NavLink>
                    <div className="user">
                        <div className="img">
                            <img src="/images/user.png" />
                        </div>
                        <div className="flex">
                            <span>Ghs Julian</span>
                            <p>This is test message</p>
                        </div>
                    </div>
                    <time>12:00 PM</time>
                </NavLink>
                <NavLink>
                    <div className="user">
                        <div className="img">
                            <img src="/images/user.png" />
                        </div>
                        <div className="flex">
                            <span>Ghs Julian</span>
                            <p>This is test message</p>
                        </div>
                    </div>
                    <time>12:00 PM</time>
                </NavLink>
                <NavLink>
                    <div className="user">
                        <div className="img">
                            <img src="/images/user.png" />
                        </div>
                        <div className="flex">
                            <span>Ghs Julian</span>
                            <p>This is test message</p>
                        </div>
                    </div>
                    <time>12:00 PM</time>
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
