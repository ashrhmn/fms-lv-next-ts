import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
const SideBarLogout = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("Authorization");
    router.reload();
  };
  return (
    <div className="rounded p-2 w-full transition-colors hover:bg-red-600 hover:text-white cursor-pointer">
      <div onClick={handleLogout} className="w-48 mx-auto">
        Logout
      </div>
    </div>
  );
};

export default SideBarLogout;
