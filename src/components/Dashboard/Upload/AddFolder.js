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
import { FolderAPI } from "../../../api";
import BaseDialog from "../../utils/BaseDialog/BaseDialog";
import moment from "moment";

let user, admin;

const initialValues = {
  name: "",
  password: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  password: yup.string().required("password is required."),
});

function AddFolder({ open, getFolders, setOpen }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [adminState, setAdminState] = React.useState(false);
  const [userState, setUserState] = React.useState(false);
  const [isActive, setActive] = React.useState(false);

  const onSubmit = (values, { resetForm }) => {
    setActive(true);
    const id = adminState
      ? adminState?.response?._id
      : userState?.response?._id;
    const admin_Id = adminState
      ? adminState?.response?._id
      : userState?.response?.admin_Id;
    console.log(id, "id", admin_Id, "admin_ID");
    FolderAPI.addFolder(admin_Id, values).then((res) => {
      if (res.status === 201) {
        setOpen(false);
        setOpenDialog(false);
        resetForm();
        getFolders(admin_Id);
      }
      setActive(false);
    });
  };

  const onHandleClose = () => {
    setOpenDialog(false);
    setOpen(false);
  };

  React.useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    admin = JSON.parse(localStorage.getItem("admin"));
    if (open) {
      setOpenDialog(open);
    }
    if (user) {
      formik.setFieldValue("user_Id", user?.response?._id);
      setUserState(user);
    } else {
      formik.setFieldValue("user_Id", admin?.response?._id);
      setAdminState(admin);
    }
  }, [open]);

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <BaseDialog
        title={"Create Folder"}
        open={openDialog}
        width={"md"}
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
              placeholder="Name"
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
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              variant="standard"
              formik={formik}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
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
        {/* </Box> */}
      </BaseDialog>
    </>
  );
}

export default AddFolder;
