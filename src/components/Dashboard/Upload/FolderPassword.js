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
import { ReportAPI } from "../../../api";
import BaseDialog from "../../utils/BaseDialog/BaseDialog";
import moment from "moment";
import { useNavigate } from "react-router-dom";

let user, admin;
user = JSON.parse(localStorage.getItem("user"));
admin = JSON.parse(localStorage.getItem("admin"));

const initialValues = {
  password: "",
};

const validationSchema = yup.object().shape({
  password: yup.string().required("password is required"),
});

function FolderPassword({ open, setOpen, folderId }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isActive, setActive] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(folderId);
    if (open) {
      setOpenDialog(true);
    }
  }, [open]);

  const onHandleClose = () => {
    setOpenDialog(false);
    setOpen(false);
  };

  const onSubmit = (values, { resetForm }) => {
    setActive(true);
    FolderAPI.getFolderById(values, folderId).then((res) => {
      if (res?.status === 200) {
        resetForm();
        setOpenDialog(false);
        setOpen(false);
        console.log(res);
        navigate(`/uploadFiles/${folderId}`);
      }
      setActive(false);
    });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <BaseDialog
        title={"Folder Password"}
        open={openDialog}
        width={"md"}
        close={onHandleClose}
      >
        <Grid container component={"form"} onSubmit={formik.handleSubmit}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="password"
              type="password"
              label="Password"
              placeholder="Enter Folder Password"
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
              <Button variant="contained" type="submit">
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
        {/* </Box> */}
      </BaseDialog>
    </>
  );
}

export default FolderPassword;
