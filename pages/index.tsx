import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Link href={`/auth/sign-in`}>Go</Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return { props: {}, redirect: { destination: "/auth/sign-in" } };
};

export default Home;
