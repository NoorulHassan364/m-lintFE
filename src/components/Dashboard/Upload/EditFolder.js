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

let user, admin;
user = JSON.parse(localStorage.getItem("user"));
admin = JSON.parse(localStorage.getItem("admin"));

const initialValues = {
  name: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().max(20).required("Name is required"),
});

function EditFolder({ edit, getFolders, editOpen, setEditOpen }) {
  console.log(edit);
  const [editDialog, setEditDialog] = React.useState(false);
  const [isActive, setActive] = React.useState(false);

  useEffect(() => {
    console.log(edit);
    if (editOpen) {
      setEditDialog(true);
      formik.setFieldValue("name", edit.name);
    }
  }, [editOpen]);

  const onHandleClose = () => {
    setEditOpen(false);
    setEditDialog(false);
  };

  const onSubmit = (values, { resetForm }) => {
    setActive(true);
    // console.log("submiting...", user, admin);
    FolderAPI.updateFolder(edit._id, values).then((res) => {
      if (user) {
        getFolders(user?.response?.admin_Id);
      } else {
        getFolders(admin?.response?._id);
      }
      resetForm();
      setActive(false);
    });
    setEditDialog(false);
    setEditOpen(false);
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <BaseDialog
        title={"Edit Folder"}
        open={editDialog}
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

          <Grid item xs={12} paddingTop={2}>
            {isActive ? (
              <CircularProgress />
            ) : (
              <Button color="success" variant="contained" type="submit">
                Update
              </Button>
            )}
          </Grid>
        </Grid>
        {/* </Box> */}
      </BaseDialog>
    </>
  );
}

export default EditFolder;
