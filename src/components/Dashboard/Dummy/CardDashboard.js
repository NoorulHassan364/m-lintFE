import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const CardDashboard = (props) => {
  console.log("props, ", props);
  return (
    <Box>
      <Card
        sx={{
          height: "100%",
          background: props.background,
          color: "white",
          borderRadius: 3,
        }}
      >
        <CardContent>
          {/* <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography gutterBottom variant="overline">
                TASKS PROGRESS
              </Typography>
              <Typography variant="h4">75.5%</Typography>
            </Grid>
            <CreditScoreIcon color="secondary" fontSize="large" />
          </Grid> */}
          <Box position={"relative"} paddingBottom={2}>
            <Typography variant="h6">{props.title}</Typography>
            {props.icon}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            paddingBottom={0.4}
          >
            <Typography variant="h6">{props.quantity}</Typography>
            <Typography variant="subtitle2" marginTop={1}>
              {props.progress}%🡡
            </Typography>
          </Box>
          <Box>
            <LinearProgress
              value={props.progress}
              variant="determinate"
              sx={{ height: 7 }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardDashboard;
