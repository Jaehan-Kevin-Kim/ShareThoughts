import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
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
            Posts
            <br />{me.Posts.length}
          </div>,
          <div key="followings">
            Following
            <br />{me.Followings.length}
          </div>,
          <div key="followers">
            Followers
            <br />{me.Followers.length}
          </div>,
        ]}>
        <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} />
        <Button onClick={onLogout} loading={logOutLoading}>
          Logout
        </Button>
      </Card>
    </>
  );
};

export default UserProfile;
