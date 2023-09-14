import React, { useEffect, useRef } from 'react';

interface Prop {
  modalOpen: boolean;
  handelClose: () => void;
  trigger: any
  data: any
}

const RfqSupStatusModal: React.FC<Prop> = ({ modalOpen, handelClose, trigger, data = {} }) => {
  
  const modal = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current) return;
      if (!modalOpen || modal.current.contains(target) || trigger.current.contains(target)) return;
      handelClose();
    };

    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [modalOpen, handelClose]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      handelClose();
    };

    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, [modalOpen, handelClose]);


  
  
  
  
  

  return (

        <div
      className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
        modalOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        ref={modal}
        className="w-auto rounded-lg bg-white  px-8 py-8 text-center dark:bg-boxdark"
      >
        <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
        Suppliers
        </h3>
        <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        

          <div className='flex flex-col gap-10'>
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white">
                  Phone
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Status
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
                            {v.email}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-4 px-4  dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            {v.phone}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            {v.smsStatus}
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
