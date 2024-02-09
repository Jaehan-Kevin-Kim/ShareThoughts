import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";
import { backEndUrl } from "../config/config";
import { loadMyInfo } from "../features/user/userService";
import wrapper from "../store/configureStore";
import { GetServerSideProps } from "next";

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const profile = () => {
  const dispatch = useAppDispatch();
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);
  // const { data, error } = useSWR(
  //   "${backEndUrl}/user/followers",
  //   fetcher,
  // );

  const { data: followingsData, error: followingError } = useSWR(
    `${backEndUrl}/user/followings?limit=${followingsLimit}`,
    fetcher,
  );
  const { data: followersData, error: followerError } = useSWR(
    `${backEndUrl}/user/followers?limit=${followersLimit}`,
    fetcher,
  );

  const { me } = useAppSelector((state) => state.user);

  /*
  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);
  */

  useEffect(() => {
    if (!(me && me.id)) {
      // console.log("The user has not logged in");

      Router.push("/");
    }
  }, [me && me.id]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  if (!me) {
    return "Loading my info...";
  }

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return <div>Error occurred while loading Followers or Followings data</div>;
  }

  return (
    <>
      <Head>
        <title>Profile | Share Thoughts</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="Followings"
          data={followingsData}
          onClickMore={loadMoreFollowings}
          loading={!followingError && !followingsData}
        />
        <FollowList
          header="Followers"
          data={followersData}
          onClickMore={loadMoreFollowers}
          loading={!followerError && !followersData}
        />
        {/* <FollowList header="Following List" data={me.Followings} />
        <FollowList header="Follower List" data={me.Followers} /> */}
      </AppLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req }) => {
    const cookie = req ? req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    // 쿠키가 브라우저에 있는 경우만 넣어서 실행
    // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await store.dispatch(loadMyInfo());

    return {
      props: {},
    };
  });

export default profile;
