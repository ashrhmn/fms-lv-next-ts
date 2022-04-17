import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import FlightList from "../../components/Dashboard/User/FlightList";
import { service } from "../../service";
import { IFlight } from "../../types";
import { makeId } from "../../utils/String";
import DashboardLayout from "../../components/Layout/Dashboard";

interface Props {
  flights: IFlight[];
  tab: string;
  hasError: boolean;
}

const tabNames = ["Book Flight", "Previous Orders", "Pending Flights"];
const UserDashboard: NextPage<Props> = ({ tab, flights, hasError }) => {
  if (hasError) return <div>Error</div>;
  return (
    <DashboardLayout
      currentTab={tab}
      tabs={tabNames}
      elements={[<FlightList key={1} flights={flights} />]}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const tabs = [...tabNames.map((tab) => makeId(tab)), "booking"];
    let tab: string = context.query.tab as string;
    if (!tabs.includes(tab)) tab = tabs[0];
    switch (tab) {
      case tabs[0]:
        const { data: flights } = await service(context).get(`user-db/flights`);
        return { props: { flights, tab, hasError: false } };
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
