import axios from "axios";
import { useRouter } from "next/router";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import Head from "next/head";
import React, { useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";
import PostCard from "../../components/PostCard";

const Post = () => {
  const { singlePost } = useSelector((state) => state.post);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log("singlePost: ", singlePost);
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}&aposs content</title>
        <meta name="description" content={singlePost.content} />
        <meta
          property="og:title"
          content={`${singlePost.User.nickname}'s post.'`}
        />
        <meta property="og:description" content={singlePost.content} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    console.log(context);
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
      data: context.params.id,
      // or data: context.query.id
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Post;