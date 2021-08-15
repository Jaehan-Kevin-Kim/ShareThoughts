import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logoutAction } from "../reducers";

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    // setIsLoggedIn(false);
    dispatch(logoutAction());
  }, []);

  return (
    <>
      <Card
        actions={[
          <div key="posts">
            Posts
            <br />0
          </div>,
          <div key="followings">
            Following
            <br />0
          </div>,
          <div key="followers">
            Followers
            <br />0
          </div>,
        ]}>
        <Card.Meta avatar={<Avatar>KK</Avatar>} title="Kevin Kim" />
        <Button onClick={onLogout}>Logout</Button>
      </Card>
    </>
  );
};

export default UserProfile;
