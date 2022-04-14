import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import React from "react";
import FlightList from "../../components/Dashboard/User/FlightList";
import { service } from "../../service";
import { IFlight } from "../../types";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface Props {
  flights: IFlight[];
  tab: string;
  hasError: boolean;
}

const UserDashboard: NextPage<Props> = ({ tab, flights, hasError }) => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.reload();
  };
  if (hasError) return <div>Error</div>;
  return (
    <div className="relative">
      <div className="flex flex-col absolute left-0 h-[100vh] w-[300px] items-start text-2xl bg-gray-100 mx-auto p-2">
        <Link href={`?tab=book`}>Book Flight</Link>
        <Link href={`?tab=orders`}>Previous Orders</Link>
        <Link href={`?tab=pending-flights`}>Pending Flights</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="ml-[300px] p-10">
        <div>{tab == "book" && <FlightList flights={flights} />}</div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    // const { data: currentUser } = await service(context).get(
    //   `auth/current-user`
    // );

    // if (currentUser.data.role !== "User")
    //   return { props: {}, redirect: { destination: "/auth/sign-in" } };

    const tabs = ["book", "orders", "pending-flights", "booking"];
    let tab: string = context.query.tab as string;
    if (!tabs.includes(tab)) tab = tabs[0];
    switch (tab) {
      case "book":
        const { data: flights } = await service(context).get(`user-db/flights`);
        return { props: { flights: flights.data, tab, hasError: false } };
      case "booking":
        return { props: { tab, hasError: false } };
      default:
        return { props: { tab, hasError: false } };
    }
  } catch (error) {
    console.log("User Dashboard Error : ", error);
    return { props: { hasError: true } };
  }
};

export default UserDashboard;
