import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { loadPosts } from "../features/post/postService";
import { loadMyInfo } from "../features/user/userService";
import wrapper from "../store/configureStore";

const Home = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { me } = useSelector((state) => state.user);
  const {
    mainPosts,
    hasMorePost,
    loadPostsLoading,
    retweetError,
    addReportDone,
    addReportError,
  } = useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }

    if (addReportDone) {
      alert("Your valuable report has been submitted successfully.");
    }

    if (addReportError) {
      console.log("addReportError: ", addReportError);
      alert(addReportError);
    }
  }, [retweetError, addReportDone, addReportError]);

  useEffect(() => {
    function onScroll() {
      // console.log(
      //   window.scrollY,
      //   window.pageYOffset,
      //   document.documentElement.clientHeight,
      //   document.documentElement.scrollHeight,
      // );
      if (
        Math.round(window.scrollY) + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        //아래는 loadPostRequest가 여러번 실행되는걸 막기위한 옵션 (!loadPostsLoading을 추가한 부분)
        if (hasMorePost && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadPosts(lastId));
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    //useEffect에서 window.addListener 할 때, 항상 조심해야 하는것은 반드시 return을 해서 해당 eventListener를 지워줘야 함. 안그러면 계속 메모리에 남아있어서 심각한 문제가 생길 수 있음.
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, loadPostsLoading, mainPosts]);

  return (
    <>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    // console.log("context check: ", context);

    await context.store.dispatch(loadMyInfo());

    await context.store.dispatch(loadPosts());

    // await context.store.dispatch(END);
    // await context.store.sagaTask.toPromise();
  },
);

export default Home;
