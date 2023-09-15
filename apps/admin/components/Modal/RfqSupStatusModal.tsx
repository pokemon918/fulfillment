import { Button } from 'common';
import React, { useEffect, useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';

interface Prop {
  modalOpen: boolean;
  handelClose: () => void;
  trigger: any
  data: any
}

const RfqSupStatusModal: React.FC<Prop> = ({ modalOpen, handelClose, trigger, data = {} }) => {
  
  const modal = useRef<any>(null);

   const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
      currentTableRef: tableRef.current,
      filename: 'Suppliers Status',
      sheet: 'Suppliers Status'
  })

   


  
  
  
  
  

  return (

        <div
      className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
        modalOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        ref={modal}
        style={{position:'relative',overflow:'auto'}}
        className="w-auto rounded-lg bg-white  px-8 py-8 text-center dark:bg-boxdark"
      >
         <button
          onClick={handelClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
        CRM
        </h3>
        <Button
        style={{color: 'var(--color-primary)',
        padding: '5px',
        minWidth: 'auto',
        position: 'absolute',
        right: '32px',
        background: 'transparent'}}
        onClick={onDownload}
       // startIcon={<AddIcon />}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>
      </Button> 
       

        <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        

          <div className='flex flex-col gap-10'>
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          {/* */}
        <div className="max-w-full overflow-x-auto">
          <table ref={tableRef} className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
              <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Phone
                </th>
               
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white">
                Offer Sent
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                Interested
                </th>
              </tr>
            </thead>
            <tbody>
             
            {
                    data.rfqStatus?.data?.map((v: any, i: number) => (
                        <tr key={i}>
                 
                        <td className="border-b border-[#eee] py-4 px-4  dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            {v.name.en}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-4 px-4  dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            {v.phone}
                          </h5>
                        </td>
                       
                        <td className="border-b border-[#eee] py-4 px-4  dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            Yes
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                          
                          </h5>
                        </td>
                      </tr>
                    ))
                }
             
            </tbody>
          </table>
        </div>
      </div>
          </div>


          
        </div>
      </div>
    </div>
   
  );
};

export default RfqSupStatusModal;
