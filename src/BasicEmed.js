import React from "react";

const { tableau } = window;

const BasicEmed = () => {
  const ref = React.useRef(null);
  const url =
    "https://prod-useast-a.online.tableau.com/t/mlintinsight/views/Regional/FlightDelays";
  const initViz = () => {
    new tableau.Viz(ref.current, url, {
      width: "100%",
      height: "90vh",
      hideTabs: true,
      hideToolbar: true,
    });
  };

  React.useEffect(() => {
    initViz();
  }, []);

  return <div ref={ref} />;
};

export default BasicEmed;
