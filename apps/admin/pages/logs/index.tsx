import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LogTable, { BasicLogProps } from "@/components/Tables/LogTable";
import { gql, graphqlReq, withAuth } from "common";
import { GetStaticProps } from "next";

const LogsPage = (props: BasicLogProps) => {
  
  const { logs } = props;

  return (
    <>
      {/* @ts-ignore */}
      <Breadcrumb pageName="Logs" update="none"/>

      <div className="flex flex-col gap-10">
        <LogTable logs={logs} />
      </div>
    </>
  );
};

export default withAuth(LogsPage, 'admin');

const GET_DATA = gql`
  query {
    logs {
      _id
      user {
        fullName
      }
      description {
        en
      }
      createdAt
    }
  }
`

export const getStaticProps: GetStaticProps<BasicLogProps> = async () => {
    const data = await graphqlReq(GET_DATA)

    return {
      props: {
        logs: data.logs.map((log: any) => ({
          _id: log._id,
          fullName: log.user.fullName,
          description: log.description.en,
          time: new Date(log.createdAt).toLocaleString()
        })),
      },
      revalidate: 60
    }
  }
  