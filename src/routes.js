import Dashboard from "layouts/dashboard";
import ParkingTables from "layouts/tables/ParkingTables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import VendorTables from "layouts/tables/VendorTables";
// @mui icons
import Icon from "@mui/material/Icon";
import EmployeeTables from "layouts/tables/EmployeeTables";

const validatonID = localStorage.getItem("vendorID");
const adminID = localStorage.getItem("adminID");
const routes = [          
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    condition: true
  },
  {
    type: "collapse",
    name: "Employees",
    key: "Employees",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Employees",
    component: <EmployeeTables/>,
    condition: validatonID && !adminID
  },
  {
    type: "collapse",
    name: "Parkings",
    key: "Parkings",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Parkings",
    component: <ParkingTables />,
    condition: validatonID && !adminID
  },
  {
    type: "collapse",
    name: "Vendors",
    key: "Vendors",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Vendors",
    component: <VendorTables />,
    condition: !validatonID && adminID
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
    condition: true
  },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
    condition: true
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    condition: true
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
    condition: true
  },
];

const filteredRoutes = routes.filter(route => route.condition);
export default filteredRoutes;
