import React, { useEffect } from "react";
import { MenuItem, Button, FormControl, Grid } from "@mui/material";
import {
  InputLabel,
  Select,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box } from "@mui/system";
import { DashboardAPI } from "../../../api";
import BaseDialog from "../../utils/BaseDialog/BaseDialog";
import FileInput from "../../utils/FileInput/FileInput";
import { FormHelperText } from "@mui/material";
// import Thumb from "./Thumb";
// import Dropzone from "react-dropzone";
import ImageUpload from "./ImageUpload";

let user, admin;

const initialValues = {
  name: "",
  link: "",
  image: "",
  images: "",
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .trim("whitespaces are not allowed")
    .strict(true)
    .required("Name is required"),
  link: yup.string().required("Link is required"),
  image: yup.mixed().required("Image is required."),
  images: yup.mixed(),
});

function AddDashboard({ open, getDashboards, setOpen }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [adminState, setAdminState] = React.useState(false);
  const [userState, setUserState] = React.useState(false);
  const [isActive, setActive] = React.useState(false);
  const [imgArray, setImgArray] = React.useState([]);

  const onSubmit = (values, { resetForm }) => {
    debugger;
    console.log(values?.images[0], "fileList", values?.images?.length);
    let img_array = [];
    for (let i = 0; i < values?.images.length; i++) {
      img_array.push(values?.images[i]);
    }

    setActive(true);
    const formData = new FormData();
    formData.append("link", values.link);
    formData.append("image", values.image);
    formData.append("name", values.name);
    // formData.append("images", img_array);
    DashboardAPI.addDashboard(adminState?.response?._id, formData).then(
      async (res) => {
        if (res?.status === 201) {
          debugger;
          await multipleImg({
            DashboardId: res?.data?.data?._id,
            images: img_array,
          });
          getDashboards(adminState?.response?._id);
          resetForm();
          setOpenDialog(false);
          setOpen(false);
        }
        setActive(false);
      }
    );
  };
  const multipleImg = (data) => {
    debugger;
    for (let i = 0; i < data.images.length; i++) {
      const formData = new FormData();
      formData.append("image", data.images[i]);
      DashboardAPI.addDashboardImages(data.DashboardId, formData).then(
        (res) => {}
      );
    }
  };

  const onHandleClose = () => {
    setOpenDialog(false);
    setOpen(false);
  };

  React.useEffect(() => {
    admin = JSON.parse(localStorage.getItem("admin"));
    if (open) {
      setOpenDialog(open);
      setAdminState(admin);
    }
  }, [open]);

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <BaseDialog
        title={"Create Dashboard"}
        open={openDialog}
        width={"sm"}
        close={onHandleClose}
      >
        <Grid
          mt={1}
          container
          component={"form"}
          onSubmit={formik.handleSubmit}
          spacing={3}
        >
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              placeholder="Enter Dashboard Name"
              variant="standard"
              formik={formik}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="link"
              label="Link"
              placeholder="Paste Link"
              variant="standard"
              formik={formik}
              value={formik.values.link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.link && Boolean(formik.errors.link)}
              helperText={formik.touched.link && formik.errors.link}
            />
          </Grid>
          <Grid item xs={12}>
            <FileInput
              formik={formik}
              name="image"
              label="Upload Image(default)"
            />
            {formik.touched.image && formik.errors.image && (
              <FormHelperText error>{formik.errors.image}</FormHelperText>
            )}
          </Grid>

          <Grid item xs={12}>
            <FileInput
              formik={formik}
              name="images"
              multiple={true}
              label="Upload Image(mutliple)"
            />

            {/* <input type="file" id="files" name="files" multiple onChange /> */}
            {/* <ImageUpload /> */}
            {/* <Dropzone
              style={{
                width: "100%",
                height: "auto",
                borderWidth: 2,
                borderColor: "rgb(102, 102, 102)",
                borderStyle: "dashed",
                borderRadius: 5,
              }}
              accept="image/*"
              onDrop={(acceptedFiles) => {
                // do nothing if no files
                if (acceptedFiles.length === 0) {
                  return;
                }

                // on drop we add to the existing files
                formik.setFieldValue(
                  "files",
                  formik?.values?.files.concat(acceptedFiles)
                );
              }}
            >
              {({
                isDragActive,
                isDragReject,
                acceptedFiles,
                rejectedFiles,
              }) => {
                if (isDragActive) {
                  return "This file is authorized";
                }

                if (isDragReject) {
                  return "This file is not authorized";
                }

                if (formik?.values?.files?.length === 0) {
                  return <p>Try dragging a file here!</p>;
                }

                return formik?.values?.files?.map((file, i) => (
                  <Thumb key={i} file={file} />
                ));
              }}
            </Dropzone> */}
          </Grid>

          <Grid item xs={12} paddingTop={2}>
            {isActive ? (
              <CircularProgress />
            ) : (
              <Button color="success" variant="contained" type="submit">
                Create
              </Button>
            )}
          </Grid>
        </Grid>
      </BaseDialog>
    </>
  );
}

export default AddDashboard;
