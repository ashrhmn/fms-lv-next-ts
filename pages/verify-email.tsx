import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { baseApiUrl } from "../consts";
import { service } from "../service";
import { useRouter } from "next/router";

const VerifyEmailPage: NextPage = () => {
  const router = useRouter();
  const [resendBtnDisabled, setResendBtnDisabled] = useState(false);
  const handleLogout = () => {
    Cookies.remove("token");
    router.reload();
  };
  const handleResendMail = async () => {
    setResendBtnDisabled(() => true);
    try {
      const token = Cookies.get("token") ?? "";
      const { data: response } = await service().get(
        `${baseApiUrl}api/auth/resend-verification-mail`,
        { headers: { token } }
      );
      alert(response);
    } catch (error) {
      console.log(error);
      alert("Error sending mail");
    }
    setResendBtnDisabled(false);
  };
  return (
    <div className="flex h-[100vh] flex-col justify-center items-center text-2xl text-center">
      <h1 className="p-6">
        Please verify your email. If you have already try refreshing the page
      </h1>
      <button
        className="bg-blue-500 disabled:bg-blue-300 disabled:cursor-progress hover:bg-blue-700 text-white transition-colors rounded p-2 w-80 m-2"
        disabled={resendBtnDisabled}
        onClick={handleResendMail}
      >
        Re-send verification mail
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white transition-colors rounded p-2 w-80 m-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { data: currentUser } = await service(context).get(
      `${baseApiUrl}api/auth/current-user`
    );
    console.log("V Curr", currentUser);
    if (currentUser.data.verified)
      return { props: {}, redirect: { destination: "/dashboard" } };
  } catch (error) {
    console.log("v currerr :", error);
  }
  return { props: {} };
};

export default VerifyEmailPage;
