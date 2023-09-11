
const RFQTable = (props: any) => {

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  No
                </th>
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Product Name
                </th>
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white">
                  Port of Loading
                </th>
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white">
                  Port of Arrival
                </th>
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white">
                  Volume
                </th>
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white">
                  Price
                </th>
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white">
                  CreatedAt
                </th>
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {props.rfqs.map((rfq: any, key: any) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {key+1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {rfq.product}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {rfq.portOfLoading}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <a className="text-black dark:text-white">
                    {rfq.portOfArrival}
                    </a>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <a className="text-black dark:text-white">
                    {rfq.quantity + " kg"}
                    </a>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        rfq.status === "Approved"
                          ? "text-success bg-success" // green
                          : rfq.status === "Rejected"
                          ? "text-danger bg-danger" // red
                          : rfq.status === "Pending"
                          ? "text-warning bg-warning" // orange
                          : rfq.status === "Expired"
                          ? "text-skyblue bg-skyblue" // sky blue
                          : "text-blue bg-blue" // blue
                      }`}
                    >
                      {rfq.status}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RFQTable;