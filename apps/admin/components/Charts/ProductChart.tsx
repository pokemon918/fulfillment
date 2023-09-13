import React from "react";

export interface ProductChartState {
  name: string
  count: number
}

interface ProductChartProps {
    products: ProductChartState[]
}

const ProductChart: React.FC<ProductChartProps> = ({
    products
}) => {

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Products
          </h5>
          <br />
        </div>
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Total: {products.map((product) => product.count).reduce((acc, curr) => acc + curr, 0)}
          </h5>
        </div>
      </div>

      {products.length?<div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {products.map((product: any) => (
            <div className="w-full px-8 sm:w-1/2">
                <div className="flex w-full items-center">
                <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#10b981]"></span>
                <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                    <span> { product.name } </span>
                    <span> { product.count } </span>
                </p>
                </div>
            </div>
        ))}
      </div>:<></>}
    </div>
  );
};

export default ProductChart;
