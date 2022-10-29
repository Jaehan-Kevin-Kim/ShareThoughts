import React, { useCallback, useEffect, useState } from "react";
import { Card, Popover, Button, Avatar, List, Comment } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import Link from "next/link";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import {
  ADD_LIKE_REQUEST,
  REMOVE_IMAGE_REQUEST,
  REMOVE_POST_REQUEST,
  RETWEET_REQUEST,
  UPDATE_POST_REQUEST,
} from "../reducers/post";
import FollowButton from "./FollowButton";
import { REMOVE_LIKE_REQUEST } from "./../reducers/post";

// moment.locale("ko");

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const { me } = useSelector((state) => state.user);
  const { removePostLoading, retweetError } = useSelector(
    (state) => state.post,
  );
  const id = me?.id;

  useEffect(() => {
    console.log("post in postCard: ", post);
    const { Likers } = post;
    console.log("Likers: ", Likers);
    console.log("Likers.length: ", Likers.length);
    if (me && Likers.length > 0) {
      Likers.forEach((v) => {
        if (v.id === me.id) {
          setLiked(true);
        }
      });
    }
  }, [me]);

  const onChangePost = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelChangePost = useCallback(() => {
    setEditMode(false);
  }, []);

  const onRemoveImage = useCallback(
    (src) => () => {
      dispatch({
        type: REMOVE_IMAGE_REQUEST,
        data: {
          postId: post.id,
          src,
        },
      });
    },
    [post],
  );

  const onUpdatePost = useCallback(
    (formData) => {
      console.log("formData: ", formData);
      // for (let key of formData.keys()) {
      //   console.log(`${key}: ${formData.get(key)}`);
      // }

      // for (let value of formData.values()) {
      //   console.log(value);
      // }
      console.log("click");
      dispatch({
        type: UPDATE_POST_REQUEST,
        data: {
          postId: post.id,
          // content: editText,
          formData,
        },
      });
    },
    [post],
  );

  const onToggleLike = useCallback(() => {
    if (!me) {
      return alert("Login is required to give a Like!");
    }

    setLiked((prev) => !prev);
    console.log("liked: ", liked);
    if (!liked) {
      dispatch({
        type: ADD_LIKE_REQUEST,
        data: post.id,
      });
    } else {
      dispatch({
        type: REMOVE_LIKE_REQUEST,
        data: post.id,
      });
    }
  }, [liked]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, [commentFormOpened]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert("Login is required");
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert("Login is required");
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={
          post.Images[0] && (
            <PostImages
              onRemoveImage={onRemoveImage}
              editMode={editMode}
              images={post.Images}
            />
          )
        }
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#AF0000"
              key="heartTwoTone"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,

          <Popover
            key="popover"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    {!post.RetweetId && (
                      <Button onClick={onChangePost}>Modify</Button>
                    )}
                    <Button
                      type="danger"
                      onClick={onRemovePost}
                      loading={removePostLoading}>
                      Delete
                    </Button>
                    <Button>Report</Button>
                  </>
                ) : (
                  <Button>Report </Button>
                )}
              </Button.Group>
            }>
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.RetweetId ? `Retweet by ${post.User.nickname}.` : null}
        extra={id && <FollowButton post={post} />}>
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }>
            <div style={{ float: "right" }}>
              {moment(post.createdAt).format("YYYY.MM.DD")}
            </div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`}>
                  <a>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={
                <PostCardContent
                  postData={post.Retweet.content}
                  onCancelChangePost={onCancelChangePost}
                  onUpdatePost={onUpdatePost}
                />
              }
            />
          </Card>
        ) : (
          <>
            <div style={{ float: "right" }}>
              {moment(post.createdAt).format("YYYY.MM.DD")}
            </div>

            <Card.Meta
              avatar={
                <Link href={`/user/${post.User.id}`}>
                  <a>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={
                <PostCardContent
                  editMode={editMode}
                  onCancelChangePost={onCancelChangePost}
                  postData={post.content}
                  post={post}
                  onUpdatePost={onUpdatePost}
                />
              }
            />
          </>
        )}

        {/* <Buttons></Buttons> */}
        {/* <CommentForm />
      <Comments /> */}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />{" "}
          <List
            header={`${post.Comments.length} comments`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link href={`/user/${item.User.id}`}>
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
    Likers: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
