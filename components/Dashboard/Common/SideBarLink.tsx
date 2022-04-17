import Link from "next/link";
import React from "react";
import { makeId } from "../../../utils/String";

const SideBarLink = ({
  name,
  currentTab = "",
}: {
  name: string;
  currentTab?: string;
}) => {
  return (
    <Link passHref href={`?tab=${makeId(name)}`}>
      <div
        className={`w-full rounded p-2 transition-colors ${
          currentTab == makeId(name) ? "bg-blue-600 text-white" : ""
        } hover:bg-blue-700 hover:text-white cursor-pointer flex`}
      >
        <div className={`w-48 mx-auto`}>{name}</div>
      </div>
    </Link>
  );
};

export default SideBarLink;
