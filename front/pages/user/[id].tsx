import React from "react";

import { Avatar, Card } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import axios from "axios";
import _ from "lodash";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import { loadUserPosts } from "../../features/post/postService";
import { loadMyInfo, loadUser } from "../../features/user/userService";
import wrapper from "../../store/configureStore";

const User = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { mainPosts, hasMorePosts, loadPostsLoading } = useAppSelector(
    (state) => state.post,
  );
  const { userInfo } = useAppSelector((state) => state.user);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          // dispatch(
          //   loadUserPosts({
          //     lastId:
          //       mainPosts[mainPosts.length - 1] &&
          //       mainPosts[mainPosts.length - 1].id,
          //     data: id,
          //   }),
          // );
          const throttleLoadUserPosts = _.throttle(
            (dispatch, data: number, lastId: number) => {
              dispatch(loadUserPosts({ data, lastId }));
            },
          );

          throttleLoadUserPosts(
            dispatch,
            +id,
            mainPosts[mainPosts.length - 1] &&
              mainPosts[mainPosts.length - 1].id,
          );

          // dispatch({
          //   type: LOAD_USER_POSTS_REQUEST,
          //   lastId:
          //     mainPosts[mainPosts.length - 1] &&
          //     mainPosts[mainPosts.length - 1].id,
          //   data: id,
          // });
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>{userInfo.nickname} post</title>
          <meta name="description" content={`${userInfo.nickname}'s post.'`} />
          <meta property="og:title" content={`${userInfo.nickname}'s post.'`} />
          <meta
            property="og:description"
            content={`${userInfo.nickname}'s post.'`}
          />
          <meta
            property="og:url"
            content={`http://sharethoughts.online/user/${id}`}
          />
        </Head>
      )}
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              tweet
              <br />
              {userInfo.Posts.length}
            </div>,
            <div key="following">
              Following
              <br />
              {userInfo.Followings.length}
            </div>,
            <div key="follower">
              Follower
              <br />
              {userInfo.Followers.length}
            </div>,
          ]}>
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    await store.dispatch(
      loadUserPosts({ data: +context.params.id, lastId: 0 }),
    );
    // context.store.dispatch({
    //   type: LOAD_USER_POSTS_REQUEST,
    //   data: context.params.id,
    // });
    await store.dispatch(loadMyInfo());
    // store.dispatch({
    //   type: LOAD_MY_INFO_REQUEST,
    // });
    await store.dispatch(loadUser(+context.params.id));
    // context.store.dispatch({
    //   type: LOAD_USER_REQUEST,
    //   data: context.params.id,
    // });
    // context.store.dispatch(END);
    // await context.store.sagaTask.toPromise();
    // // console.log("getState", store.getState().post.mainPosts);
    return { props: {} };
  },
);

export default User;
