import styled from "@emotion/styled";
import {
  Avatar,
  Button,
  Card,
  Comment,
  Input,
  List,
  Modal,
  Popover,
} from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {
  addLike,
  addReport,
  postAppeal,
  removeImage,
  removeLike,
  removePost,
  retweet,
  updatePost,
} from "../features/post/postService";
import useInput from "../hooks/useInput";
import CommentForm from "./CommentForm";
import FollowButton from "./FollowButton";
import PostCardContent from "./PostCardContent";
import PostImages from "./PostImages";

// 아래 게시글 순서를 강제로 변경함 (나중에 report 됬을 때 masking 하기 위해서, 그리고 보기도 더 좋음)
const CardItem = styled(Card)`
  display: grid !important;
  .ant-card-body {
    order: 1 !important;
  }
  .ant-card-cover {
    order: 2 !important;
  }
  .ant-card-actions {
    order: 3 !important;
  }
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [openAppealModal, setOpenAppealModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reasonText, onChangeReasonText, setReasonText] = useInput("");
  const [appealText, onChangeAppealText, setAppealText] = useInput("");

  const { me } = useSelector((state) => state.user);
  const {
    removePostLoading,
    retweetError,
    addLikeDone,
    removeLikeDone,
    addReportDone,
    addReportError,
    loadReportsDone,
  } = useSelector((state) => state.post);
  const id = me?.id;

  useEffect(() => {
    console.log("post in postCard: ", post);
    const { Likers } = post;
    console.log("Likers: ", Likers);
    console.log("Likers.length: ", Likers?.length);
    // 아래 조건문 변경 하기
    if (me && Likers?.length > 0) {
      Likers.forEach((v) => {
        if (v.id === me.id) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });
    } else {
      setLiked(false);
    }
  }, [me, liked, addLikeDone, removeLikeDone]);

  // useEffect(() => {
  //   if (addReportDone) {
  //     alert("Your valuable report has been submitted successfully.");
  //   }
  // }, [addReportError]);

  useEffect(() => {
    if (addReportError || addReportDone) {
      setOpenReportModal(false);
    }
  }, [addReportError, addReportDone]);

  const onChangePost = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelChangePost = useCallback(() => {
    setEditMode(false);
  }, []);

  const onRemoveImage = useCallback(
    (src) => () => {
      dispatch(removeImage({ postId: post.id, src }));
      // dispatch({
      //   type: REMOVE_IMAGE_REQUEST,
      //   data: {
      //     postId: post.id,
      //     src,
      //   },
      // });
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
      dispatch(updatePost({ postId: post.id, formData }));
      // dispatch({
      //   type: UPDATE_POST_REQUEST,
      //   data: {
      //     postId: post.id,
      //     // content: editText,
      //     formData,
      //   },
      // });
    },
    [post],
  );

  const onToggleLike = useCallback(() => {
    if (!me) {
      return alert("Login is required to give a Like!");
    }

    // setLiked((prev) => !prev);
    console.log("liked: ", liked);
    if (!liked) {
      dispatch(addLike(post.id));
      // dispatch({
      //   type: ADD_LIKE_REQUEST,
      //   data: post.id,
      // });
    } else {
      dispatch(removeLike(post.id));
      // dispatch({
      //   type: REMOVE_LIKE_REQUEST,
      //   data: post.id,
      // });
    }

    return null;
  }, [liked]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, [commentFormOpened]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert("Login is required");
    }
    return dispatch(retweet(post.id));
    // return dispatch({
    //   type: RETWEET_REQUEST,
    //   data: post.id,
    // });
  }, [id]);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert("Login is required");
    }
    return dispatch(removePost(post.id));
  }, [id]);

  const onOpenAppealModal = useCallback(() => {
    setOpenAppealModal(true);
  }, [openAppealModal]);

  const onClickAppealModalSubmit = useCallback(() => {
    // setOpenAppealModal(true);
    console.log("appealText: ", appealText);
    if (!appealText || appealText.split(" ").join("").length < 30) {
      console.log("not satisfied");
      return alert("Please write at least 30 letters for the appeal letter");
    }

    setAppealText("");
    setOpenAppealModal(false);
    return dispatch(postAppeal({ postId: post.id, appeal: appealText }));
  }, [openAppealModal, appealText]);

  const onClickAppealModalCancel = useCallback(() => {
    setOpenAppealModal(false);
    setAppealText("");
  }, [openAppealModal]);

  const onOpenReportModal = useCallback(() => {
    if (!id) {
      return alert("Login is required");
    }

    if (post.User.id === id) {
      return alert("You cannot submit a report for your own Post.");
    }
    return setOpenReportModal(true);
  }, [openReportModal]);

  const onClickReportModalSubmit = useCallback(() => {
    // setOpenAppealModal(true);
    if (!reasonText || !reasonText.trim()) {
      return alert("Please write a reason why you are reporting this post");
    }

    setReasonText("");
    // setOpenReportModal(false);
    return dispatch(addReport({ postId: post.id, reason: reasonText }));
  }, [openReportModal, reasonText]);

  const onClickReportModalCancel = useCallback(() => {
    setOpenReportModal(false);
    setReasonText("");
  }, [openReportModal]);

  return (
    <>
      <Modal
        title="Write an appeal letter"
        visible={openAppealModal}
        okText="Submit"
        onOk={onClickAppealModalSubmit}
        onCancel={onClickAppealModalCancel}
        // okButtonProps={{ disabled: true }}
        // cancelButtonProps={{ disabled: true }}
      >
        <Input.TextArea
          value={appealText}
          onChange={onChangeAppealText}
          maxLength={140}
          rows={4}
          placeholder="Write your appeal letter here at least with 30 letters..."
        />
      </Modal>
      <Modal
        title="Report this post"
        visible={openReportModal}
        okText="Submit"
        onOk={onClickReportModalSubmit}
        onCancel={onClickReportModalCancel}
        // okButtonProps={{ disabled: true }}
        // cancelButtonProps={{ disabled: true }}
      >
        <Input.TextArea
          value={reasonText}
          onChange={onChangeReasonText}
          maxLength={140}
          rows={4}
          placeholder="Please write here why you are reporting this post."
        />
      </Modal>

      <div style={{ marginBottom: 20 }}>
        <CardItem
          cover={
            !post.lockStatus &&
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
                      <Button onClick={onOpenReportModal}>Report</Button>
                      {post.lockStatus && post.User.id === id && (
                        <Button type="primary" onClick={onOpenAppealModal}>
                          Appeal
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button onClick={onOpenReportModal}>Report</Button>
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
                !post.lockStatus &&
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
                    lockStatus={post.lockStatus}
                    postData={post.Retweet.content}
                    onCancelChangePost={onCancelChangePost}
                    onUpdatePost={onUpdatePost}
                    reports={post.Reports}
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
                    lockStatus={post.lockStatus}
                    editMode={editMode}
                    onCancelChangePost={onCancelChangePost}
                    postData={post.content}
                    post={post}
                    onUpdatePost={onUpdatePost}
                    reports={post.Reports}
                    onOpenAppealModal={onOpenAppealModal}
                  />
                }
              />
            </>
          )}

          {/* <Buttons></Buttons> */}
          {/* <CommentForm />
      <Comments /> */}
        </CardItem>
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
    </>
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
    Reports: PropTypes.objectOf(PropTypes.any),
    lockStatus: PropTypes.bool,
  }).isRequired,
};

export default PostCard;
