import React from "react";
import { makeId } from "../../utils/String";
import SideBarLink from "../Dashboard/Common/SideBarLink";
import SideBarLogout from "../Dashboard/Common/SideBarLogout";

const DashboardLayout = ({
  tabs,
  elements,
  currentTab,
}: {
  tabs: string[];
  elements: JSX.Element[];
  currentTab: string;
}) => {
  return (
    <div className="relative">
      <div
        className={`flex flex-col fixed left-0 bottom-0 top-0 w-[250px] items-center text-2xl bg-gray-100 mx-auto p-2`}
      >
        {tabs.map((tab) => (
          <SideBarLink key={tab} currentTab={currentTab} name={tab} />
        ))}
        <SideBarLogout />
      </div>
      <div className={`ml-[250px] p-10`}>
        <div className="flex justify-center">
          {tabs.map(
            (tab, index) =>
              currentTab == makeId(tab) &&
              (elements[index] ?? (
                <div className="text-center font-bold text-7xl" key={index}>
                  Page Not Found
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
