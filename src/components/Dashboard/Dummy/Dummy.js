import { Box, Container, Grid } from "@mui/material";
import React from "react";
import CardDashboard from "./CardDashboard";
import ProductChart from "./ProductChart";
import ProfitChart from "./ProfitChart";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const array = [
  {
    title: "Projects",
    quantity: 120,
    progress: 56,
    background: "linear-gradient(135deg,#8e4cf1 0,#c554bc 100%) !important",
    icon: (
      <CreditScoreIcon
        color="secondary"
        fontSize="large"
        sx={{ position: "absolute", right: 5, top: 5 }}
      />
    ),
  },
  {
    title: "New Employee",
    quantity: 40,
    progress: 46,
    background: "linear-gradient(135deg,#2916F5 0,#6495ED 100%) !important",
    icon: (
      <PeopleAltIcon
        color="action"
        fontSize="large"
        sx={{ position: "absolute", right: 5, top: 5 }}
      />
    ),
  },
  {
    title: "Running Tasks",
    quantity: 160,
    progress: 36,
    background: "linear-gradient(135deg,#008080 0,#66CDAA 100%) !important",
    icon: (
      <TaskAltIcon
        color="success"
        fontSize="large"
        sx={{ position: "absolute", right: 5, top: 5 }}
      />
    ),
  },
  {
    title: "Earning",
    quantity: `$${726}`,
    progress: 76,
    background: "linear-gradient(135deg,#FF6347 0,#FFA07A 100%) !important",
    icon: (
      <AttachMoneyIcon
        color="error"
        fontSize="large"
        sx={{ position: "absolute", right: 5, top: 5 }}
      />
    ),
  },
];

function Dummy() {
  return (
    <>
      <Grid
        container
        spacing={{ xs: 1, md: 1.5 }}
        columns={{ xs: 2, sm: 6, md: 12 }}
        paddingBottom={3}
      >
        {array?.map((item) => {
          return (
            <Grid item xs={3}>
              <CardDashboard
                title={item.title}
                quantity={item.quantity}
                progress={item.progress}
                background={item.background}
                icon={item.icon}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Container
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              paddingTop: { xs: 0, sm: 2 },
            }}
          >
            <ProductChart />
          </Container>
        </Grid>
        <Grid item xs={12} md={6}>
          <Container
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              paddingTop: { xs: 0, sm: 2 },
            }}
          >
            <ProfitChart />
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default Dummy;
