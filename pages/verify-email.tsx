import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Cookies from "js-cookie";
import React from "react";
import { baseApiUrl } from "../consts";
import { service } from "../service";

const VerifyEmailPage: NextPage = () => {
  const handleResendMail = async () => {
    try {
      const token = Cookies.get("token");
      const { data: response } = await service().get(
        `${baseApiUrl}api/auth/resend-verification-mail`,
        { headers: { Authorization: token ?? "" } }
      );
      alert(response.Message);
    } catch (error) {
      console.log(error);
      alert("Error sending mail");
    }
  };
  return (
    <div className="flex h-[100vh] flex-col justify-center items-center text-2xl text-center">
      <h1 className="p-6">
        Please verify your email. If you have already try refreshing the page
      </h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white transition-colors rounded p-2 w-80"
        onClick={handleResendMail}
      >
        Re-send verification mail
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
    if (currentUser.data.Verified)
      return { props: {}, redirect: { destination: "/dashboard" } };
  } catch (error) {
    console.log("v currerr :", error);
  }
  return { props: {} };
};

export default VerifyEmailPage;
