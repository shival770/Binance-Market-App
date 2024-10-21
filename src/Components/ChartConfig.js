import {
  Chart,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
} from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';

// Chart options for better aesthetics and usability
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Allow flexible aspect ratio
  plugins: {
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background for tooltips
      titleColor: '#fff', // Tooltip title color
      bodyColor: '#fff', // Tooltip body color
      borderColor: '#4CAF50', // Tooltip border color
      borderWidth: 1, // Tooltip border width
      padding: 10, // Increased padding for tooltips
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'minute',
      },
      grid: {
        display: false, // Hide grid lines for x-axis
      },
      ticks: {
        color: '#fff', // X-axis tick color
        font: {
          size: 12, // Adjust font size for better readability
        },
      },
    },
    y: {
      grid: {
        color: '#444', // Change grid line color for y-axis
      },
      ticks: {
        color: '#fff', // Y-axis tick color
        font: {
          size: 12, // Adjust font size for better readability
        },
      },
    },
  },
};

// Register required chart components
Chart.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  CandlestickController,
  CandlestickElement,
  Tooltip
);

// Export chart options for use in the main chart component
export { chartOptions };
