import RFQTable  from "@/components/Tables/RFQTable";

const rfqs = {
  rfqs: [
    {
      product: 'Mango',
      portOfArrival: 'Asia',
      portOfLoading: 'Ameriaca',
      status: 'Pending',
      quantity: 120,
    },
  ]
}

export default function rfq() {
    return (
      <>
        <div className="flex flex-col gap-10">
          <RFQTable rfqs={rfqs}/>
        </div>
      </>
    )
  }
  