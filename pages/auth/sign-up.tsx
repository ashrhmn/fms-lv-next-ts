import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useInput from "../../hooks/useInput";
import { service } from "../../service";
import { ICity } from "../../types";
interface Props {
  cities: ICity[];
}

const SignUpPage: NextPage<Props> = ({ cities }) => {
  const usernameIc = useInput();
  const nameIc = useInput();
  const passwordIc = useInput();
  const password2Ic = useInput();
  const emailIc = useInput();
  const phoneIc = useInput();
  const dobIc = useInput();
  const addressIc = useInput();
  const cityIdIc = useInput(cities[0].id.toString());

  const router = useRouter();

  const handleSignUp = async () => {
    if (passwordIc.value != password2Ic.value) return;
    const body = {
      username: usernameIc.value,
      password: passwordIc.value,
      name: nameIc.value,
      dateOfBirth: dobIc.value,
      address: addressIc.value,
      email: emailIc.value,
      phone: phoneIc.value,
      role: "User",
      cityId: cityIdIc.value,
    };
    try {
      const response = await service().post(`auth/sign-up`, body);
      console.log(response.data);
      router.push("/auth/sign-in");
    } catch (error) {
      console.log("Sign up error : ", error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center h-[100vh]">
      <h1 className="text-6xl font-bold">Sign Up</h1>
      <div className="flex flex-col text-xl gap-4 p-6 rounded-lg border-2 w-96 justify-center items-center border-[#ccc]">
        <input
          className="w-full p-4 rounded border-2"
          type="text"
          placeholder="Username"
          {...usernameIc}
        />
        <input
          className="w-full p-4 rounded border-2"
          type="text"
          placeholder="Name"
          {...nameIc}
        />
        <input
          className="w-full p-4 rounded border-2"
          type="password"
          placeholder="Password"
          {...passwordIc}
        />
        <input
          className="w-full p-4 rounded border-2"
          type="password"
          placeholder="Confirm Password"
          {...password2Ic}
        />
        <input
          className="w-full p-4 rounded border-2"
          type="text"
          placeholder="Email"
          {...emailIc}
        />
        <input
          className="w-full p-4 rounded border-2"
          type="text"
          placeholder="Phone"
          {...phoneIc}
        />
        <input
          className="w-full p-4 rounded border-2"
          type="date"
          placeholder="Date of Birth"
          {...dobIc}
        />
        <textarea
          className="w-full p-4 rounded border-2"
          placeholder="Address"
          {...addressIc}
        ></textarea>
        <select {...cityIdIc} className="w-full p-4 rounded border-2">
          {cities.map((c) => (
            <option
              value={c.id}
              key={c.name}
            >{`${c.name}, ${c.country}`}</option>
          ))}
        </select>
        <div className="flex gap-4 justify-center">
          <Link passHref href={`/auth/sign-in`}>
            <button className="bg-green-500 text-white hover:bg-green-700 transition-colors p-4 rounded w-40">
              Sign In
            </button>
          </Link>
          <button
            className="bg-blue-500 text-white hover:bg-blue-700 transition-colors p-4 rounded w-40"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { data: cities } = await service().get(`auth/sign-up/cities`);
    return { props: { cities: cities.data } };
  } catch (error) {
    return { props: {} };
  }
};

export default SignUpPage;
