import { NextPage } from "next";
import React from "react";
import useInput from "../../hooks/useInput";
import { service } from "../../service";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

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
    <div>
      <input type="text" {...usernameInputController} />
      <input type="password" {...passwordInputController} />
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
};

export default SignInPage;
