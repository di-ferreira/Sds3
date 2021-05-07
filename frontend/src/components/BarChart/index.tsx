import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import api from 'services/api';
import { SaleSuccess } from 'types/sale';
import { round } from 'utils/format';

type SeriesData = {
  name: string;
  data: number[];
}

type ChartData = {
  labels: { categories: string[] };
  series: SeriesData[];
};


function BarChart() {

  const [chartData, setChartData] = useState<ChartData>({
    labels: {
      categories: []
    },
    series: [
      {
        name: "",
        data: []
      }
    ]
  });

  useEffect(() => {
    api.get('/sales/success-by-seller').then(response => {

      const data = response.data as SaleSuccess[];

      const labelData = data.map(l => l.sellerName);
      const seriesData = data.map(s => round(100.0 * s.deals / s.visited, 1));

      setChartData({
        labels: {
          categories: labelData
        },
        series: [
          {
            name: "% Sucesso",
            data: seriesData
          }
        ]
      });
    });
  }, []);

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
  };

  return (
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="240"
    />
  );
}

export default BarChart;
