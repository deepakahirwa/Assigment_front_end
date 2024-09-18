import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    FormLabel,
    Button,
    TextField,
    Grid,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    IconButton,
    Avatar,
    FormControlLabel,
    RadioGroup,
    Radio,
    Checkbox,
    FormGroup,
    CircularProgress
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import ImagePreviewer from '../../utils/ImagePreviewer';
import employeeService from '../../../Api/Employee.Api';

function EmployeeFormDialog({ employeeForEdit, open, handleClose, setEmployees }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            f_Name: employeeForEdit?.f_Name || '',
            f_Email: employeeForEdit?.f_Email || '',
            f_Mobile: employeeForEdit?.f_Mobile || '',
            f_Designation: employeeForEdit?.f_Designation || '',
            f_Gender: employeeForEdit?.f_Gender || '',
            f_Course: employeeForEdit?.f_Course || [],
            f_Image: employeeForEdit?.f_Image || ''
        }
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageUpload = (newImage) => {
        setImage(newImage);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMessage('');

        if (image) {
            data.image = image;
        } else {
            data.f_Image = employeeForEdit?.f_Image || '';
        }

        try {
            let response;
            if (employeeForEdit) {
                response = await employeeService.updateEmployee(employeeForEdit._id, data);
                setEmployees((prev) => {
                    const updatedEmployees = prev.map(employee =>
                        employee._id === employeeForEdit._id ? response.data : employee
                    );
                    return updatedEmployees;
                });
            } else {
                console.log(data);
                
                response = await employeeService.createEmployee(data);
                setEmployees((prev) => [...prev, response.data]);
            }
            console.log(response);
            
            handleClose();
        } catch (error) {
            console.log(error);
            
            setErrorMessage(error?.response?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
            <DialogTitle>
                <Typography variant="h6" color="green" sx={{ fontWeight: 'bold' }}>
                    {employeeForEdit ? 'Edit Employee' : 'Add New Employee'}
                </Typography>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers style={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="f_Name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.name}
                                        helperText={errors.name ? 'This field is required' : ''}
                                    />
                                )}
                                rules={{ required: 'Name is required' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="f_Email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.f_Email}
                                        helperText={errors.f_Email ? 'This field is required' : ''}
                                    />
                                )}
                                rules={{ required: 'Email is required' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="f_Mobile"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Mobile"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.f_Mobile}
                                        helperText={errors.f_Mobile ? 'This field is required' : ''}
                                    />
                                )}
                                rules={{ required: 'Mobile number is required' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="f_Designation"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel>Designation</InputLabel>
                                        <Select {...field} label="Designation">
                                            <MenuItem value="HR">HR</MenuItem>
                                            <MenuItem value="Manager">Manager</MenuItem>
                                            <MenuItem value="Sales">Sales</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                                rules={{ required: 'Designation is required' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="f_Gender"
                                control={control}
                                render={({ field }) => (
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup row {...field}>
                                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                )}
                                rules={{ required: 'Gender is required' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Course</Typography>
                            <Controller
                                name="f_Course"
                                control={control}
                                render={({ field }) => (
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox checked={field.value.includes('MCA')} onChange={(e) => {
                                                const updatedCourses = e.target.checked
                                                    ? [...field.value, 'MCA']
                                                    : field.value.filter(c => c !== 'MCA');
                                                field.onChange(updatedCourses);
                                            }} />}
                                            label="MCA"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={field.value.includes('BCA')} onChange={(e) => {
                                                const updatedCourses = e.target.checked
                                                    ? [...field.value, 'BCA']
                                                    : field.value.filter(c => c !== 'BCA');
                                                field.onChange(updatedCourses);
                                            }} />}
                                            label="BCA"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={field.value.includes('BSC')} onChange={(e) => {
                                                const updatedCourses = e.target.checked
                                                    ? [...field.value, 'BSC']
                                                    : field.value.filter(c => c !== 'BSC');
                                                field.onChange(updatedCourses);
                                            }} />}
                                            label="BSC"
                                        />
                                    </FormGroup>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ImagePreviewer label="Upload Employee Image" imagesForUpload={handleImageUpload} />
                        </Grid>
                        {employeeForEdit?.f_Image && !image && <Avatar style={{height:400,width:400, margin:'auto auto'}} src={employeeForEdit?.f_Image} variant="square" />}
                    </Grid>
                    {errorMessage && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="error" disabled={loading}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Save'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default EmployeeFormDialog;
