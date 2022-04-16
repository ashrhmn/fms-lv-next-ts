import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { service } from "../../service";
import { ICity, ITransport, IUser } from "../../types";
import TicketSales from "../../components/Dashboard/Admin/Sales";
import { baseApiUrl } from "../../consts";
import UserList from "../../components/Dashboard/Admin/UserList";
import SideBarLink from "../../components/Dashboard/Common/SideBarLink";
import SideBarLogout from "../../components/Dashboard/Common/SideBarLogout";
import DashboardLayout from "../../components/Layout/Dashboard";
import { makeId } from "../../utils/String";

interface Props {
  transports: ITransport[];
  users: IUser[];
  cities: ICity[];
  tab: string;
  hasError: boolean;
}

const tabNames = ["Sales", "User List", "Pending Flights", "Flight List"];

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
        <TicketSales key={1} transports={transports} />,
        <UserList key={2} cities={cities} users={users} />,
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
      case "sales":
        const { data: response1 } = await service(context).get(
          `${baseApiUrl}api/admin-db/transports`
        );
        return { props: { transports: response1.data, tab } };
      case "user-list":
        const { data: response2 } = await service(context).get(
          `${baseApiUrl}api/admin-db/users`
        );
        const { data: response3 } = await service(context).get(
          `${baseApiUrl}api/admin-db/cities`
        );
        return {
          props: { users: response2.data, cities: response3.data, tab },
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
