import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import parkingTableData from "layouts/tables/data/parkingTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import CircularProgress from '@mui/material/CircularProgress';

import parkey from "assets/images/onlpLogo.png";
import MDBadge from "components/MDBadge";
import MDAvatar from "components/MDAvatar";
import { useEffect, useState } from "react";

import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import apiService from "ApiServices/ApiService";
import axios from 'axios';
import ETDialog from "components/ETDialog/ETDialog";
import AddLocationIcon from '@mui/icons-material/AddLocation';

function EmployeeTables() {
    const [employeeDetails, setemployeeDetails] = useState(["1", "2", "3"]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const Name = ({ image, name, email }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar src={image} name={name} size="sm" />
            <MDBox ml={2} lineHeight={1}>
                <MDTypography display="block" variant="button" fontWeight="medium">
                    {name}
                </MDTypography>
            </MDBox>
        </MDBox>
    );
    const [etDialog, setetDialog] = useState({
        open: false,
        fullWidth: false,
        maxWidth: "ld"
    });
    const Address = ({ description }) => (
        <MDBox lineHeight={1} textAlign="left">
            <MDTypography variant="caption">{description}</MDTypography>
        </MDBox>
    );
    var columns = [
        { Header: "Name", accessor: "Name", width: "10%", align: "left" },
        { Header: "mobileNo", accessor: "mobileNo", width: "10%", align: "left" },
        { Header: "status", accessor: "status", width: "10%", align: "center" },
        { Header: "gender", accessor: "gender", width: "10%", align: "center" },
        { Header: "Joining Date", accessor: "doj", width: "10%", align: "center" },
        { Header: "Update Details", accessor: "action", width: "10%", align: "center" },
    ]

    var rows = [];
    employeeDetails && employeeDetails.map((data, index) => {
        rows.push({
            Name: <Name image={team2} name={data.employeeName} />,
            mobileNo: <Address description={data.mobileNo} />,
            status: (
                <MDBox ml={-1}>
                    <MDBadge badgeContent={data.employeeStatus} color={data.employeeStatus === "Active" ? "success" : "error"} variant="gradient" size="sm" />
                </MDBox>
            ),
            gender: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {data.gender}
                </MDTypography>
            ),
            doj: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {data.createdDate}
                </MDTypography>
            ),
            action: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    Edit
                </MDTypography>
            ),
        })
    })


    const { columns: pColumns, rows: pRows } = projectsTableData();

    const createNewEmployee = () => {

    }
    useEffect(() => {
        fetchData()

    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://xkzd75f5kd.execute-api.ap-south-1.amazonaws.com/prod/user-management/vendor/fetch-all-employee/b9024a21-c8f9-42d0-a93a-cf8794da4d37', {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbi10b2tlbiIsInVzZXJUeXBlIjoiVkVORE9SIiwiaXNzIjoiUGFya2tleSIsInN1YiI6ImI5MDI0YTIxLWM4ZjktNDJkMC1hOTNhLWNmODc5NGRhNGQzNyIsImp0aSI6IjRmMTViNTIwLWUyNzktNGU5MS05ODUwLWI5OGFkMmU3MTU0MiIsImlhdCI6MTcxNTA1MDI0MiwiZXhwIjoyMDMwNDEwMjQyfQ.2Vamt4FXCMT25aZxwvAaOybzKYfCn18R3JIYahUp4tE"
                }
            });
            setemployeeDetails(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return (
        <>
            {etDialog && etDialog.open && <ETDialog
                open={etDialog.open}
                maxWidth={etDialog.maxWidth}
                fullWidth={etDialog.fullWidth}
                setetDialog={setetDialog}
                component={createNewEmployee()}
            />
            }
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Card>
                                <MDBox
                                    mx={2}
                                    mt={-3}
                                    py={3}
                                    px={2}
                                    variant="gradient"
                                    bgColor="info"
                                    borderRadius="lg"
                                    coloredShadow="info"
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <MDTypography variant="h6" color="white">
                                        Employees Details
                                    </MDTypography>
                                    <AddLocationIcon onClick={() => {
                                        setetDialog(prevState => ({
                                            ...prevState,
                                            open: true
                                        }))
                                    }}
                                        color="white" fontSize="large"
                                        sx={{
                                            '&:hover': {
                                                cursor: 'pointer',
                                            },
                                        }} />
                                </MDBox>
                                <MDBox pt={3}>
                                    {loading ?
                                        <CircularProgress /> :
                                        <DataTable
                                            table={{ columns, rows }}
                                            isSorted={false}
                                            entriesPerPage={false}
                                            showTotalEntries={false}
                                            noEndBorder
                                        />}
                                </MDBox>
                            </Card>
                        </Grid>

                    </Grid>
                </MDBox>
                <div style={{ position: "fixed", bottom: "0", width: "80%", zIndex: "100", marginBottom: "1%" }}>
                    <Footer />
                </div>
            </DashboardLayout>
        </>
    );
}


export default EmployeeTables