import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
// import SettingsIcon from "@mui/icons-material/Settings";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Menu from "@mui/material/Menu";
import HomeIcon from "@material-ui/icons/Home";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
import PersonPinSharpIcon from "@material-ui/icons/PersonPinSharp";
import WorkOutlineSharpIcon from "@material-ui/icons/WorkOutlineSharp";
import AssignmentSharpIcon from "@material-ui/icons/AssignmentSharp";

//desktop
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
//employes
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
// projets
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
//attendence
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
//client
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";

import PasswordIcon from "@mui/icons-material/Password";

import MenuItem from "@mui/material/MenuItem";

import LogoutIcon from "@mui/icons-material/Logout";

import UploadFileIcon from "@mui/icons-material/UploadFile";

import Badge from "@mui/material/Badge";

import ListItemsDashboard from "../../Dashboard/listItems";

import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import profile from "../../../assets/images/dummyProfile.png";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import { brown } from "@mui/material/colors";

import iconImg from "../../../assets/images/iconImg.png";
import logoImg from "../../../assets/images/logoImg.png";
import { lime } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid #44b700",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(1.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(3.4)",
      opacity: 0,
    },
  },
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  //flexShrink: 0,
  //whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const adminIcons = [
  {
    icon: <DashboardIcon sx={{ color: brown[500] }} />,
  },
  {
    icon: <PeopleAltTwoToneIcon color="primary" />,
  },
  {
    icon: <FileCopyIcon color="secondary" />,
  },
  {
    icon: <NotificationsIcon color="error" />,
  },
  {
    icon: <MessageIcon color="warning" />,
  },
  {
    icon: <DataUsageIcon color="success" />,
  },
  { icon: <UploadFileIcon sx={{ color: lime[700] }} /> },
];

const userIcons = [
  {
    icon: <DashboardIcon sx={{ color: brown[500] }} />,
  },
  {
    icon: <PeopleAltTwoToneIcon color="primary" />,
  },
  {
    icon: <FileCopyIcon color="secondary" />,
  },
  {
    icon: <MessageIcon color="warning" />,
  },
  {
    icon: <DataUsageIcon color="success" />,
  },
  { icon: <UploadFileIcon sx={{ color: lime[700] }} /> },
];

const mdTheme = createTheme();

let admin, user, personName;
admin = localStorage.getItem("admin");
user = localStorage.getItem("user");

export default function MiniDrawer({ children }) {
  // const [person, setPerson] = React.useState();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [itemIndex, setItemIndex] = React.useState();
  const [openCategory, setOpenCategory] = React.useState(false);
  const [btnClick, setBtnClick] = React.useState(false);
  const navigate = useNavigate();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState();
  const [admin, setAdmin] = React.useState();

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setAdmin(JSON.parse(localStorage.getItem("admin")));
  }, []);

  const handleDrawerOpen = () => {
    if (btnClick === false) setOpen(true);
  };

  const handleDrawerClose = () => {
    if (btnClick === false) setOpen(false);
  };

  const handleDrawer = () => {
    setOpen((open) => !open);
    setBtnClick((btnClick) => !btnClick);
  };

  const onItemClick = (i) => {
    setItemIndex(i);
    setOpenCategory((openCategory) => !openCategory);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {!matches ? (
          <>
            <AppBar>
              <Toolbar
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "#728FCE",
                }}
              >
                <IconButton
                  onClick={handleDrawer}
                  sx={{ paddingRight: 0, paddingLeft: "20px" }}
                  color="inherit"
                >
                  <MenuIcon
                    style={{
                      width: "1.2em",
                      height: "2em",
                    }}
                  />
                </IconButton>

                {/* <Typography variant="h6" noWrap component="div">
            Mini variant drawer hhhhhhhh jekkjewjkekjew hdhfhfjdhjhd
          </Typography> */}
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar alt="Remy Sharp" src={profile} />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{ mt: 3.5 }}
                  >
                    <MenuItem>
                      <AccountCircleIcon sx={{ mr: 1 }} />
                      {user ? user?.response?.name : admin?.response?.name}
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </Toolbar>
            </AppBar>
            <SwipeableDrawer
              anchor="left"
              open={open}
              position="sticky"
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
            >
              <div
                onClick={() => setOpen(false)}
                onKeyPress={() => setOpen(false)}
                role="button"
                tabIndex={0}
              >
                <IconButton sx={{ pt: 2, pb: 2, ml: -1 }}>
                  <ChevronRightIcon sx={{ width: "2em" }} />
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItemsDashboard />
              </List>
            </SwipeableDrawer>
          </>
        ) : (
          <>
            <AppBar open={open}>
              <Toolbar
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "#728FCE",
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawer}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
                <Box
                  display={"flex"}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    component="img"
                    src={logoImg}
                    alt="user"
                    width={36}
                    height={46}
                    borderRadius={2.8}
                    marginRight={0.7}
                  />
                  <Typography variant="h5"> M-LiNT </Typography>
                </Box>
                {/* <Typography variant="h6" noWrap component="div">
            Mini variant drawer hhhhhhhh jekkjewjkekjew hdhfhfjdhjhd
          </Typography> */}
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar alt="Remy Sharp" src={profile} />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{ mt: 3.5 }}
                  >
                    <MenuItem>
                      <AccountCircleIcon sx={{ mr: 1 }} />
                      {user ? user?.response?.name : admin?.response?.name}
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              open={open}
              onMouseEnter={handleDrawerOpen}
              onMouseLeave={handleDrawerClose}
            >
              <DrawerHeader
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  paddingTop: 1,
                }}
              >
                {open && (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Box
                      component="img"
                      src={logoImg}
                      alt="user"
                      width={85}
                      height={85}
                      borderRadius={2}
                    />
                    <Typography
                      variant="subtitle2"
                      fontWeight={"bold"}
                      paddingTop={1}
                      sx={{ fontSize: "22px" }}
                    >
                      M-LiNT INSIGHTS
                    </Typography>
                  </Box>
                )}
              </DrawerHeader>
              <Divider />
              <Box>
                {open ? (
                  <>
                    <List>
                      <ListItemsDashboard />
                    </List>
                  </>
                ) : (
                  <List>
                    {admin
                      ? adminIcons.map((item, index) => (
                          <>
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
                              }}
                            >
                              <ListItemIcon>{item.icon}</ListItemIcon>
                            </ListItem>
                          </>
                        ))
                      : userIcons.map((item, index) => (
                          <>
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
                              }}
                            >
                              <ListItemIcon>{item.icon}</ListItemIcon>
                            </ListItem>
                          </>
                        ))}
                  </List>
                )}
              </Box>
            </Drawer>
          </>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
