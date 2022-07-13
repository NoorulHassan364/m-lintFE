import React from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  CircularProgress,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddFolder from "./AddFolder";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Swal from "sweetalert2";
import { FolderAPI } from "../../../api";
import EditFolder from "./EditFolder";
import FolderPassword from "./FolderPassword";

const Index = () => {
  const theme = useTheme();
  const [editOpen, setEditOpen] = React.useState(false);
  const [edit, setEdit] = React.useState();
  const [userState, setUserState] = React.useState();
  const [adminState, setAdminState] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [folderId, setFolderId] = React.useState();
  const [isActive, setActive] = React.useState(false);

  const [secondary, setSecondary] = React.useState(false);
  const [data, setData] = React.useState([]);
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const getFolders = (id) => {
    setActive(true);
    FolderAPI.getFolder(id).then((res) => {
      console.log(res?.data?.data);
      setData(res?.data?.data);
      setActive(false);
    });
  };

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin && admin !== undefined) {
      console.log(admin);
      getFolders(admin?.response?._id);
      setAdminState(admin);
    } else {
      setUserState(user);
      getFolders(user?.response?.admin_Id?._id);
    }
  }, []);

  const deleteFolder = (id) => {
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
        FolderAPI.deleteFolder(id).then((res) => {
          // console.log(res);
          getFolders(res?.data?.admin_Id);
        });
      }
    });
  };

  const doSomething = (item) => {
    console.log(item._id);
    setFolderId(item?._id);
    setOpen1(true);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ fontWeight: "bolder", fontSize: 25, pb: 2 }}>
          Folders
        </Typography>
        <Box>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Make Folder
          </Button>
          <AddFolder open={open} getFolders={getFolders} setOpen={setOpen} />
          <FolderPassword open={open1} setOpen={setOpen1} folderId={folderId} />
          <EditFolder
            edit={edit}
            getFolders={getFolders}
            editOpen={editOpen}
            setEditOpen={setEditOpen}
          />
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            background: "white",
            padding: matches ? 3 : 1,
            borderRadius: 2,
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItem="center"
          >
            {isActive ? (
              <CircularProgress />
            ) : data?.length > 0 ? (
              data?.map((item) => {
                return (
                  <Grid item xs={12} md={6} lg={4}>
                    {adminState ? (
                      <ListItem
                        secondaryAction={
                          <>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              sx={{
                                marginRight: matches ? 0.5 : null,
                                boxShadow: matches
                                  ? "rgba(0, 0, 0, 0.24) 0px 3px 8px;"
                                  : null,
                              }}
                              onClick={(e) => {
                                deleteFolder(item._id);
                                e.stopPropagation();
                              }}
                            >
                              <DeleteIcon
                                color="error"
                                fontSize={!matches ? "small" : "medium"}
                              />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              sx={{
                                marginRight: matches ? 0.5 : null,
                                boxShadow: matches
                                  ? "rgba(0, 0, 0, 0.24) 0px 3px 8px;"
                                  : null,
                              }}
                              onClick={(e) => {
                                setEdit(item);
                                setEditOpen(true);
                                e.stopPropagation();
                              }}
                            >
                              <EditIcon
                                fontSize={!matches ? "small" : "medium"}
                              />
                            </IconButton>
                          </>
                        }
                        sx={{
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
                          borderRadius: 2,
                          padding: matches ? 2 : 1,
                          cursor: "pointer",
                        }}
                        onClick={() => doSomething(item)}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primaryTypographyProps={{
                            fontWeight: "bold",
                            color: "primary",
                          }}
                        >
                          {item.name}
                        </ListItemText>
                      </ListItem>
                    ) : userState &&
                      userState?.response?._id == item.user_Id ? (
                      <>
                        {console.log(userState, "userState")}
                        <ListItem
                          secondaryAction={
                            <>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                sx={{
                                  marginRight: matches ? 0.5 : null,
                                  boxShadow: matches
                                    ? "rgba(0, 0, 0, 0.24) 0px 3px 8px;"
                                    : null,
                                }}
                                onClick={(e) => {
                                  deleteFolder(item._id);
                                  e.stopPropagation();
                                }}
                              >
                                <DeleteIcon
                                  color="error"
                                  fontSize={!matches ? "small" : "medium"}
                                />
                              </IconButton>
                              <IconButton
                                edge="end"
                                aria-label="edit"
                                sx={{
                                  marginRight: matches ? 0.5 : null,
                                  boxShadow: matches
                                    ? "rgba(0, 0, 0, 0.24) 0px 3px 8px;"
                                    : null,
                                }}
                                onClick={(e) => {
                                  setEdit(item);
                                  setEditOpen(true);
                                  e.stopPropagation();
                                }}
                              >
                                <EditIcon
                                  fontSize={!matches ? "small" : "medium"}
                                />
                              </IconButton>
                            </>
                          }
                          sx={{
                            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
                            borderRadius: 2,
                            padding: matches ? 2 : 1,
                            cursor: "pointer",
                          }}
                          onClick={() => doSomething(item)}
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <FolderIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primaryTypographyProps={{
                              fontWeight: "bold",
                              color: "primary",
                            }}
                          >
                            {item.name}
                          </ListItemText>
                        </ListItem>
                      </>
                    ) : (
                      <ListItem
                        sx={{
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
                          borderRadius: 2,
                          padding: matches ? 2 : 1,
                          cursor: "pointer",
                        }}
                        onClick={() => doSomething(item)}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primaryTypographyProps={{
                            fontWeight: "bold",
                            color: "primary",
                          }}
                        >
                          {item.name}
                        </ListItemText>
                      </ListItem>
                    )}
                  </Grid>
                );
              })
            ) : (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{ align: "center", textAlign: "center" }}
                >
                  No Folder Found!
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Index;
