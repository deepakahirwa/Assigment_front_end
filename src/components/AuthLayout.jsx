import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

export const AuthLayout = ({ children, authentication = true }) => {
    const authStatus = useSelector((state) => state.admin.isAdminLoggedIn);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);  // Updated to properly handle loading state

    useEffect(() => {
        // Check authentication and set loading state appropriately
        if (authentication) {
            if (authStatus) {
                setLoading(false);  // User is logged in, stop loading
            } else {
                navigate('');  // User is not logged in, redirect to sign-in
            }
        } else {
            setLoading(false);  // No authentication required, stop loading
        }
    }, [authStatus, authentication, navigate]);

    // Display loading indicator while checking authentication
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress color="success" />
            </div>
        );
    }

    // Once authenticated or no authentication required, render children
    return <>{children}</>;
};

export default AuthLayout;
