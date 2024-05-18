import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "../../styles/Palengke.css";

const chartSetting = {
  xAxis: [
    {
      label: "",
    },
  ],
  minWidth: 650,
  height: 250,
};
function getTotal(data) {
  const all = data.length;
  let total = [0, 0, 0, 0, 0];
  data.forEach((review) => {
    const rating = parseInt(review.rating);
    if (rating === 1) {
      total[0] += 1;
    } else if (rating === 2) {
      total[1] += 1;
    } else if (rating === 3) {
      total[2] += 1;
    } else if (rating === 4) {
      total[3] += 1;
    } else if (rating === 5) {
      total[4] += 1;
    }
  });
  return total;
}
export default function HorizontalBars({ data }) {
  const total = getTotal(data);
  let dataset = [
    { total: total[0], label: "1 stars" },
    { total: total[1], label: "2 stars" },
    { total: total[2], label: "3 stars" },
    { total: total[3], label: "4 stars" },
    { total: total[4], label: "5 stars" },
  ];

  return (
    <div className="barChartContainer">
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: "band", dataKey: "label" }]}
        series={[{ dataKey: "total" }]}
        layout="horizontal"
        {...chartSetting}
        className="barChart"
      />
    </div>
  );
}
