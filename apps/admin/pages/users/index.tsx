import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserTable, {myuser} from "@/components/Tables/UserTable";
import { gql, graphqlReq, withAuth } from "common";

const UserPage = () => {
  const [users, setUsers] = useState<myuser[]>([])

  useEffect(() => {
    ;(async () => {
      const data = await graphqlReq(GET_DATA)
      setUsers(
        data.users
      )
    })()
  }, [])

  return (
    <>
      {/* @ts-ignore */}
      <Breadcrumb pageName="Users" href="/users/create" />

      <div className="flex flex-col gap-10">
        <UserTable users={users} func={(users) => setUsers(users)} />
      </div>
    </>
  );
};

export default withAuth(UserPage, 'admin');

const GET_DATA = gql`
  query {
    users(descCreatedAt: true) {
      _id
      fullName
      email
      role
    }
  }
`
