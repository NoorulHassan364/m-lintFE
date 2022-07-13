import React from "react";
import Chart from "react-apexcharts";

const state = {
  series: [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  options: {
    title: {
      text: "Profit Chart",
    },
    colors: ["#949bd6", "#fc8380"],
    chart: {
      height: "auto",
      type: "area",
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 300,
          },
        },
      },
    ],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "MMM",
    },
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },
};

const ProfitChart = () => {
  return <Chart options={state.options} series={state.series} type="area" />;
};

export default ProfitChart;
