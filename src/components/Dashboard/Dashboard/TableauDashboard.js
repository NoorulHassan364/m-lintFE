import React from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  IconButton,
  Chip,
} from "@mui/material";
import TableauReport from "tableau-react";
import { useLocation } from "react-router-dom";
import { DashboardAPI } from "../../../api";
import JWT from "simple-jwt";
import { boolean } from "yup/lib/locale";
const TableauDashboard = () => {
  // const [timeOut, setTimeOut] = React.useState(false);
  const [token, setToken] = React.useState();
  const [bool, setBool] = React.useState();
  // const [expireTime, setExpireTime] = React.useState();
  const { state } = useLocation();
  // const token = state.token;

  // const compareTime = () => {
  //   const date = new Date().getTime();
  //   const currentTime = date / 1000;
  //   console.log(expireTime, "expireTime");
  //   console.log(currentTime, "currentTime");
  //   if (currentTime >= expireTime) {
  //     setTimeOut(true);
  //   }
  // };

  React.useEffect(() => {
    DashboardAPI.generateToken().then((res) => {
      console.log(res?.data?.token, "token");
      setToken(res?.data?.token);
    });
    const val = state?.link.includes("public.tableau");
    setBool(val);
  }, []);

  // React.useEffect(() => {
  //   const decode = JWT.decodeTokenHeaderAndPayload(token);
  //   console.log("myContainer", myContainer);
  //   console.log("verify", decode);
  //   setExpireTime(decode?.payload?.exp);
  //   compareTime();
  // });

  return (
    <>
      {bool ? (
        <tableau-viz id="tableauViz3" src={state.link}></tableau-viz>
      ) : (
        <tableau-viz
          id="tableauViz3"
          src={state.link}
          token={token}
        ></tableau-viz>
      )}
    </>
  );
};

export default TableauDashboard;
