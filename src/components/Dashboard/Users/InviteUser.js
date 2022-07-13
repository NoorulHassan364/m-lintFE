import React, { useEffect } from "react";
import { MenuItem, Button, FormControl, Grid } from "@mui/material";
import { InputLabel, Select, Typography, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box } from "@mui/system";
import { UserAPI } from "../../../api";
import BaseDialog from "../../utils/BaseDialog/BaseDialog";
import LoadingSpinner from "../../Spinner/LoadingSpinner";

const initialValues = {
  email: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required."),
});

function InviteUser({ open, getUsers, setOpen }) {
  const [inviteDialog, setInviteDialog] = React.useState(false);
  const [isActive, setActive] = React.useState(false);

  const onSubmit = (values, { resetForm }) => {
    setActive(true);
    setInviteDialog(false);
    const admin = JSON.parse(localStorage.getItem("admin"));
    UserAPI.sendInvitation(values, admin?.response?._id).then((response) => {
      console.log(response);
      setActive(false);
      setOpen(false);
      resetForm();
    });
  };

  useEffect(() => {
    if (open) {
      setInviteDialog(true);
    }
  }, [open]);

  const onHandleClose = () => {
    setInviteDialog(false);
    setOpen(false);
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <LoadingSpinner active={isActive} />
      <BaseDialog
        title={"Invite a User"}
        open={inviteDialog}
        close={onHandleClose}
        width={"sm"}
      >
        <Grid
          container
          component={"form"}
          s
          onSubmit={formik.handleSubmit}
          spacing={3}
        >
          <Grid item md={12}>
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

          <Grid item md={12} paddingTop={2}>
            <Button color="success" variant="contained" type="submit">
              Send
            </Button>
          </Grid>
        </Grid>
        {/* </Box> */}
      </BaseDialog>
    </>
  );
}

export default InviteUser;
