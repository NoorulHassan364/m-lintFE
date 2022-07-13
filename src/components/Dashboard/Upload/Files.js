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
  Stack,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddFolder from "./AddFolder";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import { useFormik } from "formik";
import { useTheme } from "@mui/material/styles";
import Swal from "sweetalert2";
import { FolderAPI } from "../../../api";
import EditFolder from "./EditFolder";
import FileInput from "../../utils/FileInput/FileInput";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import "./file.scss";
import { useParams } from "react-router-dom";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import LoadingSpinner from "../../Spinner/LoadingSpinner";

const initialValues = {
  file: [],
};

const validationSchema = yup.object().shape({
  file: yup.mixed().required("File is required."),
});

const Index = () => {
  const theme = useTheme();
  const [editOpen, setEditOpen] = React.useState(false);
  const [edit, setEdit] = React.useState();
  const [userState, setUserState] = React.useState();
  const [adminState, setAdminState] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [isActive, setActive] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { id } = useParams();

  const getAllFiles = async (id) => {
    FolderAPI.getFiles(id).then((res) => {
      console.log(res?.data?.data);
      setData(res?.data?.data?.files);
    });
  };

  React.useEffect(() => {
    if (id) {
      getAllFiles(id);
    }
  }, []);

  const onSubmit = (values, { resetForm }) => {
    setActive(true);
    const formData = new FormData();
    console.log(selectedFile, formData, "select");
    formData.append("file", selectedFile);
    FolderAPI.uploadFile(id, formData).then((res) => {
      if (res?.status === 201) {
        resetForm();
        getAllFiles(id);
        setSelectedFile("");
      }
      setActive(false);
    });
  };

  const handleUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // const deleteFolder = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       FolderAPI.deleteFolder(id).then((res) => {
  //         // console.log(res);
  //         getFolders(res?.data?.admin_Id);
  //       });
  //     }
  //   });
  // };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <LoadingSpinner active={isActive} />
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ fontWeight: "bolder", fontSize: 25, pb: 2 }}>
          Upload File
        </Typography>
      </Box>
      <Box component={"form"} onSubmit={formik.handleSubmit}>
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
            alignItems="center"
          >
            <Grid item xs={12} sm={4}>
              <Box
                component="label"
                for="avatar"
                sx={{
                  background: "#659EC7",
                  color: "white",
                  padding: 1.4,
                  margin: 1,
                  borderRadius: 10,
                  cursor: "pointer",
                  border: "1px solid white",
                  display: "flex",
                  justifyContent: "center",
                  alignItem: "center",
                }}
              >
                <FileUploadIcon />
                <Typography>Select File</Typography>
              </Box>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="input"
                  name="file"
                  type="file"
                  // formik={formik}
                  // vaule={formik.values.file}
                  onChange={handleUpload}
                  id="avatar"
                  accept=".docx, .pdf"
                  sx={{
                    align: "center",
                    paddingTop: 2,
                    paddingBottom: 2,
                    width: "7rem",
                    "::-webkit-file-upload-button": {
                      display: "none",
                    },
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {selectedFile && (
                  <Button type="submit" variant="contained">
                    save
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>

          {/* <FileInput formik={formik} name="file" label="Upload File" /> */}
        </Box>
      </Box>
      <Typography sx={{ fontWeight: "bolder", fontSize: 25, pt: 2 }}>
        Files
      </Typography>
      <Box
        sx={{
          background: "white",
          marginTop: 2,
          padding: matches ? 3 : 1,
          borderRadius: 2,
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        }}
      >
        <Grid container spacing={4} justifyContent="center" alignItem="center">
          {data.length > 0 ? (
            data?.map((item) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={2}
                  justifyContent="center"
                  alignItem="center"
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "white",
                      borderRadius: 2,
                      padding: 2,
                      boxShadow:
                        "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FileOpenIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Typography sx={{ marginTop: 1 }}>{item?.name}</Typography>
                    <IconButton>
                      <a href={item.path}>
                        <DownloadIcon color="info" />
                      </a>
                    </IconButton>
                  </Box>
                </Grid>
              );
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
              }}
            >
              <Typography sx={{ fontWeight: "bold", pt: 4 }}>
                No Files Available
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Index;
