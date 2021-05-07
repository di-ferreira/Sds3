import Chart from "react-apexcharts";
import api from "services/api";
import { SaleSum } from "types/sale";

type ChartData = { labels: string[]; series: number[]; }

function DonutChart() {

  let chartData: ChartData = { labels: [], series: [] };

  api.get('/sales/amount-by-seller').then(response => {

    const data = response.data as SaleSum[];

    const labelData = data.map(l => l.sellerName);
    const seriesData = data.map(s => s.sum);

    chartData = { labels: labelData, series: seriesData };

    console.log(chartData);
  });


  // const mockData = {
  //   series: [477138, 499928, 444867, 220426, 473088],
  //   labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
  // }

  const options = {
    legend: {
      show: true
    }
  }

  return (
    <Chart
      options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type="donut"
      height="240"
    />
  );
}

export default DonutChart;
