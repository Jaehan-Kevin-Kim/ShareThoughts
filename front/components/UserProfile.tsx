import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { Avatar, Button, Card } from "antd";
import Link from "next/link";
import { useCallback } from "react";
import { logout } from "../features/user/userService";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { me, logOutLoading } = useAppSelector((state) => state.user);

  const onLogout = useCallback(() => {
    // setIsLoggedIn(false);
    dispatch(logout());
  }, []);

  return (
    <>
      <Card
        actions={[
          <div key="posts">
            <Link href={`/user/${me.id}`}>
              Posts
              <br />
              {me.Posts?.length}
            </Link>
          </div>,
          <div key="followings">
            <Link href="/profile">
              Following
              <br />
              {me.Followings?.length}
            </Link>
          </div>,
          <div key="followers">
            <Link href="/profile">
              Followers
              <br />
              {me.Followers?.length}
            </Link>
          </div>,
        ]}>
        <Card.Meta
          avatar={
            <Link href={`/user/${me.id}`}>
              <Avatar>{me.nickname[0]}</Avatar>
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
