import React, { FC, useCallback } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { follow, unfollow } from "../features/user/userService";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { IPost } from "@typings/db";

interface Props {
  post: IPost;
}
const FollowButton: FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { me, followLoading, unfollowLoading } = useAppSelector(
    (state) => state.user,
  );

  const isFollowing = me && me.Followings.find((v) => v.id === post.User.id);

  const onFollow = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollow(post.User.id));
    } else {
      dispatch(follow(post.User.id));
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

// FollowButton.propTypes = {
//   post: PropTypes.shape({
//     id: PropTypes.number,
//     User: PropTypes.object,
//     content: PropTypes.string,
//     createdAt: PropTypes.string,
//     Comments: PropTypes.arrayOf(PropTypes.object),
//     Images: PropTypes.arrayOf(PropTypes.object),
//   }).isRequired,
// };

export default FollowButton;
