import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import adminService from '../../Api/admin.api';
import Store from '../../Store/Store';
import { logoutAdmin } from '../../Store/AdminSlice';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false); // Loading state for logout
    const [alert, setAlert] = useState({ open: false, message: '', severity: '' }); // Alert state
    const profile = useSelector((state) => state.admin.admin);
    const navigate = useNavigate();

    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);

    const handleLogout = async () => {
        setIsLoggingOut(true); // Start loading
        try {
            const response = await adminService.logoutAdmin();
            console.log(response);
            Store.dispatch(logoutAdmin());
            setAlert({ open: true, message: 'Logged out successfully!', severity: 'success' }); // Show success alert
            navigate('/');
        } catch (error) {
            setAlert({ open: true, message: 'Logout failed. Please try again later.', severity: 'error' }); // Show error alert
        } finally {
            setIsLoggingOut(false); // Stop loading
        }
    };

    const handleNavigate = (e) => {
        navigate(`${e.target.value}`);
    };

    if (!profile) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <CircularProgress color="success" />
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col">
            {/* Desktop Navbar */}
            <div className="hidden md:block">
                <AppBar position="static" style={{ backgroundColor: '#00796b' }}>
                    <Toolbar>
                        <div className="w-full flex justify-between items-center relative">
                            <img
                                src="https://res.cloudinary.com/drczsu4ej/image/upload/v1726666841/logo-high-resolution-logo-white-transparent_fwde3f.png"
                                alt="logo"
                                className="w-20"
                                onClick={() => navigate('/admin')}
                            />
                            <div className="flex gap-8">
                                <Button color="inherit" value="" onClick={(e) => handleNavigate(e)} className="focus:outline-none">
                                    Home
                                </Button>
                                <Button color="inherit" value="EmployeeList" onClick={(e) => handleNavigate(e)} className="focus:outline-none">
                                    Employee List
                                </Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button color="inherit" className="focus:outline-none">
                                    Welcome, {profile.name}
                                </Button>

                                {/* Show loading spinner while logging out */}
                                <Button color="inherit" className="focus:outline-none" onClick={handleLogout} disabled={isLoggingOut}>
                                    {isLoggingOut ? <CircularProgress size={24} color="inherit" /> : 'Logout'}
                                </Button>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>

            {/* Mobile Navbar */}
            <div className="md:hidden block w-full">
                <AppBar position="static" style={{ backgroundColor: '#00796b' }}>
                    <Toolbar className="flex justify-between">
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            className="focus:outline-none"
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img src="https://res.cloudinary.com/drczsu4ej/image/upload/v1726666841/logo-high-resolution-logo-white-transparent_fwde3f.png" alt="logo" className="w-20" />
                    </Toolbar>
                </AppBar>

                <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                    <div className="flex justify-between items-center p-4 bg-[#00796b]">
                        <Typography variant="h6" className="text-white">
                            Menu
                        </Typography>
                        <IconButton onClick={handleDrawerClose} className="focus:outline-none">
                            <CloseIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>
                    <List>
                        <ListItem button onClick={handleDrawerClose}>
                            <ListItemText primary="Live Exam" />
                        </ListItem>
                        <ListItem button onClick={handleDrawerClose}>
                            <ListItemText primary="Practice Exam" />
                        </ListItem>
                        <ListItem button onClick={handleDrawerClose}>
                            <ListItemText primary="Error Reporting" />
                        </ListItem>
                        <ListItem button onClick={handleDrawerClose}>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </List>
                    <Divider />
                </Drawer>
            </div>

            {/* Logout Alert Snackbar */}
            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={() => setAlert({ ...alert, open: false })}
            >
                <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Navbar;
