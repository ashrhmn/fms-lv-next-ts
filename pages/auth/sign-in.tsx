import { NextPage } from "next";
import React from "react";
import useInput from "../../hooks/useInput";
import { service } from "../../service";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

const SignInPage: NextPage = () => {
  const usernameInputController = useInput();
  const passwordInputController = useInput();
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const { data: response } = await service().post(`auth/sign-in`, {
        username: usernameInputController.value,
        password: passwordInputController.value,
      });
      Cookies.set("token", response.data.value);
      router.reload();
    } catch (error) {
      console.log("sign-in : ", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex p-6 border-2 rounded-lg flex-col w-96 justify-center gap-10 items-center text-2xl">
        <input
          className="w-full p-4 rounded"
          placeholder="Username"
          type="text"
          {...usernameInputController}
        />
        <input
          className="w-full p-4 rounded"
          placeholder="Password"
          type="password"
          {...passwordInputController}
        />
        <div className="flex gap-4 justify-center">
          <button
            className="bg-green-500 text-white hover:bg-green-700 transition-colors p-4 rounded w-40"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <Link passHref href={`/auth/sign-up`}>
            <button className="bg-blue-500 text-white hover:bg-blue-700 transition-colors p-4 rounded w-40">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
