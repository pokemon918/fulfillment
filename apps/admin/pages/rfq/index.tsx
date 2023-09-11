import { gql } from 'graphql-request'
import { GetStaticProps } from 'next'
import { toast } from 'react-toastify'

import RFQTable  from "@/components/Tables/RFQTable";


export default function rfq() {
    return (
      <>
        <div className="flex flex-col gap-10">
          <RFQTable/>
        </div>
      </>
    )
  }
  