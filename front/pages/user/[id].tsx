import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Card } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";

import axios from "axios";
import PostCard from "../../components/PostCard";
import wrapper from "../../store/configureStore";
import AppLayout from "../../components/AppLayout";
import { loadUserPosts } from "../../features/post/postService";
import { loadMyInfo, loadUser } from "../../features/user/userService";
import _ from "lodash";

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post,
  );
  const { userInfo } = useSelector((state) => state.user);

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
            (dispatch, data: string, lastId: number) => {
              dispatch(loadUserPosts({ data, lastId }));
            },
          );

          throttleLoadUserPosts(
            dispatch,
            id,
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
              {userInfo.Posts}
            </div>,
            <div key="following">
              Following
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              Follower
              <br />
              {userInfo.Followers}
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
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch(loadUserPosts(context.params.id));
    // context.store.dispatch({
    //   type: LOAD_USER_POSTS_REQUEST,
    //   data: context.params.id,
    // });
    context.store.dispatch(loadMyInfo());
    // context.store.dispatch({
    //   type: LOAD_MY_INFO_REQUEST,
    // });
    context.store.dispatch(loadUser(context.params.id));
    // context.store.dispatch({
    //   type: LOAD_USER_REQUEST,
    //   data: context.params.id,
    // });
    // context.store.dispatch(END);
    // await context.store.sagaTask.toPromise();
    console.log("getState", context.store.getState().post.mainPosts);
    return { props: {} };
  },
);

export default User;
