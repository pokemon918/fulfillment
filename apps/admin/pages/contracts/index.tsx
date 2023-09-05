import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ContractTable, { BasicContractProps } from "@/components/Tables/ContractTable";
import { gql, graphqlReq, withAuth } from "common";
import { GetStaticProps } from "next";

const ContractPage = (props: BasicContractProps) => {

  const { contracts } = props;

  return (
    <>
      <Breadcrumb pageName="Smart Contracts" href="/company/buyers/create" update="none" />

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
