import React from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  IconButton,
  Chip,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import dashboard from "../../../assets/images/dashboard2.PNG";
import ModalImage from "react-modal-image";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { DashboardAPI, UserAPI } from "../../../api";
import AddDashboard from "./AddDashboard";
import { AuthContext } from "../../../store/AuthContext";

const baseURL = "http://localhost:4000";

let admin, user;

const Dashboard = () => {
  // const { user, admin } = React.useContext(AuthContext);
  // console.log(user, admin, "state");
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [userState, setUserState] = React.useState();
  const [adminState, setAdminState] = React.useState();
  const pdfExportComponent = React.useRef(null);
  const [isActive, setActive] = React.useState(false);

  const getDashboardUser = (id) => {
    setActive(true);
    DashboardAPI.getDashboards(id).then((res) => {
      setData(res?.data?.data);
      setActive(false);
    });
  };

  const getDashboardAdmin = (id) => {
    setActive(true);
    DashboardAPI.getDashboards(id).then((res) => {
      setData(res?.data?.data);
      console.log(res?.data?.data, "dashboards");
      setActive(false);
    });
  };

  // const handleDashboardClick = () => {
  //   navigate("/dummyDashboard");
  // };

  React.useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      setAdminState(admin);
      getDashboardAdmin(admin?.response?._id);
    } else {
      setUserState(user);
      getDashboardUser(user?.response?.admin_Id?._id);
    }
  }, []);

  const handleTableauClick = (item) => {
    if (userState) {
      UserAPI.updateLastView(userState?.response?._id, item).then((res) => {
        console.log(res);
      });
    }
    DashboardAPI.generateToken().then((res) => {
      // console.log(res?.token);
      navigate(`/dashboard`, {
        state: {
          link: item?.link,
          token: res?.token,
        },
      });
    });
  };

  const deleteDashboard = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(adminState?.response?._id, id);
        DashboardAPI.deleteDashboard(adminState?.response?._id, id).then(
          (res) => {
            console.log(res);
            getDashboardAdmin(adminState?.response?._id);
          }
        );
      }
    });
  };

  const addDashboard = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to add new dashboard!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        DashboardAPI.addDashboard(adminState?.response?._id).then((res) => {
          console.log(res);
          getDashboardAdmin(adminState?.response?._id);
        });
      }
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{ fontWeight: "bolder", fontSize: { xs: 20, sm: 25 }, pb: 2 }}
        >
          Dashboards
        </Typography>
        <AddDashboard
          open={open}
          setOpen={setOpen}
          getDashboards={getDashboardAdmin}
        />
        {adminState ? (
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginBottom: 2 }}
            onClick={() => setOpen(true)}
            size="small"
          >
            Add dashboard
          </Button>
        ) : null}
      </Box>
      <Box
        sx={{
          background: "white",
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: { xs: 2, sm: 2 },
          borderRadius: 5,
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        }}
      >
        <Grid
          container
          xs={12}
          spacing={3}
          justifyContent="center"
          alignItems="center"
          align="center"
        >
          {/* <Grid item xs={12} sm={6} md={5} lg={4}>
            <Box
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                borderRadius: 3,
              }}
            >
              <Box
                component="img"
                src={dashboard}
                onClick={() => handleDashboardClick()}
                height="100%"
                width="100%"
                sx={{ borderRadius: 3, cursor: "pointer" }}
                // height={{ lg: 220, md: 190, sm: 160, xs: 130 }}
                // width={{ lg: 390, md: 350, sm: 310, xs: 270 }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{ color: "gray", mt: 1.5, fontWeight: "bold" }}
            >
              Dummy
            </Typography>
          </Grid> */}
          {isActive ? (
            <Box
              marginTop={2}
              display="flex"
              justifyContent="center"
              alignItem="center"
            >
              <CircularProgress />
            </Box>
          ) : data?.length > 0 ? (
            data?.map((item) => {
              {
                console.log(item, "item");
              }
              return (
                <Grid item xs={12} sm={6} md={5} lg={4}>
                  <Box
                    position="relative"
                    sx={{
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      borderRadius: 3,
                    }}
                  >
                    {adminState ? (
                      <IconButton
                        sx={{
                          position: "absolute",
                          right: 2,
                          top: 2,
                          background: "white",
                          "&:hover": { background: "#E5E4E2" },
                        }}
                        onClick={() => deleteDashboard(item._id)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    ) : null}
                    <Box
                      component="img"
                      src={item?.image}
                      onClick={() => handleTableauClick(item)}
                      sx={{
                        borderRadius: 3,
                        cursor: "pointer",
                        objectFit: "cover",
                        height: "150px",
                        width: "100%",
                      }}
                      // height={{ lg: 220, md: 190, sm: 160, xs: 130 }}
                      // width={{ lg: 390, md: 350, sm: 310, xs: 270 }}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ color: "gray", mt: 1.5, fontWeight: "bold" }}
                  >
                    {item.name}
                  </Typography>
                </Grid>
              );
            })
          ) : (
            <Box mt={2}>
              <h3 align="center">No Dashboard Available</h3>
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
