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
import { DateRange } from "react-date-range";
import moment from "moment";

function Range({ open, setOpen, onHandleDate }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [state, setState] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDate = (item) => {
    console.log(item, "data");
    setState([item.selection]);
  };

  const onHandleClose = () => {
    setOpen(false);
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    onHandleDate(state);
    setOpen(false);
    setOpenDialog(false);
  };

  useEffect(() => {
    if (open) {
      setOpenDialog(true);
    }
  }, [open]);

  return (
    <>
      <BaseDialog
        title={"Date Range"}
        open={openDialog}
        width={"md"}
        close={onHandleClose}
      >
        <Grid mt={1} container spacing={3}>
          <Grid item xs={12}>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => handleDate(item)}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </Grid>
          <Grid item xs={12} paddingTop={2}>
            <Button color="success" variant="contained" onClick={handleSubmit}>
              OK
            </Button>
          </Grid>
        </Grid>
        {/* </Box> */}
      </BaseDialog>
    </>
  );
}

export default Range;
