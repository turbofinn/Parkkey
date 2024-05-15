import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import { TextField, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import axios from "axios";
const ETDialog = (props) => {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const matches = useMediaQuery('(max-width:600px)');
    const [selectedDate, setSelectedDate] = useState(null);


    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [gender, setGender] = useState('');


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleClose = () => {
        props.setetDialog(prevState => ({
            ...prevState,
            open: false
        }))
    };

    const handleSubmit = async () => {
        const url = "https://xkzd75f5kd.execute-api.ap-south-1.amazonaws.com/prod/user-management/employee-onboarding";
        const data = {
            "vendorID": "d7e4e25e-8bb2-480e-a807-5e5eb8342ce9",
            "employeeName": name,
            "parkingSpaceID": "d071d97b-5130-4fb6-8c46-be6178c7206c",
            "mobileNo": mobileNo,
            "gender": gender
          };
          const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbi10b2tlbiIsInVzZXJUeXBlIjoiVkVORE9SIiwiaXNzIjoiUGFya2tleSIsInN1YiI6ImI5MDI0YTIxLWM4ZjktNDJkMC1hOTNhLWNmODc5NGRhNGQzNyIsImp0aSI6IjRmMTViNTIwLWUyNzktNGU5MS05ODUwLWI5OGFkMmU3MTU0MiIsImlhdCI6MTcxNTA1MDI0MiwiZXhwIjoyMDMwNDEwMjQyfQ.2Vamt4FXCMT25aZxwvAaOybzKYfCn18R3JIYahUp4tE"
          };

          try {
            const response = await axios.post(url, data, { headers });
            console.log("response", response);
            handleClose();
          } catch (error) {
            console.error(error);
          }

        // console.log("name", name);
        // console.log("name", mobileNo);
        // console.log("name", gender);
    }
    return (
        <React.Fragment>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open}
                onClose={handleClose}
            >
                <DialogTitle style={{ color: '#007FFF' }} >Add New Employee</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }} >
                        <Grid item xs={3}>
                            <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Name</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                style={{ margin: "1%", width: "100%" }}
                                label="Name"
                                id="outlined-size-small"
                                placeholder="name"
                                size="small"
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }} >
                        <Grid item xs={3}>
                            <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Mobile No. </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                style={{ margin: "1%", width: "100%" }}
                                label="mobile no"
                                id="outlined-size-small"
                                placeholder="mobile no"
                                size="small"
                                onChange={(e) => { setMobileNo(e.target.value) }}
                            />
                        </Grid>
                    </Grid>

                    {/* <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <Grid item xs={3}>
                            <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Status</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                style={{ margin: "1%", width: "100%" }}
                                label="status"
                                id="outlined-size-small"
                                placeholder="status"
                                size="small"
                            />
                        </Grid>
                    </Grid> */}

                    <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <Grid item xs={3}>
                            <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Gender</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Select style={{ margin: "1%", width: "100%", padding: matches ? "3%" : "2%" }}
                                id="outlined-size-small"
                                placeholder="gender"
                                size="small"
                                onChange={(e) => { setGender(e.target.value) }}>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                {/* <MenuItem value="Others">Others</MenuItem> */}
                            </Select>
                        </Grid>
                    </Grid>

                    {/* <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <Grid item xs={3}>
                            <Typography variant="body1" style={{ fontSize: '0.95rem', fontFamily: 'inherit' }}>Joining Date</Typography>
                        </Grid>
                        <Grid item xs={6} style={{ marginLeft: '3px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Joining Date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
                                    style={{ width: '100%' }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid> */}

                </DialogContent>
                <DialogActions>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            style={{ color: 'white' }}
                            onClick={handleSubmit}>Submit</Button>
                    </Stack>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default ETDialog;