import React, { useState } from 'react';
import { TextField, Button, Tabs, Tab, Box, CircularProgress, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import adminService from '../../Api/admin.api';

const Login = () => {
    const [activeTab, setActiveTab] = useState(0); // 0 for Login, 1 for Create Admin
    const [adminCredentials, setAdminCredentials] = useState({ email: 'jane.smith@example.com', password: '12345678' });
    const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);  // New: success alert state
    const navigate = useNavigate();

    // Handle tab change between Login and Create Admin
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Handle input change for Login Admin form
    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setAdminCredentials({ ...adminCredentials, [name]: value });
    };

    // Handle input change for Create Admin form
    const handleCreateAdminInputChange = (e) => {
        const { name, value } = e.target;
        setNewAdmin({ ...newAdmin, [name]: value });
    };

    // Admin login functionality
    const handleAdminLogin = () => {
        setIsProcessing(true);
        adminService.loginAdmin(adminCredentials)
            .then((response) => {
                console.log(response);
                setIsProcessing(false);
                navigate('/admin'); // Navigate to admin dashboard
            })
            .catch((err) => {
                console.error(err);
                setError(err.response ? err.response.data : "An error occurred during login");
                setIsProcessing(false);
                setTimeout(() => { setError(null); }, 3000);
            });
    };
    // Create Admin functionality
    const handleCreateAdmin = () => {
        if (newAdmin.password !== newAdmin.confirmPassword) {
            setError("Passwords do not match!");
            setTimeout(() => { setError(null); }, 3000);
            return;
        }
        setIsProcessing(true);
        adminService.createAdmin(newAdmin)
            .then((response) => {
                console.log(response);
                setIsProcessing(false);
                setSuccessMessage("Admin account created successfully!");  // Success alert

                // Clear the form fields after successful creation
                setNewAdmin({ name: '', email: '', password: '', confirmPassword: '' });

                setTimeout(() => {
                    setSuccessMessage(null);  // Hide success message after 3 seconds
                    navigate('/'); // Navigate to admin dashboard after creation
                }, 3000);
            })
            .catch((err) => {
                console.error(err);
                setError(err.response ? err.response.data : "An error occurred during admin creation");
                setIsProcessing(false);
                setTimeout(() => { setError(null); }, 3000);
            });
    };


    // Toggle password visibility
    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: "url('src/assets/loginbg.jpg')" }}>

            {/* Loading Spinner */}
            {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <CircularProgress color='success' />
                </div>
            )}

            {/* Error Message */}
            {error && (
                <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError(null)}>
                    <Alert severity="error">{error}</Alert>
                </Snackbar>
            )}

            {/* Success Message */}
            {successMessage && (
                <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(null)}>
                    <Alert severity="success">{successMessage}</Alert>
                </Snackbar>
            )}

            <div className="w-full max-w-sm sm:max-w-md bg-white p-6 rounded-lg shadow-md mx-1">
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    className="mb-4"
                >
                    <Tab label="Login Admin" className="text-sm focus:outline-none" />
                    <Tab label="Create Admin" className="text-sm focus:outline-none" />
                </Tabs>

                {/* Login Admin Panel */}
                <TabPanel value={activeTab} index={0}>
                    <TextField
                        label="Email"
                        name="email"
                        value={adminCredentials.email}
                        onChange={handleLoginInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className="text-sm"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={adminCredentials.password}
                        onChange={handleLoginInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className="text-sm"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        className="focus:outline-none"
                                    >
                                        {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#00796b', color: 'white' }}
                        fullWidth
                        className="mt-4 text-sm py-2 focus:outline-none"
                        onClick={handleAdminLogin}
                    >
                        Admin Login
                    </Button>
                </TabPanel>

                {/* Create Admin Panel */}
                <TabPanel value={activeTab} index={1}>
                    <TextField
                        label="Name"
                        name="name"
                        value={newAdmin.name}
                        onChange={handleCreateAdminInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className="text-sm"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={newAdmin.email}
                        onChange={handleCreateAdminInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className="text-sm"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={newAdmin.password}
                        onChange={handleCreateAdminInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className="text-sm"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        className="focus:outline-none"
                                    >
                                        {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Re-enter Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={newAdmin.confirmPassword}
                        onChange={handleCreateAdminInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className="text-sm"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={toggleShowConfirmPassword}
                                        className="focus:outline-none"
                                    >
                                        {!showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#00796b', color: 'white' }}
                        fullWidth
                        className="mt-4 text-sm py-2 focus:outline-none"
                        onClick={handleCreateAdmin}
                    >
                        Create Admin
                    </Button>
                </TabPanel>
            </div>
        </div>
    );
};

// TabPanel Component
const TabPanel = ({ children, value, index }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
};

export default Login;

