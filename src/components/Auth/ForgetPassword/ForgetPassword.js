import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate, Link, useParams } from "react-router-dom";
import { AuthAPI, UserAPI } from "../../../api";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import backImg from "../../../assets/images/backImg.svg";
import logoImg from "../../../assets/images/logoImg.png";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [isActive, setActive] = React.useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("email is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    setActive(true);
    AuthAPI.forgetPassword(values).then((res) => {
      console.log(res);
      if (res?.status == 200) {
        resetForm();
      }
      setActive(false);
    });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  return (
    <Box
      display={"flex"}
      align="center"
      justifyContent="center"
      height="100vh"
      alignItems="center"
      paddingTop={{ xs: 8, sm: 0 }}
      paddingBottom={{ xs: 8, sm: 0 }}
      sx={{
        backgroundImage:
          "radial-gradient(circle at 82% 60%, rgba(59, 59, 59,0.06) 0%, rgba(59, 59, 59,0.06) 69%,transparent 69%, transparent 100%),radial-gradient(circle at 36% 0%, rgba(185, 185, 185,0.06) 0%, rgba(185, 185, 185,0.06) 59%,transparent 59%, transparent 100%),radial-gradient(circle at 58% 82%, rgba(183, 183, 183,0.06) 0%, rgba(183, 183, 183,0.06) 17%,transparent 17%, transparent 100%),radial-gradient(circle at 71% 32%, rgba(19, 19, 19,0.06) 0%, rgba(19, 19, 19,0.06) 40%,transparent 40%, transparent 100%),radial-gradient(circle at 77% 5%, rgba(31, 31, 31,0.06) 0%, rgba(31, 31, 31,0.06) 52%,transparent 52%, transparent 100%),radial-gradient(circle at 96% 80%, rgba(11, 11, 11,0.06) 0%, rgba(11, 11, 11,0.06) 73%,transparent 73%, transparent 100%),radial-gradient(circle at 91% 59%, rgba(252, 252, 252,0.06) 0%, rgba(252, 252, 252,0.06) 44%,transparent 44%, transparent 100%),radial-gradient(circle at 52% 82%, rgba(223, 223, 223,0.06) 0%, rgba(223, 223, 223,0.06) 87%,transparent 87%, transparent 100%),radial-gradient(circle at 84% 89%, rgba(160, 160, 160,0.06) 0%, rgba(160, 160, 160,0.06) 57%,transparent 57%, transparent 100%),linear-gradient(90deg, rgb(46, 75, 248),rgb(166, 255, 237))",
      }}
    >
      <LoadingSpinner active={isActive} />
      <Grid
        container
        xs={10}
        sm={5}
        md={4}
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{
          padding: 2,
          borderRadius: "0px 40px 0px 40px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          // backgroundColor: "white",
          backgroundImage: `url(${backImg})`,
          backgroundRepeat: "no repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Grid item xs={12} align="center">
          <Box component="img" src={logoImg} height={50} width={50} />
          <Typography variant="h5" color="primary">
            M-Lint Insights
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              id="outlined-basic"
              margin="normal"
              size="small"
              fullWidth
              sx={{
                width: "100%",
                ".MuiInputBase-input": { fontFamily: "Poppins" },
              }}
              label="Email"
              name="email"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            {/* <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="role"
                value={formik.values.role}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              >
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                  name="role"
                />
                <FormControlLabel
                  value="user"
                  control={<Radio />}
                  label="User"
                  name="role"
                />
              </RadioGroup>
            </FormControl> */}
            <br />

            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForgetPassword;
