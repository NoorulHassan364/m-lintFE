import React, { useEffect } from "react";
import { MenuItem, Button, FormControl, Grid } from "@mui/material";
import {
  InputLabel,
  Select,
  Typography,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box } from "@mui/system";
import { EmployeeAPI, GeneralAPI, TenantAPI, DashboardAPI } from "../../../api";
import { ReportAPI } from "../../../api";
import BaseDialog from "../../utils/BaseDialog/BaseDialog";
import moment from "moment";

let user, admin;
user = JSON.parse(localStorage.getItem("user"));
admin = JSON.parse(localStorage.getItem("admin"));

const initialValues = {
  title: "",
  description: "",
  dashboardId: "",
  viewImage: "",
};

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required."),
  dashboardId: yup.string().required("Dashboard is required"),
  viewImage: yup.mixed(),
});

function EditReport({ edit, getReports, editOpen, setEditOpen }) {
  console.log(edit);
  const [editDialog, setEditDialog] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dashboardViews, setDashboardViews] = React.useState([]);

  const onHandleClose = () => {
    setEditOpen(false);
    setEditDialog(false);
  };

  const onSubmit = (values, { resetForm }) => {
    console.log("submiting...", user, admin);
    ReportAPI.updateReport(edit._id, values).then((res) => {
      if (user) {
        getReports(user?.response?.admin_Id);
      } else {
        getReports(admin?.response?._id);
      }
      resetForm();
    });
    setEditDialog(false);
    setEditOpen(false);
  };

  const getDashboards = () => {
    DashboardAPI.getDashboards(admin?.response?._id).then((res) => {
      setData(res?.data?.data);
    });
  };

  const handle_selected_dashboard = (id) => {
    DashboardAPI.getSelectedDashboard(id).then((res) => {
      setDashboardViews(res?.data?.data?.imgArray);
    });
  };

  useEffect(() => {
    if (editOpen) {
      setEditDialog(true);
      formik.setFieldValue("title", edit.title);
      formik.setFieldValue("description", edit.description);
      formik.setFieldValue("dashboardId", edit.dashboardId);
      getDashboards();
    }
  }, [editOpen]);

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <BaseDialog
        title={"Edit Report"}
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
                {data.map((item) => {
                  return <MenuItem value={item?._id}>{item?.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
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

export default EditReport;
