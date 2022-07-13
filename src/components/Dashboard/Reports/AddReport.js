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
// import { EmployeeAPI, GeneralAPI, TenantAPI } from "../../../api";
import { ReportAPI, DashboardAPI } from "../../../api";
import BaseDialog from "../../utils/BaseDialog/BaseDialog";
import FileInput from "../../utils/FileInput/FileInput";
import { FormHelperText } from "@mui/material";
import moment from "moment";
import LoadingSpinner from "../../Spinner/LoadingSpinner";

let admin, user;

const initialValues = {
  title: "",
  description: "",
  dashboardId: "",
  viewImage: "",
};

const validationSchema = yup.object().shape({
  title: yup.string().max(20).required("Name is required"),
  description: yup.string().max(250).required("description is required."),
  dashboardId: yup.string().required("dashboard is required."),
  viewImage: yup.string(),
});

function AddReport({ open, getReports, setOpen }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isActive, setActive] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dashboardViews, setDashboardViews] = React.useState([]);

  const onSubmit = (values, { resetForm }) => {
    setActive(true);
    const id = admin ? admin?.response?._id : user?.response?.admin_Id._id;

    ReportAPI.addReport(id, values).then((res) => {
      console.log(res);
      resetForm();
      getReports(id);
      setActive(false);
      setOpen(false);
      setOpenDialog(false);
    });
  };

  const onHandleClose = () => {
    setOpenDialog(false);
    setOpen(false);
  };

  const getDashboards = (id) => {
    DashboardAPI.getDashboards(id).then((res) => {
      setData(res?.data?.data);
    });
  };

  const handle_selected_dashboard = (id) => {
    DashboardAPI.getSelectedDashboard(id).then((res) => {
      setDashboardViews(res?.data?.data?.imgArray);
    });
  };

  React.useEffect(() => {
    admin = JSON.parse(localStorage.getItem("admin"));
    user = JSON.parse(localStorage.getItem("user"));
    if (open && admin) {
      setOpenDialog(open);
      getDashboards(admin?.response?._id);
    }
    if (open && user) {
      setOpenDialog(open);
      getDashboards(user?.response?.admin_Id._id);
    }
  }, [open]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleWhitespace = (e) => {
    e.target.value = e.target.value.trim();
  };

  return (
    <>
      <BaseDialog
        title={"Create Report"}
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
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              placeholder="Title"
              variant="standard"
              formik={formik}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              name="description"
              label="Description"
              placeholder="Description"
              variant="standard"
              formik={formik}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel variant="body2" gutterBottom>
                Select Dashboard
              </InputLabel>
              <Select
                variant="standard"
                name="dashboardId"
                value={formik.values.dashboardId}
                onChange={(e) => {
                  formik.handleChange(e);
                  handle_selected_dashboard(e.target.value);
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.dashboardId &&
                  Boolean(formik.errors.dashboardId)
                }
                // helperText={formik.touched.gender && formik.errors.gender}
              >
                {data?.map((item) => {
                  return <MenuItem value={item?._id}>{item?.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
            {formik.touched.dashboardId && formik.errors.dashboardId && (
              <FormHelperText error>{formik.errors.dashboardId}</FormHelperText>
            )}
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel variant="body2" gutterBottom>
                Dashboard View
              </InputLabel>
              <Select
                variant="standard"
                name="viewImage"
                value={formik.values.viewImage}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.viewImage && Boolean(formik.errors.viewImage)
                }
                // helperText={formik.touched.gender && formik.errors.gender}
              >
                {dashboardViews.map((item) => {
                  return (
                    <MenuItem value={item?.image}>
                      <img
                        src={item?.image}
                        width="100%"
                        height="60px"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        }}
                      />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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

export default AddReport;
