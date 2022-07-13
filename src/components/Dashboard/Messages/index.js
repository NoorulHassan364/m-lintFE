import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { UserAPI } from "../../../api";
import {
  Button,
  TextField,
  Typography,
  Box,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import * as yup from "yup";
import ReactTimeAgo from "react-time-ago";

let user, admin;

const initialValues = {
  user_id: "",
  message: "",
};

const validationSchema = yup.object().shape({
  user_id: yup.string().required("User is required"),
  message: yup.string().required("Message is required."),
});

const Index = () => {
  const [data, setData] = React.useState([]);
  const [message, setMessage] = React.useState([]);
  const [filterMsg, setFilterMsg] = React.useState([]);
  const [adminState, setAdminState] = React.useState();
  const [value, setValue] = React.useState();
  const [isActive, setActive] = React.useState(false);

  const readMessages = (_id) => {
    if (admin) {
      UserAPI.readMessages(_id, 0).then((res) => {
        console.log(res?.data?.data);
        setMessage(res?.data?.data?.messages.reverse());
      });
    } else {
      UserAPI.readMessages(0, _id).then((res) => {
        console.log(res?.data?.data);
        setMessage(res?.data?.data?.messages.reverse());
      });
    }
  };

  React.useEffect(() => {
    admin = JSON.parse(localStorage.getItem("admin"));
    user = JSON.parse(localStorage.getItem("user"));
    const _id = admin ? admin?.response?._id : user?.response?.admin_Id?._id;
    UserAPI.getUsers(_id).then((res) => {
      setData(res?.data?.data);
    });
    if (admin) {
      UserAPI.readMessages(admin?.response?._id, 0).then((res) => {
        console.log(res?.data?.data);
        setMessage(res?.data?.data?.messages.reverse());
      });
      setAdminState(admin?.response?._id);
    } else {
      UserAPI.readMessages(0, user?.response?._id).then((res) => {
        setMessage(res?.data?.data?.messages.reverse());
        console.log(res);
      });
    }
  }, []);

  const onSubmit = (values, { resetForm }) => {
    setActive(true);
    const id = admin ? admin?.response?._id : user?.response?._id;
    // const name = admin ? admin?.response?.name : user?.response?.name;
    UserAPI.sendMessage(id, values).then((res) => {
      if (res?.status === 200) {
        readMessages(id);
        resetForm();
      }
      setActive(false);
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value == "all") {
      if (admin) {
        UserAPI.readMessages(admin?.response?._id, 0).then((res) => {
          // console.log(res?.data?.data);
          setMessage(res?.data?.data?.messages.reverse());
        });
        // setAdminState(admin?.response?._id);
      } else {
        UserAPI.readMessages(0, user?.response?._id).then((res) => {
          setMessage(res?.data?.data?.messages.reverse());
          // console.log(res);
        });
      }
      setFilterMsg([]);
    } else {
      const filter_data = message?.filter(
        (item) => item?.name === e.target.value
      );
      setFilterMsg(filter_data);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <Box>
        <Typography sx={{ fontWeight: "bolder", fontSize: 25, pb: 2 }}>
          Messages
        </Typography>
        <Stack
          sx={{
            background: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          }}
          spacing={2}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <FormControl sx={{ maxWidth: 150 }} size="small">
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="user_id"
              value={formik.values.user_id}
              label="User"
              onChange={formik.handleChange}
            >
              {user ? (
                <MenuItem
                  key={user?.response?.admin_Id?._id}
                  value={user?.response?.admin_Id?._id}
                >
                  {`${user?.response?.admin_Id?.name} (admin)`}
                </MenuItem>
              ) : null}

              {admin
                ? data?.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item?.name}
                    </MenuItem>
                  ))
                : data?.map((item) =>
                    user?.response?._id !== item._id ? (
                      <MenuItem key={item._id} value={item._id}>
                        {item?.name}
                      </MenuItem>
                    ) : null
                  )}
            </Select>
          </FormControl>
          {formik.touched.user_id && formik.errors.user_id && (
            <FormHelperText error>{formik.errors.user_id}</FormHelperText>
          )}
          <TextField
            id="outlined-multiline-static"
            label="Message"
            name="message"
            multiline
            rows={4}
            formik={formik}
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
            placeholder={"Enter Message"}
          />

          {isActive ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" type="submit" sx={{ width: 150 }}>
              Send
            </Button>
          )}
        </Stack>
        <Box
          sx={{
            background: "white",
            padding: 3,
            mt: 2,
            borderRadius: 2,
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          }}
        >
          <Typography sx={{ fontWeight: "bolder", fontSize: 25, pb: 2, pt: 2 }}>
            History
          </Typography>
          <FormControl sx={{ width: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="user_id"
              value={value}
              label="User"
              onChange={handleChange}
            >
              <MenuItem key="all" value="all">
                All
              </MenuItem>
              {user ? (
                <MenuItem
                  key={user?.response?.admin_Id?._id}
                  value={user?.response?.admin_Id?.name}
                >
                  {`${user?.response?.admin_Id?.name} (admin)`}
                </MenuItem>
              ) : null}
              {admin
                ? data?.map((item) => (
                    <MenuItem key={item._id} value={item?.name}>
                      {item?.name}
                    </MenuItem>
                  ))
                : data?.map((item) =>
                    user?.response?._id !== item._id ? (
                      <MenuItem key={item._id} value={item?.name}>
                        {item?.name}
                      </MenuItem>
                    ) : null
                  )}
            </Select>
          </FormControl>
          {filterMsg?.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {filterMsg?.map((item) => {
                return (
                  <Box>
                    <Box
                      sx={{
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        backgroundColor:
                          item?.from === "me" ? "#6495ED" : "#E6E6FA",
                        color: item?.from === "me" ? "white" : "black",
                        width: "350px",
                        mt: 2,
                        p: 1.5,
                        borderRadius:
                          item?.from === "me"
                            ? "22px 0px 22px 22px"
                            : "0px 22px 22px 22px",
                        overflowWrap: "break-word",
                        position: "relative",
                        float: item?.from === "me" ? "right" : "left",
                      }}
                    >
                      <Box display="flex" justifyContent="space-between">
                        <AlertTitle sx={{ fontWeight: "bold" }}>
                          {item.name}
                        </AlertTitle>
                        <Box sx={{ position: "absolute", right: 10 }}>
                          <ReactTimeAgo date={item?.createdAt} locale="en-US" />
                        </Box>
                      </Box>
                      {item.message}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : message?.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {message?.map((item) => {
                return (
                  <Box>
                    <Box
                      sx={{
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        backgroundColor:
                          item?.from === "me" ? "#6495ED" : "#E6E6FA",
                        color: item?.from === "me" ? "white" : "black",
                        width: "350px",
                        mt: 2,
                        p: 1.5,
                        borderRadius:
                          item?.from === "me"
                            ? "22px 0px 22px 22px"
                            : "0px 22px 22px 22px",
                        overflowWrap: "break-word",
                        position: "relative",
                        float: item?.from === "me" ? "right" : "left",
                      }}
                    >
                      <Box display="flex" justifyContent="space-between">
                        <AlertTitle sx={{ fontWeight: "bold" }}>
                          {item.name}
                        </AlertTitle>
                        <Box sx={{ position: "absolute", right: 10 }}>
                          <ReactTimeAgo date={item?.createdAt} locale="en-US" />
                        </Box>
                      </Box>
                      {item.message}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <h3 align="center">No History Available</h3>
          )}
        </Box>
      </Box>
      {/* ) : (
        <Box>
          <Typography sx={{ fontWeight: "bolder", fontSize: 25, pb: 2, pt: 2 }}>
            Admin Messages
          </Typography>
          <Box
            sx={{
              background: "white",
              padding: 3,
              borderRadius: 2,
              boxShadow:
                "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
          >
            {message.length > 0 ? (
              <Stack>
                {message?.map((item) => {
                  return (
                    <Alert
                      severity="warning"
                      icon={false}
                      sx={{
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        margin: 1,
                        maxWidth: "380px",
                        overflowWrap: "break-word",
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      <Typography variant="body2" paddingBottom={3}>
                        {item?.message}
                      </Typography>
                      <Box
                        sx={{
                          position: "absolute",
                          right: 10,
                          bottom: 4,
                        }}
                      >
                        <ReactTimeAgo date={item?.createdAt} locale="en-US" />
                      </Box>
                    </Alert>
                  );
                })}
              </Stack>
            ) : (
              <h3 align="center">no History available</h3>
            )}
          </Box>
        </Box>
      )} */}
    </>
  );
};

export default Index;
