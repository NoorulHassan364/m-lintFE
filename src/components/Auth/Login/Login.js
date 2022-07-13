import React from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  CssBaseline,
  Avatar,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate, Link } from "react-router-dom";
import { AuthAPI } from "../../../api";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backImg2 from "../../../assets/images/backImg3.svg";
import loginImg from "../../../assets/images/signinImg.png";
import logoImg from "../../../assets/images/logoImg.png";

const theme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [isActive, setActive] = React.useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("email is required"),
    password: yup.string().required("password is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    setActive(true);
    AuthAPI.login(values).then((res) => {
      console.log(values, "........");
      console.log(res, "......");
      if (res?.status === 200 && res?.data?.data?.response?.role === "admin") {
        console.log(res?.data, "response");
        localStorage.setItem("admin", JSON.stringify(res?.data?.data));
        resetForm();
      }
      if (res?.status === 200 && res?.data?.data?.response?.role === "user") {
        console.log(res?.data, "response");
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
        resetForm();
      }

      let user = localStorage.getItem("user");
      let admin = localStorage.getItem("admin");
      if (user || admin) {
        navigate("/");
      }
      setActive(false);
    });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  return (
    <>
      <LoadingSpinner active={isActive} />
      <Box
        display={"flex"}
        align="center"
        justifyContent="center"
        height="100vh"
        alignItems="center"
        sx={{
          backgroundImage:
            "radial-gradient(circle at top right, rgb(49, 157, 235) 0%, rgb(49, 157, 235) 13%,rgb(76, 166, 234) 13%, rgb(76, 166, 234) 23%,rgb(103, 176, 232) 23%, rgb(103, 176, 232) 33%,rgb(130, 185, 231) 33%, rgb(130, 185, 231) 46%,rgb(156, 194, 230) 46%, rgb(156, 194, 230) 48%,rgb(183, 203, 229) 48%, rgb(183, 203, 229) 63%,rgb(201,213,236) 63%, rgb(201,213,236) 83%,rgb(226,228,238) 83%, rgb(226,228,238) 100%)",
        }}
      >
        <Grid container justifyContent="center" padding={2}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={3}
            component={Paper}
            elevation={6}
            sx={{
              backgroundImage: `url(${loginImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px 0px 0px 0px",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={3}
            component={Paper}
            elevation={6}
            square
            align="center"
            sx={{
              //backgroundImage:
              //  "radial-gradient(circle at 13% 47%, rgba(140,140,140, 0.1) 0%, rgba(140,140,140, 0.1) 25%,transparent 25%, transparent 100%),radial-gradient(circle at 28% 63%, rgba(143,143,143, 0.07) 0%, rgba(143,143,143, 0.07) 16%,transparent 16%, transparent 100%),radial-gradient(circle at 81% 56%, rgba(65,65,65, 0.1) 0%, rgba(65,65,65, 0.1) 12%,transparent 12%, transparent 100%),radial-gradient(circle at 26% 48%, rgba(60,60,60, 0.12) 0%, rgba(60,60,60, 0.12) 6%,transparent 6%, transparent 100%),radial-gradient(circle at 97% 17%, rgba(150,150,150, 0.08) 0%, rgba(150,150,150, 0.08) 56%,transparent 56%, transparent 100%),radial-gradient(circle at 50% 100%, rgba(25, 25, 25,0.03) 0%, rgba(25, 25, 25,0.03) 36%,transparent 36%, transparent 100%),radial-gradient(circle at 55% 52%, rgba(69,69,69, 0.08) 0%, rgba(69,69,69, 0.08) 6%,transparent 6%, transparent 100%),linear-gradient(90deg, rgb(248,248,248),rgb(248,248,248))",
              backgroundImage: `url(${backImg2})`,
              backgroundRepeat: "no repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box component="img" src={logoImg} height={50} width={50} />
              <Typography component="h1" variant="h5" marginTop={1}>
                Sign in to M-Lint Insights
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
                  label="Email Address"
                  name="email"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  id="outlined-basic"
                  margin="normal"
                  size="small"
                  fullWidth
                  sx={{
                    width: "100%",
                    ".MuiInputBase-input": { fontFamily: "Poppins" },
                  }}
                  label="Password"
                  name="password"
                  type="password"
                  {...formik.getFieldProps("password")}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
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

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Typography>
                    Need an Account?
                    <Link
                      to="/signup"
                      variant="body2"
                      style={{
                        textDecoration: "none",
                        paddingLeft: 5,
                        color: "blue",
                      }}
                    >
                      {"Sign up"}
                    </Link>
                  </Typography>
                </Grid>
                <Grid container>
                  <Link
                    to="/forgetPassword"
                    variant="body2"
                    style={{
                      textDecoration: "none",
                      color: "blue",
                    }}
                  >
                    {"Forget Password?"}
                  </Link>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
