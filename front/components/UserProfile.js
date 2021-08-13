import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import PropTypes from "prop-types";

const UserProfile = ({ setIsLoggedIn }) => {
  const onLogout = useCallback(() => {
    setIsLoggedIn(false);
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

UserProfile.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default UserProfile;
