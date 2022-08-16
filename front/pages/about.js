import React from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import { END } from "redux-saga";
import { Avatar, Card } from "antd";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import { LOAD_USER_REQUEST } from "../reducers/user";

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>ZeroCho | NodeBird</title>
      </Head>
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
            description="description for card"
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

// export const getStaticProps = wrapper.getStaticProps(async (context) => {
//   console.log("getStaticProps");
//   context.store.dispatch({
//     type: LOAD_USER_REQUEST,
//     data: 1,
//   });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
// });

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: 1,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default About;
