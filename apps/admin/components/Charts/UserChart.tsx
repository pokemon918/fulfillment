import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
// @ts-ignore
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface UserChartState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    type: "donut",
  },
  colors: ["#375E83", "#259AE6", "#FFA70B"],
  labels: ["Buyer", "Supplier", "Investor"],
  legend: {
    show: false,
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
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

const UserChart: React.FC<UserChartState> = ({
  series
}) => {

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Users
          </h5>
        </div>
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Total: {series.reduce((acc, curr) => acc + curr, 0)}
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="userChart" className="mx-auto flex justify-center">
          <ReactApexChart
// @ts-ignore
            options={options}
            series={series}
            type="donut"
          />
        </div>
      </div>

      <br /><br />

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="w-full px-3 sm:w-1/3">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#375e83]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Buyer </span>
              <span> { series[0] } </span>
            </p>
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/3">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#259ae6]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Supplier </span>
              <span> { series[1] } </span>
            </p>
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/3">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#ffa70b]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Investors </span>
              <span> { series[2] } </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChart;
