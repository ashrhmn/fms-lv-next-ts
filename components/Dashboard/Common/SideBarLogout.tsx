import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
const SideBarLogout = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.reload();
  };
  return (
    <div
      onClick={handleLogout}
      className="w-52 rounded p-2 transition-colors hover:bg-red-600 hover:text-white cursor-pointer"
    >
      Logout
    </div>
  );
};

export default SideBarLogout;
