import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, Link, useParams } from "react-router-dom";
import { AuthAPI, UserAPI } from "../../../api";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import backImg from "../../../assets/images/backImg.svg";
import logoImg from "../../../assets/images/logoImg.png";

const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;

const Signup = () => {
  const navigate = useNavigate();
  const [isActive, setActive] = React.useState(false);
  const { admin_Id } = useParams();
  let initialValues;
  if (admin_Id) {
    console.log(admin_Id);
    initialValues = {
      name: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "user",
      admin_Id: admin_Id,
    };
  } else {
    initialValues = {
      name: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "admin",
    };
  }

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(40)
      .required("name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("email is required"),
    address: yup.string().required("Address is required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
    password: yup
      .string()
      .required("password is required")
      .min(5, "password should at-least 5 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("confirm password required"),
  });

  const onSubmit = (values, { resetForm }) => {
    setActive(true);
    AuthAPI.signup(values).then((res) => {
      console.log(values, "........", res);
      if (res?.data?.data?.admin_Id) {
        UserAPI.addNotification(res?.data?.data).then((res) => {});
      }
      if (res?.status === 201) {
        console.log(res?.data, "response");
        resetForm();
        navigate("/login");
      } else {
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
        onSubmit={formik.handleSubmit}
        component="form"
        container
        xs={10}
        sm={7}
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
            Sign up to M-Lint Insights
          </Typography>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Typography
            align="left"
            variant="body2"
            sx={{ fontSize: "15px" }}
            pb={0.5}
          >
            Name
          </Typography>
          <TextField
            id="outlined-basic"
            size="small"
            sx={{
              width: "100%",
              ".MuiInputBase-input": { fontFamily: "Poppins" },
            }}
            placeholder="Enter Name"
            name="name"
            {...formik.getFieldProps("name")}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Typography
            align="left"
            variant="body2"
            sx={{ fontSize: "15px" }}
            pb={0.5}
          >
            Email
          </Typography>
          <TextField
            id="outlined-basic"
            size="small"
            sx={{
              width: "100%",
              ".MuiInputBase-input": { fontFamily: "Poppins" },
            }}
            placeholder="abc@gmail.com"
            name="email"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Typography
            align="left"
            variant="body2"
            sx={{ fontSize: "15px" }}
            pb={0.5}
          >
            Address
          </Typography>
          <TextField
            id="outlined-basic"
            size="small"
            sx={{
              width: "100%",
              ".MuiInputBase-input": { fontFamily: "Poppins" },
            }}
            placeholder="Enter Address"
            name="address"
            {...formik.getFieldProps("address")}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Typography
            align="left"
            variant="body2"
            sx={{ fontSize: "15px" }}
            pb={0.5}
          >
            Phone
          </Typography>
          <TextField
            id="outlined-basic"
            size="small"
            sx={{
              width: "100%",
              ".MuiInputBase-input": { fontFamily: "Poppins" },
            }}
            placeholder="Enter Phone"
            name="phone"
            {...formik.getFieldProps("phone")}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Typography
            align="left"
            variant="body2"
            sx={{ fontSize: "15px" }}
            pb={0.5}
          >
            Password
          </Typography>
          <TextField
            id="outlined-basic"
            size="small"
            sx={{
              width: "100%",
              ".MuiInputBase-input": { fontFamily: "Poppins" },
            }}
            placeholder="Enter Password"
            name="password"
            type="password"
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Typography
            align="left"
            variant="body2"
            sx={{ fontSize: "15px" }}
            pb={0.5}
          >
            Confirm Password
          </Typography>
          <TextField
            id="outlined-basic"
            size="small"
            sx={{
              width: "100%",
              ".MuiInputBase-input": { fontFamily: "Poppins" },
            }}
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            {...formik.getFieldProps("confirmPassword")}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Grid>

        <Grid item xs={10} sm={6} md={3} align="center">
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Sign up
          </Button>
          <Typography paddingTop={1}>
            Already a User?
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                paddingLeft: 5,
                color: "blue",
              }}
            >
              Login
            </Link>
          </Typography>
        </Grid>
        {/* </Box> */}
      </Grid>
    </Box>
  );
};

export default Signup;
