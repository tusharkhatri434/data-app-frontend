// BarChart.js
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useDispatch } from 'react-redux';
import { setLineBarID } from '../utils/appDataSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,zoomPlugin);

const BarChart = ({barData}) => {

  const [selectedBarData, setSelectedBarData] = useState(null);
  const {A,B,C,D,E,F} = barData[0];
  const dispatch = useDispatch();
  const handleBarClick = (elements) => {
    if (elements.length > 0) {
      // console.log(elements[0].index + 1);
      let bar = elements[0].index;
      dispatch(setLineBarID(bar));
      // setSelectedBarData(bar)
    }
  };

  const data = {
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: [
      {
        label: 'Sales',
        data: [A,B,C,D,E,F], // summ up values of a b c d e all values
        backgroundColor: '#C9E9D2',
        borderColor: 'green',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    onClick: (_, elements) => handleBarClick(elements),
    indexAxis:'y',
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x', // Allow panning on the X-axis
        },
        zoom: {
          wheel: {
            enabled: true, // Enable zooming with the mouse wheel
          },
          drag: {
            enabled: true, // Enable zooming by dragging
          },
          mode: 'x', // Only zoom along the X-axis
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
