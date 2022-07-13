import React, { useEffect } from "react";
import { MenuItem, Button, FormControl, Grid } from "@mui/material";
import { InputLabel, Select, Typography, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box } from "@mui/system";
import { EmployeeAPI, GeneralAPI, TenantAPI } from "../../../api";
import { UserAPI } from "../../../api";
import BaseDialog from "../../utils/BaseDialog/BaseDialog";
import moment from "moment";

const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
let user, admin;
user = JSON.parse(localStorage.getItem("user"));
admin = JSON.parse(localStorage.getItem("admin"));

const initialValues = {
  name: "",
  email: "",
  address: "",
  phone: "",
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Name should be characters")
    .max(30)
    .required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required."),
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
});

function EditUser({ edit, getUsers, editOpen, setEditOpen }) {
  console.log(edit);
  const [editDialog, setEditDialog] = React.useState(false);

  useEffect(() => {
    if (editOpen) {
      setEditDialog(true);
      formik.setFieldValue("name", edit.name);
      formik.setFieldValue("email", edit.email);
      formik.setFieldValue("address", edit.address);
      formik.setFieldValue("phone", edit.phone);
    }
  }, [editOpen]);

  const onSubmit = (values, { resetForm }) => {
    console.log("submiting...", user, admin);
    UserAPI.updateUser(edit._id, values).then((res) => {
      if (user) {
        getUsers(user?.response?.admin_Id);
      } else {
        getUsers(admin?.response?._id);
      }
      resetForm();
    });
    setEditDialog(false);
    setEditOpen(false);
  };

  const onHandleClose = () => {
    setEditDialog(false);
    setEditOpen(false);
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <BaseDialog
        title={"Edit User"}
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
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              placeholder="Full Name"
              variant="standard"
              formik={formik}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              placeholder="Email"
              variant="standard"
              formik={formik}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              name="address"
              label="Address"
              placeholder="Address"
              variant="standard"
              formik={formik}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              name="phone"
              label="Phone Number"
              placeholder="Phone Number"
              variant="standard"
              formik={formik}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>

          <Grid item sm={6} xs={12} paddingTop={2}>
            <Button color="success" variant="contained" type="submit">
              Update
            </Button>
          </Grid>
        </Grid>
        {/* </Box> */}
      </BaseDialog>
    </>
  );
}

export default EditUser;
