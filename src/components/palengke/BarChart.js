import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "../../styles/Palengke.css";

const chartSetting = {
  xAxis: [
    {
      label: "",
    },
  ],
  width: 650,
  height: 250,
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "1 stars",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "2 stars",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "3 stars",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "4 stars",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "5 stars",
  },
];

export default function HorizontalBars() {
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[{ dataKey: "seoul" }]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}
