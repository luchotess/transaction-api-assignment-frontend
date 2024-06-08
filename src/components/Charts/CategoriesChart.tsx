import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
  labels: [],
  legend: {
    show: true,
    position: 'bottom',
  },

  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const CategoriesChart = ({ summaryData }: any) => {
  const labels = summaryData.map((category: any) => category.category);
  const series = summaryData.map((category: any) => category.total_amount);

  const [state, setState] = useState<ChartState>({
    series,
  });

  const chartOptions = {
    ...options,
    labels,
  };

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series,
    }));
  };

  useEffect(() => {
    handleReset();
  }, [summaryData]);

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">Category Breakdown</h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={chartOptions} series={state.series} type="donut" />
        </div>
      </div>
    </div>
  );
};

export default CategoriesChart;
