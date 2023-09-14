import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import dynamic from "next/dynamic";
// @ts-ignore
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


export interface ContractState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    type: "donut",
  },
  colors: ["#FFA70B", "#87CEEB", "#D34053", "#0000FF", "#219653"],
  labels: ["Pending", "Expired", "Rejected", "Funded", "Approved"],
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

const ContractChart: React.FC<ContractState> = ({
  series
}) => {

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Contracts
          </h5>
        </div>
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Total: {series.reduce((acc, curr) => acc + curr, 0)}
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="contractChart" className="mx-auto flex justify-center">
          <ReactApexChart
// @ts-ignore
            options={options}
            series={series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#FFA70B]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Pending </span>
              <span> { series[0] } </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#87CEEB]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Expired </span>
              <span> { series[1] } </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#D34053]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Rejected </span>
              <span> { series[2] } </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#0000FF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Funded </span>
              <span> { series[3] } </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#219653]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Approved </span>
              <span> { series[4] } </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractChart;
