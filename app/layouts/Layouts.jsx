import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/app.style.css"
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layouts = () => {
    
    return <>
    <div className="app">
   {/* <Header/>*/}
    <Sidebar/>
    <main >
    <Outlet/>
    </main>
   {/* <Footer/>*/}
    </div>
    </>;
};

export default Layouts;
