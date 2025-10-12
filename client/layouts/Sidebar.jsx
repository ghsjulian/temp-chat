import React, { useEffect, useState, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
// search icon
import { MdSearch } from "react-icons/md";
// Settings icon
import { BsGear } from "react-icons/bs";
// usere icon
import { HiOutlineUsers } from "react-icons/hi2";
import useSocket from "../store/useSocket";
import useApp from "../store/useApp";
import timeAgo from "../libs/formatter";

const Sidebar = () => {
    const { messages } = useSocket();
    const {
        isactiveChatHeader,
        getChatUsers,
        renderSearch,
        chatUsers,
        searchUsers,
        randomUsers,
        getRandomUsers,
        setChatUser,
        openSetting,
        isSettingOpen,
        renderChatUser
    } = useApp();
    useEffect(() => {
        getChatUsers();
        getRandomUsers();
    }, [getChatUsers, renderSearch]);
    const userRef = useRef(null);
    const gearRef = useRef(null);
    const [term, setTerm] = useState("");

    return (
        <aside style={{ zIndex: isactiveChatHeader && "0" }}>
            <div className="aside-header">
                <div className="search-area">
                    <div className="icon">
                        <MdSearch size={30} />
                    </div>
                    <input
                        onKeyUp={e => {
                            renderSearch(term.trim());
                        }}
                        onChange={e => setTerm(e.target.value)}
                        value={term}
                        type="text"
                        placeholder="Search user..."
                    />
                </div>
                <div className="option">
                    <div
                        ref={userRef}
                        onClick={e => {
                            userRef.current.classList.add("active");
                            renderChatUser();
                        }}
                        className="icon"
                    >
                        <HiOutlineUsers size={25} />
                    </div>
                    <div
                        onClick={e => {
                            openSetting(true);
                        }}
                        className={isSettingOpen ? "icon active" : "icon"}
                    >
                        <BsGear size={23} />
                    </div>
                </div>
            </div>
            <div className="chat-list">
                {searchUsers?.length > 0
                    ? searchUsers.map((user, idx) => {
                          return (
                              <NavLink
                                  onClick={() => setChatUser(user)}
                                  key={idx}
                                  to={`/chat/${user?.name}/${user?._id}`}
                                  className="chat-user"
                              >
                                  <img src="./icons/user.png" />
                                  <div className="user">
                                      <span>{user?.name}</span>
                                  </div>
                              </NavLink>
                          );
                      })
                    : chatUsers?.length > 0
                    ? chatUsers?.map((chat, idx) => {
                          return (
                              <NavLink
                                  key={idx}
                                  onClick={() => setChatUser(chat)}
                                  to={`/chat/${chat?.name}/${chat?._id}`}
                                  className="chat-user"
                              >
                                  <img src="/icons/user.png" />
                                  <div className="user">
                                      <span>{chat?.name}</span>
                                      <p id="last-message">
                                          {chat?.last_message}
                                      </p>
                                  </div>
                                  <time>{timeAgo(parseInt(chat?.time))}</time>
                              </NavLink>
                          );
                      })
                    : randomUsers?.map((user, idx) => {
                          return (
                              <NavLink
                                  onClick={() => setChatUser(user)}
                                  key={idx}
                                  to={`/chat/${user?.name}/${user?._id}`}
                                  className="chat-user"
                              >
                                  <img src="/icons/user.png" />
                                  <div className="user">
                                      <span>{user?.name}</span>
                                  </div>
                              </NavLink>
                          );
                      })}
            </div>
        </aside>
    );
};

export default Sidebar;
