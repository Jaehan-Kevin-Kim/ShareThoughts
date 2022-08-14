import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";
import {
  loadFollowers,
  loadFollowings,
  loadMyInfo,
} from "../features/user/userService";

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  // console.log(me);

  useEffect(() => {
    // dispatch(loadFollowers());
    // dispatch(loadFollowings());

    dispatch(loadMyInfo());

    // dispatch({
    //   type: LOAD_FOLLOWERS_REQUEST,
    // });
    // dispatch({
    //   type: LOAD_FOLLOWINGS_REQUEST,
    // });
  }, []);

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

export default Profile;
