import React from 'react';
import { Card, CardContent, Typography, Grid2, Avatar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Welcome Section */}
            <div className="mb-6 text-center">
                <Typography variant="h4" className="font-bold text-gray-800">
                    Welcome to the Dashboard
                </Typography>
                <Typography variant="subtitle1" className="text-gray-500">
                    Manage your application and view key stats here
                </Typography>
            </div>

            {/* Cards Section */}
            <Grid2 container spacing={4} justifyContent="center">
                {/* Dashboard Stats Card */}
                <Grid2 item xs={12} sm={6} md={4}>
                    <Card className="shadow-lg">
                        <CardContent className="flex items-center">
                            <Avatar className="bg-blue-500">
                                <DashboardIcon fontSize="large" />
                            </Avatar>
                            <div className="ml-4">
                                <Typography variant="h6" className="font-bold">
                                    Overview
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    General stats and performance
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Grid2>

                {/* Employees Card */}
                <Grid2 item xs={12} sm={6} md={4}>
                    <Card className="shadow-lg">
                        <CardContent className="flex items-center">
                            <Avatar className="bg-green-500">
                                <GroupIcon fontSize="large" />
                            </Avatar>
                            <div className="ml-4">
                                <Typography variant="h6" className="font-bold">
                                    Employees
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Manage employee details
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Grid2>

                {/* Projects Card */}
                <Grid2 item xs={12} sm={6} md={4}>
                    <Card className="shadow-lg">
                        <CardContent className="flex items-center">
                            <Avatar className="bg-red-500">
                                <WorkIcon fontSize="large" />
                            </Avatar>
                            <div className="ml-4">
                                <Typography variant="h6" className="font-bold">
                                    Projects
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    View ongoing projects
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>

            {/* Footer Section */}
            <div className="mt-10 text-center">
                <Typography variant="body2" color="textSecondary">
                    © 2024 Your Company Name. All rights reserved.
                </Typography>
            </div>
        </div>
    );
};

export default Dashboard;
