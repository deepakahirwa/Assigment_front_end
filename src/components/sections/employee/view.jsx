import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    CircularProgress
} from '@mui/material';
import { styled } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { fDate } from '../../utils/format-time';
import employeeService from '../../../Api/Employee.Api';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#00796b',
        color: '#ffffff',
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const EmployeeTable = ({ setEmployees, data, setEditEmployee }) => {
    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false); // Loading state for delete action

    const handleClickDelete = (employee) => {
        setSelectedEmployee(employee);
        setOpen(true);
    };

    const handleConfirmDelete = async () => {
        setLoadingDelete(true); // Start loading
        try {
            const response = await employeeService.deleteEmployee(selectedEmployee._id);
            if (response.statuscode === 200) {
                setEmployees((prevEmployees) =>
                    prevEmployees.filter((employee) => employee._id !== selectedEmployee._id)
                );
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        } finally {
            setLoadingDelete(false); // Stop loading
            setOpen(false); // Close the dialog
        }
    };

    const handleCancelDelete = () => {
        setOpen(false);
    };

    return (
        <div className="relative">
            <TableContainer
                component={Paper}
                className="shadow-md h-auto overflow-y-auto"
            >
                <Table>
                    <TableHead
                        sx={{
                            background: '#00796b',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Mobile</StyledTableCell>
                            <StyledTableCell>Designation</StyledTableCell>
                            <StyledTableCell>Gender</StyledTableCell>
                            <StyledTableCell>Course</StyledTableCell>
                            <StyledTableCell>Created Date</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((employee) => (
                            <TableRow key={employee.f_Id}>
                                <TableCell>{employee.f_Id}</TableCell>
                                <TableCell>
                                    <Avatar alt={employee.f_Name} src={employee.f_Image} />
                                </TableCell>
                                <TableCell>{employee.f_Name}</TableCell>
                                <TableCell>{employee.f_Email}</TableCell>
                                <TableCell>{employee.f_Mobile}</TableCell>
                                <TableCell>{employee.f_Designation}</TableCell>
                                <TableCell>{employee.f_Gender}</TableCell>
                                <TableCell>{employee.f_Course}</TableCell>
                                <TableCell>{fDate(employee.f_Createdate)}</TableCell>
                                <TableCell style={{ display: 'flex',gap:6 }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setEditEmployee(employee)}
                                        color="info"
                                        size='small'
                                        // style={{ marginRight: 10, marginBottom: 5 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size='small'
                                        onClick={() => handleClickDelete(employee)}
                                        disabled={loadingDelete} // Disable button while loading
                                    >
                                        {loadingDelete ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : (
                                            'Delete'
                                        )}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={open}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Delete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the employee "{selectedEmployee?.f_Name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="info">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus disabled={loadingDelete}>
                        {loadingDelete ? (
                            <CircularProgress size={24} color="error" />
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EmployeeTable;
