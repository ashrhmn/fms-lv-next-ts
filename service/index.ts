import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { baseApiUrl } from "../consts";

export const service = (context: GetServerSidePropsContext | null = null) =>
  axios.create({
    baseURL: `${baseApiUrl}api/`,
    headers: {
      Authorization: context == null ? "" : context.req.cookies.token ?? "",
    },
  });
