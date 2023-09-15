import { Button, gql, graphqlReq } from "common";
import { useEffect, useRef, useState } from "react";
import RfqDetailsModal from "../Modal/RfqDetailsModal";
import RfqSupStatusModal from "../Modal/RfqSupStatusModal";
import { downloadExcel } from "react-export-table-to-excel";
import { confirmAlert } from "react-confirm-alert";

const RFQTable = (props: any) => {

  const GET_FQL = `
  query {
    quotes(productId: "") {
      _id
      productId
      product {
        name {
          en
        }
      }
      volume
      companyName                                                                                                                                     
      name
      email
      phone
      portOfLoading
      portOfArrival
      paymentTerms
      rfqStatus
      SpecifyDetails
      createdAt
  	}
  }
  `;

  

  const triggerDetails = useRef<any>(null);
  const triggerStatus = useRef<any>(null);
  const [data, setData] = useState<any>([]);
  const [detailsData, setDetailsData] = useState<any>({})
  const [statusData, setStatusData] = useState<any>({})
  const [DetailsModalOpen, setDetailsModalOpen] = useState<any>(false)
  const [StatusModalOpen, setStatusModalOpen] = useState<any>(false)

  const getData = async () => {
   const res = await graphqlReq(GET_FQL);
  // console.log('res',res)
   setData(res?.quotes);
  }

  function formatDate(dateString: any) {
    const dateObject = new Date(dateString);

// Extract day, month, and year components
const day = dateObject.getUTCDate();
const month = dateObject.getUTCMonth() + 1; // Month is 0-based, so add 1
const year = dateObject.getUTCFullYear();

// Format the components as DD/MM/YYYY
return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  }


  const header = ["No","Date", "Company Name",  "Product Name", "Port of Loading", "Port of Arrival", "Volume KG", "Price USD", "Down Payment %", "CAD %", "On Arrival %","Needs", "Name", "Email", "Phone", "Payment Terms"];
  const body2 = data.map((v:any, index:number) => [
    `${index+1}`,
    formatDate(v.createdAt),
    v.companyName,
    v.product.name.en,
    `${v.portOfLoading.name}, ${v.portOfLoading.country}`,
    `${v.portOfArrival.name}, ${v.portOfArrival.country}`,
    v.volume,
    v.paymentTerms.data.reduce((a:any,b:any) => a + b.total,0),
    v.paymentTerms?.data[0].paidPercent+'%',
    v.paymentTerms?.data[1].paidPercent+'%',
    v.paymentTerms?.data[2].paidPercent+'%',
    v.SpecifyDetails,
    v.name,
    v.email,
    v.phone,
    
    v.paymentTerms?.data.map(
      (v: any) =>
        `${v.title || 'N/A'} - ${v.paidPercent || 'N/A'}% - ${v.total || 'N/A'}`
    )
  ])

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "rfq-data",
      sheet: "rfq-data",
      tablePayload: {
        header,
        // accept two different data structures
        body: body2,
      },
    });
  };

  const DELETE_QUOTE = gql`
  mutation ($id: String!) {
    deleteQuote(_id: $id)
  }
`



 async function deleteRfq(id:string){
    await graphqlReq(DELETE_QUOTE,{id});
    getData()
  }


  useEffect(() => {
    getData()
  },[]);

  return (

   
    <>
     <div className=" flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        RFQ
      </h2>

      <Button
        style={{ padding: '8px 12px', backgroundColor: 'var(--color-primary)', color: 'black', }}
        onClick={handleDownloadExcel}
       // startIcon={<AddIcon />}
      >
        Export Data
      </Button>
    </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  No
                </th>
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Date
                </th>
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Company Name
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
                  Details
                </th>
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white">
                CRM
                </th>
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((rfq: any, key: any) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {key+1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                    {formatDate(rfq.createdAt)}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                    {rfq.companyName}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {rfq.product.name.en}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {rfq.portOfLoading.name}, {rfq.portOfLoading.country}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <a className="text-black dark:text-white">
                    {rfq.portOfArrival.name}, {rfq.portOfArrival.country}
                    </a>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <a className="text-black dark:text-white">
                    {rfq.volume + " kg"}
                    </a>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <a className="text-black dark:text-white">
                    {rfq.paymentTerms.data.reduce((a:any,b:any) => a + b.total,0)}$
                    </a>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <button className="hover:text-primary" onClick={() => {
                    setDetailsData(data.find((v:any) => v._id == rfq._id));
                    setDetailsModalOpen(true)
                  }} ref={triggerDetails}>
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                            fill=""
                          />
                        </svg>
                      </button>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <button className="hover:text-primary" ref={triggerStatus} onClick={() => {
                     setStatusData(data.find((v:any) => v._id == rfq._id));
                    setStatusModalOpen(true)
                  }}>
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                            fill=""
                          />
                        </svg>
                      </button>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
  <button
    className="hover:text-red-500"
   onClick={() => {
   
  confirmAlert({
    title:"Are you sure delete this data",
    buttons:[
      {
        label: "Yes",
        onClick: () =>  deleteRfq(rfq._id)
      },
      {
        label: "No"
      }
    ]
  })
   }}
  >
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <RfqDetailsModal modalOpen={DetailsModalOpen} handelClose={() => setDetailsModalOpen(false)} trigger={triggerDetails} data={detailsData} />
      <RfqSupStatusModal modalOpen={StatusModalOpen} handelClose={() => setStatusModalOpen(false)} trigger={triggerStatus} data={statusData} />
    </>
  );
};

export default RFQTable;
