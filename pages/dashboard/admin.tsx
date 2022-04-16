import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import React from "react";
import FlightList from "../../components/Dashboard/User/FlightList";
import { service } from "../../service";
import { IFlight, ITicket, ITransport, IUser } from "../../types";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import TicketSales from "../../components/Dashboard/Admin/Sales";
import { baseApiUrl } from "../../consts";
import UserList from "../../components/Dashboard/Admin/UserList";

interface Props {
  transports: ITransport[];
  users: IUser[];
  tab: string;
  hasError: boolean;
}

const AdminDashboard: NextPage<Props> = ({
  transports,
  users,
  tab,
  hasError = false,
}) => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.reload();
  };
  if (hasError) return <div>Error</div>;
  return (
    <div className="relative">
      <div className="flex flex-col fixed left-0 bottom-0 top-0 w-[300px] items-start text-2xl bg-gray-100 mx-auto p-2">
        <Link href={`?tab=sales`}>Sales</Link>
        <Link href={`?tab=user-list`}>User List</Link>
        <Link href={`?tab=pending-fligts`}>Pending Flights</Link>
        <Link href={`?tab=flight-list`}>Flights List</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="ml-[300px] p-10">
        {tab == "sales" && <TicketSales transports={transports} />}
        {tab == "user-list" && <UserList users={users} />}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const tabs = ["sales", "user-list", "pending-flights", "flight-list"];
    let tab: string = context.query.tab as string;
    if (!tabs.includes(tab)) tab = tabs[0];
    switch (tab) {
      case "sales":
        const { data: response1 } = await service().get(
          `${baseApiUrl}api/admin-db/transports`
        );
        return { props: { transports: response1.data, tab } };
      case "user-list":
        const { data: response2 } = await service().get(
          `${baseApiUrl}api/admin-db/users`
        );
        return { props: { users: response2.data, tab } };
      default:
        return { props: { tab } };
    }
  } catch (error) {
    console.log("Admin Dashboard Error : ", error);
    return { props: { hasError: true } };
  }
};

export default AdminDashboard;
