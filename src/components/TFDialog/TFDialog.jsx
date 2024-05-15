import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import { TextField, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Chip } from "@mui/material";
import { useState } from 'react';
import axios from "axios";
export default function MaxWidthDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const matches = useMediaQuery('(max-width:600px)');

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [vehicle, setVehicle] = useState([]);
    const [TotalSpace, setTotalSpace] = useState(0);
    const [AvailableSpace, setAvailableSpace] = useState(0);
    const [Longitude, setLongitude] = useState('');
    const [Latitude, setLatitude] = useState('');
    const [TariffTime, setTariffTime] = useState(0);
    const [TariffCharge, setTariffCharge] = useState(0);
    const [Rating, setRating] = useState(0);
    const [Review, setReview] = useState('');
    
    const url = "https://xkzd75f5kd.execute-api.ap-south-1.amazonaws.com/prod/user-management/parking-space-onboarding";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbi10b2tlbiIsInVzZXJUeXBlIjoiVkVORE9SIiwiaXNzIjoiUGFya2tleSIsInN1YiI6ImI5MDI0YTIxLWM4ZjktNDJkMC1hOTNhLWNmODc5NGRhNGQzNyIsImp0aSI6IjRmMTViNTIwLWUyNzktNGU5MS05ODUwLWI5OGFkMmU3MTU0MiIsImlhdCI6MTcxNTA1MDI0MiwiZXhwIjoyMDMwNDEwMjQyfQ.2Vamt4FXCMT25aZxwvAaOybzKYfCn18R3JIYahUp4tE";
    const names = [
        "Heavy",
        "Bike",
        "Car",
        "Truck",
        "Bus",
    ];
    // console.log("xy", name);
    // console.log("xy", location);
    // console.log("xy", vehicle);
    // console.log("xy", TotalSpace);
    // console.log("xy", AvailableSpace);
    // console.log("xy", Longitude);
    // console.log("xy", Latitude);
    // console.log("xy", TariffTime);
    // console.log("xy", TariffCharge);
    // console.log("xy", Rating);
    // console.log("xy", Review);
    const handleClose = () => {
        props.settfDialog(prevState => ({
            ...prevState,
            open: false
        }))
    };
    const handleLoader = () =>{
        props.setloader(prevState => ({
            ...prevState,
            open: true
        }));
    }
    const handleLoaderfalse = () =>{
        props.setloader(prevState => ({
            ...prevState,
            open: false
        }));
    }
    const handleSubmit = async () => {
        handleLoader();
        const data = {
            vendorID: "d7e4e25e-8bb2-480e-a807-5e5eb8342ce9",
            vehicleType: vehicle,
            parkingName: name,
            availableSpace: AvailableSpace,
            totalSpace: TotalSpace,
            rating: Rating,
            review: Review,
            location: location,
            tariffTime: TariffTime,
            tariffCharges: TariffCharge,
            latitude: Latitude,
            longitude: Longitude
        };
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
            const response = await axios.post(url, data, { headers });
            handleLoaderfalse();
            handleClose();
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <React.Fragment>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open}
                onClose={handleClose}
            >
                <DialogTitle style={{ color: '#007FFF' }} >Add New Parking</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }} >
                        <Grid item xs={3}>
                            <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Parking Name </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                style={{ margin: "1%", width: "100%" }}
                                label="Parking Name"
                                id="outlined-size-small"
                                placeholder="parking name"
                                size="small"
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }} >
                        <Grid item xs={3}>
                            <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Location </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                style={{ margin: "1%", width: "100%" }}
                                label="location"
                                id="outlined-size-small"
                                placeholder="location"
                                size="small"
                                onChange={(e) => { setLocation(e.target.value) }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }} >
                        <Grid item xs={3}>
                            <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Vehicle Type </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl sx={{ width: "100%" }}
                                placeholder="Vehicle Type"
                                size="small"
                            >
                                <InputLabel>Multiple Select</InputLabel>
                                <Select
                                    style={{ margin: "1%", width: "100%", padding: matches ? "3%" : "2%" }}
                                    multiple
                                    value={vehicle}
                                    id="outlined-size-small"
                                    onChange={(e) => {
                                        setVehicle(e.target.value);
                                        console.log("vehicle", vehicle);
                                    }}
                                    renderValue={(selected) => (
                                        <Stack gap={1} direction="row" flexWrap="wrap">
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Stack>
                                    )}
                                >
                                    {names.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <Grid item xs={3}>
                            <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Total Space </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                style={{ margin: "1%", width: "100%" }}
                                label="Total Space"
                                id="outlined-size-small"
                                placeholder="Total Space"
                                size="small"
                                onChange={(e) => { setTotalSpace(e.target.value) }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <Grid item xs={3}>
                            <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Available Space </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                style={{ margin: "1%", width: "100%" }}
                                label="Available Space"
                                id="outlined-size-small"
                                placeholder="Available Space"
                                size="small"
                                onChange={(e) => { setAvailableSpace(e.target.value) }}
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }}>
                            <Grid item xs={3}>
                                <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Longitude </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    style={{ margin: "1%", width: "100%" }}
                                    label="Longitude"
                                    id="outlined-size-small"
                                    placeholder="Longitude"
                                    size="small"
                                    onChange={(e) => { setLongitude(e.target.value) }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }} >
                            <Grid item xs={3}>
                                <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Latitude </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    style={{ margin: "1%", width: "100%" }}
                                    label="Latitude"
                                    id="outlined-size-small"
                                    placeholder="Latitude"
                                    size="small"
                                    onChange={(e) => { setLatitude(e.target.value) }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }} >
                        <Grid item xs={3}>
                            <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Tariff Time </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                style={{ margin: "1%", width: "100%" }}
                                label="Tariff Time"
                                id="outlined-size-small"
                                placeholder="Tariff Time"
                                size="small"
                                onChange={(e) => { setTariffTime(e.target.value) }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }} >
                        <Grid item xs={3}>
                            <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Tariff Charges </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                style={{ margin: "1%", width: "100%" }}
                                label="Tariff Charges"
                                id="outlined-size-small"
                                placeholder="Tariff Charges"
                                size="small"
                                onChange={(e) => { setTariffCharge(e.target.value) }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }} >
                        <Grid item xs={3}>
                            <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Rating </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                style={{ margin: "1%", width: "100%" }}
                                label="Rating"
                                id="outlined-size-small"
                                placeholder="Rating"
                                size="small"
                                onChange={(e) => { setRating(e.target.value) }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} justifyContent="evenly" alignItems="center" style={{ marginTop: '2px', marginBottom: '2px' }} >
                        <Grid item xs={3}>
                            <Typography variant="body1" style={{ fontSize: matches ? '0.85rem' : '0.95rem', fontFamily: 'inherit' }}>Review </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                style={{ margin: "1%", width: "100%" }}
                                label="Review"
                                id="outlined-size-small"
                                placeholder="Review"
                                size="small"
                                onChange={(e) => { setReview(e.target.value) }}
                            />
                        </Grid>
                    </Grid>
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
    );
}
