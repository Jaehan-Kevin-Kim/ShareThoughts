import { Avatar, Button, Card } from "antd";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userService";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("me", me);
  }, [me]);

  const onLogout = useCallback(() => {
    // setIsLoggedIn(false);
    dispatch(logout());
    // dispatch(logoutRequestAction());
  }, []);

  return (
    <>
      <Card
        actions={[
          <div key="posts">
            Posts
            <br />
            {me.Posts.length}
          </div>,
          <div key="followings">
            Following
            <br />
            {me.Followings.length}
          </div>,
          <div key="followers">
            Followers
            <br />
            {me.Followers.length}
          </div>,
        ]}>
        <Card.Meta
          avatar={<Avatar>{me.nickname}</Avatar>}
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
