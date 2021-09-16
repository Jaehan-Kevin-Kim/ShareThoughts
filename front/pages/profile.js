import React, { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const profile = () => {
  const { me } = useSelector((state) => state.user);

  console.log(me);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Profile | Share Thoughts</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="Following List" data={me.Followings} />
        <FollowList header="Follower List" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default profile;
