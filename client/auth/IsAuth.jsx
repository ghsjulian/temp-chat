import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../store/useAuth";

const IsAuth = ({ children }) => {
    const { user } = useAuth();
    return (
        <>
            {user && user?._id ? (
                children
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default IsAuth;
