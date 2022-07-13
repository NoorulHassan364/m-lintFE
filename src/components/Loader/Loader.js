import React from "react";
import { Box } from "@mui/material";
import BounceLoader from "react-spinners/BounceLoader";

function Loader() {
  let [color, setColor] = React.useState("#A9A9A9");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <BounceLoader color={color} size={80} />
    </Box>
  );
}

export default Loader;
