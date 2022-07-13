import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { UserAPI } from "../../../api";
import {
  Button,
  TextField,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import FormControl from "@mui/material/FormControl";

let admin, user;

const Index = () => {
  const [notifications, setNotification] = React.useState([]);
  const [value, setValue] = React.useState();
  const array = [
    { name: "All Notifications", value: 0 },
    { name: "last 24hours", value: 1 },
    { name: "last week", value: 7 },
  ];

  React.useEffect(() => {
    admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      UserAPI.getNotifications(admin?.response?._id, { days: 0 }).then(
        (res) => {
          console.log(res);
          setNotification(res?.data?.data?.notifications.reverse());
        }
      );
    }
    var days = 7; // Days you want to subtract
    var date = new Date();
    console.log(date, "current date");
    var last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
    console.log(last, "last week");
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
    const days = e.target.value;
    UserAPI.getNotifications(admin?.response?._id, { days }).then((res) => {
      console.log(res);
      if (days !== 0) {
        setNotification(res?.data?.data?.reverse());
      } else {
        setNotification(res?.data?.data?.notifications.reverse());
      }
    });
  };

  return (
    <Box>
      <Typography sx={{ fontWeight: "bolder", fontSize: 25, pb: 2 }}>
        Notifications
      </Typography>
      <Stack
        sx={{
          background: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        }}
        spacing={2}
      >
        <FormControl sx={{ maxWidth: 150 }} size="small">
          <InputLabel id="demo-simple-select-label">Date</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="user_id"
            value={value}
            label="Date"
            onChange={handleChange}
          >
            {array?.map((item) => (
              <MenuItem key={item.name} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {notifications?.length > 0 ? (
          notifications?.map((item, index) => {
            return (
              <>
                <Alert
                  severity="success"
                  sx={{
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    maxWidth: "350px",
                    overflowWrap: "break-word",
                    position: "relative",
                  }}
                >
                  <Box sx={{ justifyContent: "space-between" }}>
                    <span
                      style={{
                        color: "purple",
                        fontWeight: "bold",
                      }}
                    >
                      {item?.name}
                    </span>
                    <span
                      style={{
                        color: "gray",
                        position: "absolute",
                        right: 10,
                      }}
                    >
                      <ReactTimeAgo date={item?.createdAt} locale="en-US" />
                    </span>
                  </Box>
                  <Typography variant="body2">
                    Accept Your Invitation
                  </Typography>
                </Alert>
              </>
            );
          })
        ) : (
          <h3 align="center">No New Information Available!</h3>
        )}
      </Stack>
    </Box>
  );
};

export default Index;
