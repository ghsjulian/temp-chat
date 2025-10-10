import React,{useState,useEffect} from 'react'
import useApp from "../store/useApp";


const Home = () => {
    const {activeHeader} = useApp()
    useEffect(() => {
      activeHeader(false)
    }, [])
    
    
  return (
    <div className="wlcm">
            <img src="/images/wlcm.png" />
            <h2>
                Welcome Back , <span>Ghs Julian</span>
            </h2>
            <p>
                Let's connect with people and share our chats, make audio and
                video call. Gain your communication skills by chatting with
                random peoples.
            </p>
        </div>
  )
}

export default Home