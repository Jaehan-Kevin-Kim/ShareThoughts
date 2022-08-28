import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { logoutRequestAction } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    // setIsLoggedIn(false);
    dispatch(logoutRequestAction());
  }, []);

  return (
    <>
      <Card
        actions={[
          <div key="posts">
            <Link href={`/user/${me.id}`}>
              <a>
                Posts
                <br />
                {me.Posts.length}
              </a>
            </Link>
          </div>,
          <div key="followings">
            <Link href="/profile">
              <a>
                Following
                <br />
                {me.Followings.length}
              </a>
            </Link>
          </div>,
          <div key="followers">
            <Link href="/profile">
              <a>
            Followers
            <br />
            {me.Followers.length}
                </a>
                </Link>
          </div>,
        ]}>
        <Card.Meta
          avatar={
            <Link href={`/user/${me.id}`}>
              <a>
                <Avatar>{me.nickname[0]}</Avatar>
              </a>
            </Link>
          }
          title={me.nickname}
        />
        <Button onClick={onLogout} loading={logOutLoading}>
          Logout
        </Button>
      </Card>
    </>
  );
};

export default UserProfile;
