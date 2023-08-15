import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CompanyTable, { BasicCompanyProps } from "@/components/Tables/CompanyTable";
import { gql, graphqlReq } from "common";
import { GetStaticProps } from "next";

const SupplierPage = (props: BasicCompanyProps) => {

  const { companies } = props;

  return (
    <>
      <Breadcrumb pageName="Supplier Company" href="/company/suppliers/create" />

      <div className="flex flex-col gap-10">
        <CompanyTable companies={companies} />
      </div>
    </>
  );
};

export default SupplierPage;

const GET_DATA = gql`
  query {
    companies(companyType: "Supplier") {
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
