import Link from "next/link";
import React from "react";
import { makeId } from "../../../utils/String";

const SideBarLink = ({ name }: { name: string }) => {
  return (
    <Link passHref href={`?tab=${makeId(name)}`}>
      <div className="w-52 rounded p-2 transition-colors hover:bg-blue-700 hover:text-white cursor-pointer">
        {name}
      </div>
    </Link>
  );
};

export default SideBarLink;
