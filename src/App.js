import Router from "./routes/index";
import defaultTheme from "./themes/defaultThemes";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
// import { useSelector } from 'react-redux'
import { ThemeProvider } from "@mui/material/styles";
import BasicEmed from "./BasicEmed";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

function App() {
  return (
    <Box
      sx={{
        //backgroundImage:
        //"radial-gradient(circle at 82% 60%, rgba(59, 59, 59,0.06) 0%, rgba(59, 59, 59,0.06) 69%,transparent 69%, transparent 100%),radial-gradient(circle at 36% 0%, rgba(185, 185, 185,0.06) 0%, rgba(185, 185, 185,0.06) 59%,transparent 59%, transparent 100%),radial-gradient(circle at 58% 82%, rgba(183, 183, 183,0.06) 0%, rgba(183, 183, 183,0.06) 17%,transparent 17%, transparent 100%),radial-gradient(circle at 71% 32%, rgba(19, 19, 19,0.06) 0%, rgba(19, 19, 19,0.06) 40%,transparent 40%, transparent 100%),radial-gradient(circle at 77% 5%, rgba(31, 31, 31,0.06) 0%, rgba(31, 31, 31,0.06) 52%,transparent 52%, transparent 100%),radial-gradient(circle at 96% 80%, rgba(11, 11, 11,0.06) 0%, rgba(11, 11, 11,0.06) 73%,transparent 73%, transparent 100%),radial-gradient(circle at 91% 59%, rgba(252, 252, 252,0.06) 0%, rgba(252, 252, 252,0.06) 44%,transparent 44%, transparent 100%),radial-gradient(circle at 52% 82%, rgba(223, 223, 223,0.06) 0%, rgba(223, 223, 223,0.06) 87%,transparent 87%, transparent 100%),radial-gradient(circle at 84% 89%, rgba(160, 160, 160,0.06) 0%, rgba(160, 160, 160,0.06) 57%,transparent 57%, transparent 100%),linear-gradient(90deg, rgb(46, 75, 248),rgb(166, 255, 237))",
        //"radial-gradient(circle at 13% 47%, rgba(0,161,255, 0.22) 0%, rgba(0,161,255, 0.22) 25%,transparent 25%, transparent 100%),radial-gradient(circle at 28% 63%, rgba(113,215,215, 0.15) 0%, rgba(113,215,215, 0.15) 16%,transparent 16%, transparent 100%),radial-gradient(circle at 81% 56%, rgba(62,255,255, 0.47) 0%, rgba(62,255,255, 0.47) 12%,transparent 12%, transparent 100%),radial-gradient(circle at 26% 48%, rgba(88,255,187, 0.97) 0%, rgba(88,255,187, 0.97) 6%,transparent 6%, transparent 100%),radial-gradient(circle at 97% 17%, rgba(0,255,255, 0.08) 0%, rgba(0,255,255, 0.08) 56%,transparent 56%, transparent 100%),radial-gradient(circle at 50% 100%, rgba(88,200,255, 0.14) 0%, rgba(88,200,255, 0.14) 36%,transparent 36%, transparent 100%),radial-gradient(circle at 55% 52%, rgba(99,254,254, 0.46) 0%, rgba(99,254,254, 0.46) 6%,transparent 6%, transparent 100%),linear-gradient(90deg, rgb(132,149,172),rgb(132,149,172))",
        height: "120%",
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Router />
        <ToastContainer
          position="top-right"
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
        />
      </ThemeProvider>
      {/* <BasicEmed /> */}
    </Box>
  );
}

export default App;
