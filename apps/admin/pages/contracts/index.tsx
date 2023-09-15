import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ContractTable, { BasicContractProps } from "@/components/Tables/ContractTable";
import { gql, graphqlReq, withAuth } from "common";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import { downloadExcel } from "react-export-table-to-excel";

const GET_ALL_CONTRACTS = gql`
  query {
    contracts(descCreatedAt: true) {
      createdAt,
      product {
        name {
          en
        }
      },
      portOfLoading,
      portOfArrival,
      departureDate,
      offerPrice,
      quantity,
      downPayment,
      arrival,
      cashAgainstDocuments,
      description {
        en
      },
      attachment,
      capitalFunded,
      approvedDate,
      expirationDate,
      duration,
      risk,
      return,
      status,
      requiredAmount,
      nftLink
    }
  }
`

const ContractPage = (props: BasicContractProps) => {

  const header = ["No","Created Date", "Product Name", "Port of Loading", "Port of Arrival", "Departure Date", "Offer Price USD", "Quantity", "Total Price", "Down Payment %", "On Arrival %", "CAD %", "description", "Attached File", "Capital Funded",
  "# of investors", "Approved Date", "Expiration Date", "Duration (weeks)", "Risk", "Return (%)", "Status", "Required Amount", "NFT Link"];
  let body2: any = [];
  useEffect(() => {
    ;(async () => {
      await graphqlReq(GET_ALL_CONTRACTS).then(data => {
        body2 = data.contracts.map((v:any, index:number) => [
          `${index+1}`,
          new Date(v.createdAt).toLocaleString(),
          v.product.name.en,
          `${v.portOfLoading}`,
          `${v.portOfArrival}`,
          new Date(v.departureDate).toLocaleString(),
          v.offerPrice,
          v.quantity,
          v.offerPrice * v.quantity,
          v.downPayment,
          v.arrival,
          v.cashAgainstDocuments,
          v.description.en,
          `${v.attachment || 'N/A'}`,
          `${v.capitalFunded || 0}`,
          0,
          `${new Date(v.approvedDate).toLocaleString() || 'N/A'}`,
          `${new Date(v.expirationDate).toLocaleString() || 'N/A'}`,
          `${v.duration || 'N/A'}`,
          `${v.risk || 'N/A'}`,
          `${v.return || 'N/A'}`,
          v.status,
          `${v.requiredAmount || 'N/A'}`,
          `${v.nftLink || 'N/A'}`
        ])
      })
    })()
  }, [])

  const handleDownloadExcel = () => {
    downloadExcel({
      fileName: "Contract-data",
      sheet: "Contract-data",
      tablePayload: {
        header,
        // accept two different data structures
        body: body2,
      },
    });
  };

  const { contracts } = props;

  return (
    <>
      <Breadcrumb pageName="Smart Contracts" action={handleDownloadExcel} update="Export Data" />

      <div className="flex flex-col gap-10">
        <ContractTable contracts={contracts} />
      </div>
    </>
  );
};

export default withAuth(ContractPage, 'admin');

const GET_DATA = gql`
  query {
    contracts {
      _id
      portOfLoading
      portOfArrival
      quantity
      status

      product {
        name {
            en
        }
      }
    }
  }
`

export const getStaticProps: GetStaticProps<BasicContractProps> = async () => {
  const data = await graphqlReq(GET_DATA)

  return {
    props: {
        contracts: data.contracts.map((contract: any) => ({
        ...contract,
        product: contract.product.name.en,
      })),
    },
    revalidate: 60
  }
}
