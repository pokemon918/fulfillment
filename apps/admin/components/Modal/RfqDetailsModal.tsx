import React, { useEffect, useRef } from 'react';

interface Prop {
  modalOpen: boolean;
  handelClose: () => void;
  trigger: any
  data: any
}

const RfqDetailsModal: React.FC<Prop> = ({ modalOpen, handelClose, trigger, data = {} }) => {
  
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


  const baseInfo = [
    `Company: ${data.companyName || 'N/A'}`,
    `Name: ${data.name || 'N/A'}`,
    `Email: ${data.email || 'N/A'}`,
    `Phone: ${data.phone || 'N/A'}`,
    `Port of Loading: ${data.portOfLoading?.shippingType || 'N/A'} - ${data.portOfLoading?.name || 'N/A'}, ${data.portOfLoading?.country || 'N/A'}`,
    `Port of Destination: ${data.portOfArrival?.shippingType || 'N/A'} - ${data.portOfArrival?.name || 'N/A'}, ${data.portOfArrival?.country || 'N/A'}`,
    `Purchase Volume: ${data.volume || 'N/A'} kg`,
    `Needs: ${data.SpecifyDetails || 'N/A'}`,
  ];
  
  const terms = data.paymentTerms?.data.map(
    (v: any) =>
      `${v.title || 'N/A'} - ${v.paidPercent || 'N/A'}% - ${v.total || 'N/A'}`
  );
  
  const infoText =
    'Quote Request<br>' +
    baseInfo.join('<br>') +
    (terms && terms.length > 0 ? '<br><br>Payment Terms:<br>' + terms.join('<br>') : '');
  
  
  
  

  return (

        <div
      className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
        modalOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        ref={modal}
        className="w-full max-w-142.5 rounded-lg bg-white py-12 px-8 text-center dark:bg-boxdark md:py-15 md:px-17.5"
      >
        <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
          Details
        </h3>
        <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full">
          <p dangerouslySetInnerHTML={{ __html: infoText }} />
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default RfqDetailsModal;
