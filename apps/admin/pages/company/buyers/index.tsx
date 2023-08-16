import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CompanyTable, { BasicCompanyProps } from "@/components/Tables/CompanyTable";
import { gql, graphqlReq } from "common";
import { GetStaticProps } from "next";

const BuyerPage = (props: BasicCompanyProps) => {

  const { companies } = props;

  return (
    <>
      {/* @ts-ignore */}
      <Breadcrumb pageName="Buyer Company" href="/company/buyers/create" />

      <div className="flex flex-col gap-10">
        <CompanyTable companies={companies} />
      </div>
    </>
  );
};

export default BuyerPage;

const GET_DATA = gql`
  query {
    companies(companyType: "Buyer") {
      _id
      name {
        en
      }
      country
      website
      status
    }
  }
`

export const getStaticProps: GetStaticProps<BasicCompanyProps> = async () => {
  const data = await graphqlReq(GET_DATA)

  return {
    props: {
      companies: data.companies.map((company: any) => ({
        ...company,
        name: company.name.en,
      })),
    },
    revalidate: 60
  }
}
