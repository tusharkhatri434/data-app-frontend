// LineChart.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { useDispatch, useSelector } from "react-redux";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const LineChart = () => {
  const bar = useSelector((state) => state.appData.lineBarId);
  const filters = useSelector((state) => state.appData.filters);

  const [lineBarData, setLineBarData] = useState([]);
  const [lineBarMonths, setLineBarMonths] = useState([]);
  useEffect(() => {
    fetchDataHandler();
  }, [bar, filters]);

  async function fetchDataHandler() {
    try {
      let barID = null;
      switch (bar) {
        case 0:
          barID = "A";
          break;
        case 1:
          barID = "B";
          break;
        case 2:
          barID = "C";
          break;
        case 3:
          barID = "D";
          break;
        case 4:
          barID = "E";
          break;
        case 5:
          barID = "F";
          break;
      }
      const { startDate, endDate, age, gender } = filters;
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("Authorization="))
        ?.split("=")[1];
      const res = await fetch(
        `https://data-app-backend.vercel.app/data/linebar?id=${barID}&start=${startDate}&end=${endDate}&age=${age}&gender=${gender}`,
        {
            method: "GET", // or 'POST', 'PUT', etc.
            headers: {
              "Authorization": `${cookieValue}`, // Authorization header with Bearer token
              "Content-Type": "application/json", // Specify content type if needed
            }
        }
      );
      const json = await res.json();
      let arrValue = [];
      let months = [];
      console.log(json);
      json.barValues.forEach((element) => {
        arrValue.push(element[barID]);
        let date = new Date(element._id);
        let month = date.toLocaleString("default", { month: "long" });
        months.push(month);
      });
      setLineBarData(arrValue);
      setLineBarMonths(months);
    } catch (error) {}
  }

  if (lineBarData.length == 0) {
    return;
  }

  const data = {
    labels: [...lineBarMonths],
    datasets: [
      {
        label: "Revenue",
        data: [...lineBarData], // values according to months
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Data Of ${bar + 1}`,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x", // Allow panning on the X-axis
        },
        zoom: {
          wheel: {
            enabled: true, // Enable zooming with the mouse wheel
          },
          drag: {
            enabled: true, // Enable zooming by dragging
          },
          mode: "x", // Only zoom along the X-axis
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
