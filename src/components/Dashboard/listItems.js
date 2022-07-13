import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { useNavigate } from "react-router-dom";
import { brown } from "@mui/material/colors";
import { lime } from "@mui/material/colors";

const adminMain = [
  {
    title: "Dashboard",
    icon: <DashboardIcon sx={{ color: brown[500] }} />,
    path: "/",
  },
  {
    title: "Users",
    icon: <PeopleAltTwoToneIcon color="primary" />,
    path: "/viewUsers",
  },
  {
    title: "Reports",
    icon: <FileCopyIcon color="secondary" />,
    path: "/viewReports",
  },
  {
    title: "Notifications",
    icon: <NotificationsIcon color="error" />,
    path: "/viewNotifications",
  },
  {
    title: "Messages",
    icon: <MessageIcon color="warning" />,
    path: "/viewMessages",
  },
  {
    title: "Usage Analytics",
    icon: <DataUsageIcon color="success" />,
    path: "/usage-analytics",
  },
  {
    title: "Upload",
    icon: <UploadFileIcon sx={{ color: lime[700] }} />,
    path: "/viewUploads",
  },
];

const userMain = [
  {
    title: "Dashboard",
    icon: <DashboardIcon sx={{ color: brown[500] }} />,
    path: "/",
  },
  {
    title: "Users",
    icon: <PeopleAltTwoToneIcon color="primary" />,
    path: "/viewUsers",
  },
  {
    title: "Reports",
    icon: <FileCopyIcon color="secondary" />,
    path: "/viewReports",
  },
  {
    title: "Messages",
    icon: <MessageIcon color="warning" />,
    path: "/viewMessages",
  },
  {
    title: "Usage Analytics",
    icon: <DataUsageIcon color="success" />,
    path: "/usage-analytics",
  },
  {
    title: "Upload",
    icon: <UploadFileIcon sx={{ color: lime[700] }} />,
    path: "/viewUploads",
  },
];

const AdminListItems = () => {
  const admin = localStorage.getItem("admin");
  const navigate = useNavigate();
  return (
    <>
      {admin
        ? adminMain.map((item, index) => {
            return (
              <ListItem
                button
                key={index}
                disablePadding
                disableRipple
                disableGutters
                sx={{
                  paddingTop: 1,
                  paddingBottom: 1,
                  paddingLeft: 3,
                  paddingRight: 3,
                }}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            );
          })
        : userMain.map((item, index) => {
            return (
              <ListItem
                button
                key={index}
                disablePadding
                disableRipple
                disableGutters
                sx={{
                  paddingTop: 1,
                  paddingBottom: 1,
                  paddingLeft: 3,
                  paddingRight: 3,
                }}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            );
          })}
    </>
  );
};
export default AdminListItems;
