import { useAppSelector } from "@hooks/reduxHooks";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import { loadPost } from "../../features/post/postService";
import { loadMyInfo } from "../../features/user/userService";
import wrapper from "../../store/configureStore";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const Post = () => {
  const { singlePost } = useAppSelector((state) => state.post);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log("singlePost: ", singlePost);
  }, []);

  // if (router.isFallback) {
  //   return <div> Loading... </div>;
  // }

  return (
    <AppLayout>
      <Head>
        <title>{singlepost.author.nickname}&aposs content</title>
        <meta name="description" content={singlePost.content} />
        <meta
          property="og:title"
          content={`${singlepost.author.nickname}'s post.`}
        />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={singlePost.Images[0] && singlePost.Images[0].src}
        />
        <meta
          property="og:url"
          content={`http://sharethoughts.online/post/${id}`}
        />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      const cookie = context.req ? context.req.headers.cookie : "";
      // // console.log(context);
      axios.defaults.headers.Cookie = "";
      if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      await store.dispatch(loadMyInfo());

      await store.dispatch(loadPost(+context.params.id));

      // context.store.dispatch({
      //   type: LOAD_MY_INFO_REQUEST,
      // });
      // context.store.dispatch({
      //   type: LOAD_POST_REQUEST,
      //   data: context.params.id,
      //   // or data: context.query.id
      // });

      // context.store.dispatch(END);
      // await context.store.sagaTask.toPromise();

      return { props: {} };
    },
  );

export default Post;
