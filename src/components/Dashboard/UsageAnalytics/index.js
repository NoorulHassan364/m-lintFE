import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { UserAPI, DashboardAPI, ReportAPI } from "../../../api";
import {
  Button,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import BaseTable from "../../utils/table/BaseTable";
import moment from "moment";
import Range from "./Range";
import { format } from "date-fns";

let admin, user;

const columns = [
  { Header: "Name", accessor: "userId.name" },
  {
    Header: "Last View",
    accessor: (properties) =>
      properties?.lastView
        ? format(new Date(properties.lastView), "yyyy/MM/dd hh:mm:ss a")
        : "",
  },
  {
    Header: "Dashboard",
    accessor: "dashboardId.name",
  },
  {
    Header: "Total Views",
    accessor: "numberOfUse",
  },
  {
    Header: "Report (Downloads)",
    accessor: (properties) =>
      properties?.reportId
        ? properties?.reportId?.title + " [" + properties?.noOfDownloads + "]"
        : "",
  },
  {
    Header: "Last Login",
    accessor: "userId.lastLogin",
    Cell: ({ value }) =>
      value ? <ReactTimeAgo date={value} locale="en-US" /> : "not yet login",
  },
];

const Index = () => {
  console.log(format(new Date(), "yyyy/MM/dd"));
  console.log(
    format(new Date(), "yyyy/MM/dd") <
      format(new Date("2014-12-10"), "yyyy/MM/dd")
  );
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();
  const [reports, setReports] = React.useState([]);
  const [userState, setUserState] = React.useState();
  const [adminState, setAdminState] = React.useState();
  const [usage, setUsage] = React.useState([]);
  const [searchUsage, setSearchUsage] = React.useState([]);
  const [userFilter, setUserFilter] = React.useState([]);
  const [dateFilter, setDateFilter] = React.useState([]);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [isActive, setActive] = React.useState(false);

  const [no_of_dashboards, setNoOfDashboards] = React.useState();
  const [no_of_users, setNoOfUsers] = React.useState();
  const [no_of_reports, setNoOfReports] = React.useState();

  // const [q, setQ] = React.useState("");
  // const [searchParam] = React.useState(["last"]);

  const getUsers = (admin_Id) => {
    UserAPI.getUsers(admin_Id).then((res) => {
      setData(res?.data?.data);
      setNoOfUsers(res?.data?.data.length);
    });
  };

  const getDashboardAdmin = (id) => {
    DashboardAPI.getDashboards(id).then((res) => {
      console.log(res, "response");
      // setNumber(res?.data?.data?.length);
      setNoOfDashboards(res?.data?.data.length);
    });
  };

  const getReports = (admin_Id) => {
    ReportAPI.getReports(admin_Id).then((res) => {
      console.log(res);
      setReports(res?.data?.data);
      setNoOfReports(res?.data?.data.length);
    });
  };

  const getUsageAnalytics = (id) => {
    setActive(true);
    UserAPI.getUsageAnalytics(id).then((res) => {
      console.log(res);
      setUsage(res?.data?.data);
      setSearchUsage(res?.data?.data);
      setActive(false);
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "all") {
      getUsageAnalytics(admin?.response?._id);
    } else {
      let result = searchUsage?.filter((item) =>
        item?.userId?.name.toLowerCase().includes(value.toLowerCase())
      );
      setUsage(result);
      setUserFilter(result);
    }
  };

  const onHandleDate = (item) => {
    console.log(item);
    setStartDate(item[0]?.startDate);
    setEndDate(item[0]?.endDate);

    if (userFilter.length > 0) {
      const result = userFilter?.filter((obj) =>
        obj?.lastView
          ? format(new Date(obj?.lastView), "yyyy/MM/dd") >=
              format(new Date(item[0]?.startDate), "yyyy/MM/dd") &&
            format(new Date(obj?.lastView), "yyyy/MM/dd") <=
              format(new Date(item[0]?.endDate), "yyyy/MM/dd")
          : ""
      );
      setUsage(result);
      setDateFilter(result);
    } else {
      const result = searchUsage?.filter((obj) =>
        obj?.lastView
          ? format(new Date(obj?.lastView), "yyyy/MM/dd") >=
              format(new Date(item[0]?.startDate), "yyyy/MM/dd") &&
            format(new Date(obj?.lastView), "yyyy/MM/dd") <=
              format(new Date(item[0]?.endDate), "yyyy/MM/dd")
          : ""
      );
      setUsage(result);
      setDateFilter(result);
    }
  };

  const onHandleDialog = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    admin = JSON.parse(localStorage.getItem("admin"));
    getDashboardAdmin(
      admin ? admin?.response?._id : user?.response?.admin_Id?._id
    );
    getUsers(admin ? admin?.response?._id : user?.response?.admin_Id?._id);
    getReports(admin ? admin?.response?._id : user?.response?.admin_Id?._id);
    if (admin) {
      setAdminState(admin);
      getUsageAnalytics(admin?.response?._id);
    }
  }, []);

  return (
    <>
      <Box>
        <Typography sx={{ fontWeight: "bolder", fontSize: 25, pb: 2 }}>
          Usage Analytics
        </Typography>
        <Box
          sx={{
            background: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          }}
          spacing={2}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Stack
                sx={{
                  color: "white",
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg,#8e4cf1 0,#c554bc 100%) !important",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 3,
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                }}
              >
                <PeopleAltIcon fontSize="large" />
                <Typography variant="h6">No of Users</Typography>
                {no_of_users || no_of_users == 0 ? (
                  <Typography variant="h6">{no_of_users}</Typography>
                ) : (
                  <CircularProgress color="inherit" />
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack
                sx={{
                  color: "white",
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg,#2916df 0,#6495ED 100%) !important",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 3,
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                }}
              >
                <DashboardIcon fontSize="large" />
                <Typography variant="h6">No of Dashboards</Typography>
                {no_of_dashboards || no_of_dashboards == 0 ? (
                  <Typography variant="h6">{no_of_dashboards}</Typography>
                ) : (
                  <CircularProgress color="inherit" />
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack
                sx={{
                  color: "white",
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg,#008080 0,#66CDAA 100%) !important",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 3,
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                }}
              >
                <FileCopyIcon fontSize="large" />
                <Typography variant="h6">No of Reports</Typography>
                {no_of_reports || no_of_reports == 0 ? (
                  <Typography variant="h6">{no_of_reports}</Typography>
                ) : (
                  <CircularProgress color="inherit" />
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {adminState ? (
        <>
          <Typography sx={{ fontWeight: "bolder", fontSize: 25, pt: 2 }}>
            Users
          </Typography>
          <Box
            sx={{
              background: "white",
              marginTop: 2,
              padding: 3,
              borderRadius: 2,
              boxShadow:
                "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
          >
            <FormControl sx={{ width: "150px" }} size="small">
              <InputLabel id="demo-simple-select-label">User</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="User"
                onChange={handleChange}
              >
                <MenuItem key="all" value="all">
                  All
                </MenuItem>
                {data?.map((item) => (
                  <MenuItem key={item._id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={onHandleDialog}
              variant="outlined"
              sx={{ marginTop: { xs: 1, sm: 0 }, marginLeft: { xs: 0, sm: 1 } }}
            >
              Date Picker
            </Button>
            <Range open={open} setOpen={setOpen} onHandleDate={onHandleDate} />
            {isActive ? (
              <Box display={"flex"} justifyContent="center" alignItems="center">
                <CircularProgress />
              </Box>
            ) : (
              <BaseTable columns={columns} data={usage} />
            )}
          </Box>
        </>
      ) : null}
    </>
  );
};

export default Index;
