import React, { useEffect, useState } from 'react';
import EmployeeTable from '../sections/employee/view';
import { Button, CircularProgress, Typography } from '@mui/material';
import EmployeeFormDialog from '../sections/employee/EmployeeFormDialog';
import employeeService from '../../Api/Employee.Api';

function EmployeeList() {
    // State to manage the open/close of the dialog
    const [openDialog, setOpenDialog] = useState(false);
    const [employees, setEmployees] = useState([]); // State for the employee list
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Start loading
                const response = await employeeService.getAllEmployee();
                console.log(response);
                setEmployees(response.data); // Set employees from response
                setError(null); // Clear any previous error
            } catch (err) {
                setError('Failed to fetch employees. Please try again later.'); // Set error message
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchData();
    }, []);

    // Function to handle opening the dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setEditEmployee(null);
        setOpenDialog(false);
    };

    // Function to create a new employee and add it to the list
    const createEmployee = (newEmployee) => {
        newEmployee.id = employees.length + 1; // Generate a new unique ID
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    };

    const [EditEmployee, setEditEmployee] = useState(null);
    console.log(EditEmployee);
    useEffect(() => {
        if (EditEmployee) {
            setOpenDialog(true);
        }
    }, [EditEmployee]);

    return (
        <div className="p-4 flex flex-col">
            {/* Button to open the Create Employee dialog */}
            <div className="flex mb-2">
                <Button variant="outlined" color="success" onClick={handleOpenDialog}>
                    Create Employee
                </Button>
            </div>

            {/* Loading Indicator */}
            {loading ? (
                <div className="flex justify-center items-center my-4">
                    <CircularProgress color='success' />
                </div>
            ) : error ? (
                // Error message if an error occurs
                <Typography color="error" className="text-center">
                    {error}
                </Typography>
            ) : (
                // Employee Table, only rendered if no loading or error
                <EmployeeTable
                    setEmployees={setEmployees}
                    data={employees}
                    setEditEmployee={setEditEmployee}
                />
            )}

            {/* Employee Create Form Dialog */}
            {(openDialog || EditEmployee) && (
                <EmployeeFormDialog
                    employeeForEdit={EditEmployee}
                    open={openDialog}
                    handleClose={handleCloseDialog}
                    setEmployees={setEmployees}
                    createEmployee={createEmployee}
                />
            )}
        </div>
    );
}

export default EmployeeList;
