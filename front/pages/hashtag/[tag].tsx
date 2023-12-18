import { Avatar, Card } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import axios from "axios";
import _ from "lodash";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import { loadHashtagPosts } from "../../features/post/postService";
import { loadMyInfo } from "../../features/user/userService";
import wrapper from "../../store/configureStore";
import { IPost } from "@typings/db";

const Hashtag = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { tag } = router.query;
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
          //   loadHashtagPosts({
          //     lastId:
          //       mainPosts[mainPosts.length - 1] &&
          //       mainPosts[mainPosts.length - 1].id,
          //     data: tag,
          //   }),
          // );
          const throttledLoadHashtagPosts = _.throttle(
            (dispatch, data, lastId) => {
              dispatch(loadHashtagPosts({ data, lastId }));
            },
            5000,
          );

          // 사용 예
          throttledLoadHashtagPosts(
            dispatch,
            "hashtag",
            mainPosts[mainPosts.length - 1] &&
              mainPosts[mainPosts.length - 1].id,
          );

          // dispatch({
          //   type: LOAD_HASHTAG_POSTS_REQUEST,
          //   lastId:
          //     mainPosts[mainPosts.length - 1] &&
          //     mainPosts[mainPosts.length - 1].id,
          //   data: tag,
          // });
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length, hasMorePosts, tag, loadPostsLoading]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>{userInfo.nickname} post</title>
          <meta name="description" content={`${userInfo.nickname}'s post.`} />
          <meta property="og:title" content={`${userInfo.nickname}'s post.`} />
          <meta
            property="og:description"
            content={`${userInfo.nickname}'s post.`}
          />
        </Head>
      )}
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              tweet
              <br />
              {userInfo.Posts?.length}
            </div>,
            <div key="following">
              Following
              <br />
              {userInfo.Followings?.length}
            </div>,
            <div key="follower">
              Follower
              <br />
              {userInfo.Followers?.length}
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

// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps(async (context: GetServerSidePropsContext) => {
//     const cookie = context.req ? context.req.headers.cookie : "";
//     axios.defaults.headers.Cookie = "";
//     if (context.req && cookie) {
//       axios.defaults.headers.Cookie = cookie;
//     }

//     await context.store.dispatch(loadHashtagPosts(context.params.tag));
//     // context.store.dispatch({
//     //   type: LOAD_HASHTAG_POSTS_REQUEST,
//     //   data: context.params.tag,
//     // });

//     await context.store.dispatch(loadMyInfo());
//     // context.store.dispatch({
//     //   type: LOAD_MY_INFO_REQUEST,
//     // });
//     // context.store.dispatch({
//     //   type: LOAD_USER_REQUEST,
//     //   data: context.params.id,
//     // });
//     // await context.store.dispatch(END);
//     // await context.store.sagaTask.toPromise();
//     console.log("getState", context.store.getState().post.mainPosts);
//     return { props: {} };
//   }) satisfies GetServerSideProps;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      const cookie = context.req ? context.req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";

      if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      // Dispatch actions as needed
      await store.dispatch(
        loadHashtagPosts({ data: context.params.tag as string }),
      );
      await store.dispatch(loadMyInfo());

      // Optional: You might want to access the updated state after dispatching actions
      const state = store.getState();
      // console.log("Updated state: ", state);

      // Return an empty props object
      return { props: {} };
    },
  );
export default Hashtag;
