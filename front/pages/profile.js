import AppLayout from "../components/AppLayout";
import Head from "next/head";

const profile = () => {
  return (
    <>
      <Head>
        <title>Profile | Share Thoughts</title>
      </Head>
      <AppLayout>
        <div>Profile Page</div>
      </AppLayout>
    </>
  );
};

export default profile;
