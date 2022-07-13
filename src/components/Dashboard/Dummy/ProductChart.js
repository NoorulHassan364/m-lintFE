import React from "react";
import Chart from "react-apexcharts";

var options = {
  colors: ["#DC381F", "#4576b5"],

  chart: {
    type: "line",
    height: "auto",
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
  stroke: {
    width: [0, 4],
  },
  title: {
    text: "Product Chart",
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1],
  },
  // labels: [
  //   "01 Jan 2001",
  //   "02 Jan 2001",
  //   "03 Jan 2001",
  //   "04 Jan 2001",
  //   "05 Jan 2001",
  //   "06 Jan 2001",
  //   "07 Jan 2001",
  // ],
  xaxis: {
    type: "MMM",
  },
  legend: {
    show: true,
    showForSingleSeries: true,
  },

  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  // xaxis: {
  //   type: "category",
  //   labels: {
  //     format: "MMM",
  //   },
  // },
  yaxis: [
    {
      title: {
        //text: "Website Blog",
      },
    },
    {
      opposite: true,
      title: {
        //text: "Social Media",
      },
      show: false,
    },
  ],
};

const series = [
  {
    name: "Product 1",
    type: "column",
    data: [440, 505, 414, 671, 227, 413, 201],
  },
  {
    name: "Product 2",
    type: "line",
    data: [440, 505, 414, 671, 227, 413, 201],
  },
];

function ProductChart() {
  return <Chart options={options} series={series} type="line" />;
}

export default ProductChart;
