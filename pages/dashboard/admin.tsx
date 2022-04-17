import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { service } from "../../service";
import { ICity, ITransport, IUser } from "../../types";
import { baseApiUrl } from "../../consts";
import UserList from "../../components/Dashboard/Admin/UserList";
import DashboardLayout from "../../components/Layout/Dashboard";
import { makeId } from "../../utils/String";
import AdminOverview from "../../components/Dashboard/Admin/Overview";

interface Props {
  transports: ITransport[];
  users: IUser[];
  cities: ICity[];
  tab: string;
  hasError: boolean;
}

const tabNames = ["Overview", "User List", "Pending Flights", "Flight List"];

const AdminDashboard: NextPage<Props> = ({
  transports,
  users,
  cities,
  tab,
  hasError = false,
}) => {
  if (hasError) return <div>Error</div>;
  return (
    <DashboardLayout
      currentTab={tab}
      tabs={tabNames}
      elements={[
        <AdminOverview key={1} transports={transports} cities={cities} />,
        <UserList key={2} users={users} />,
      ]}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const tabs = tabNames.map((tab) => makeId(tab));
    let tab: string = context.query.tab as string;
    if (!tabs.includes(tab)) tab = tabs[0];
    switch (tab) {
      case tabs[0]:
        const { data: response1 } = await service(context).get(
          `${baseApiUrl}api/admin-db/transports`
        );
        const { data: response2 } = await service(context).get(
          `${baseApiUrl}api/admin-db/cities`
        );
        return {
          props: { transports: response1.data, cities: response2.data, tab },
        };
      case tabs[1]:
        const { data: response3 } = await service(context).get(
          `${baseApiUrl}api/admin-db/users`
        );
        return {
          props: { users: response3.data, tab },
        };
      default:
        return { props: { tab } };
    }
  } catch (error) {
    console.log("Admin Dashboard Error : ", error);
    return { props: { hasError: true } };
  }
};

export default AdminDashboard;
