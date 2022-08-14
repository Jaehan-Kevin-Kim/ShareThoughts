import { Button } from "antd";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../features/user/userService";

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user,
  );

  const isFollowing = me && me.Followings.find((v) => v.id === post.User.id);

  const onFollow = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollow({ userId: post.User.id }));
      // dispatch({
      //   type: UNFOLLOW_REQUEST,
      //   data: post.User.id,
      // });
    } else {
      dispatch(follow({ userId: post.User.id }));
      // dispatch({
      //   type: FOLLOW_REQUEST,
      //   data: post.User.id,
      // });
    }
  }, [isFollowing]);

  if (post.User.id === me.id) {
    return null;
  }
  return (
    <Button loading={followLoading || unfollowLoading} onClick={onFollow}>
      {isFollowing ? "UnFollow" : "Follow"}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default FollowButton;
