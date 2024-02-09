import styled from "@emotion/styled";
import { Avatar, Button, Card, Input, List, Modal, Popover } from "antd";
import { Comment } from "@ant-design/compatible";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";

import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
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
import { IComment, IPost } from "@typings/db";

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

interface PostCardProps {
  post: IPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const [liked, setLiked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [openAppealModal, setOpenAppealModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reasonText, onChangeReasonText, setReasonText] = useInput("");
  const [appealText, onChangeAppealText, setAppealText] = useInput("");

  const { me } = useAppSelector((state) => state.user);
  const {
    removePostLoading,
    retweetError,
    addLikeDone,
    removeLikeDone,
    addReportDone,
    addReportError,
    loadReportsDone,
  } = useAppSelector((state) => state.post);
  const id = me?.id;

  useEffect(() => {
    console.log("post in postCard: ", post);
    const { likers } = post;
    // console.log("likers: ", likers);
    // console.log("likers.length: ", likers?.length);
    // 아래 조건문 변경 하기
    if (me && likers?.length > 0) {
      likers.forEach((v) => {
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
      dispatch(removeImage(src));
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
      // console.log("formData: ", formData);
      // for (let key of formData.keys()) {
      //   // console.log(`${key}: ${formData.get(key)}`);
      // }

      // for (let value of formData.values()) {
      //   // console.log(value);
      // }
      // console.log("click");
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
    // console.log("liked: ", liked);
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
    // console.log("appealText: ", appealText);
    if (!appealText || appealText.split(" ").join("").length < 30) {
      // console.log("not satisfied");
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

    if (post.author.id === id) {
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
            // post.images[0]
            post.images?.length > 0 && (
              <PostImages
                onRemoveImage={onRemoveImage}
                editMode={editMode}
                images={post.images}
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
                  {id && post.author.id === id ? (
                    <>
                      {!post.retweet?.id && (
                        <Button onClick={onChangePost}>Modify</Button>
                      )}
                      <Button
                        danger
                        onClick={onRemovePost}
                        loading={removePostLoading}>
                        Delete
                      </Button>
                      <Button onClick={onOpenReportModal}>Report</Button>
                      {post.lockStatus && post.author.id === id && (
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
          title={
            post.retweet?.id ? `Retweet by ${post.author.nickname}.` : null
          }
          extra={id && <FollowButton post={post} />}>
          {post.retweet?.id && post.retweet ? (
            <Card
              cover={
                !post.lockStatus &&
                post.retweet.images[0] && (
                  <PostImages images={post.retweet.images} />
                )
              }>
              <div style={{ float: "right" }}>
                {moment(post.createdAt).format("YYYY.MM.DD")}
              </div>
              <Card.Meta
                avatar={
                  <Link href={`/user/${post.retweet.author.id}`}>
                    <Avatar>{post.author.nickname[0]}</Avatar>
                  </Link>
                }
                title={post.author.nickname}
                description={
                  <PostCardContent
                    lockStatus={post.lockStatus}
                    postData={post.retweet.content}
                    onCancelChangePost={onCancelChangePost}
                    onUpdatePost={onUpdatePost}
                    reports={post.reports}
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
                  <Link href={`/user/${post.author.id}`}>
                    <Avatar>{post.author.nickname[0]}</Avatar>
                  </Link>
                }
                title={post.author.nickname}
                description={
                  <PostCardContent
                    lockStatus={post.lockStatus}
                    editMode={editMode}
                    onCancelChangePost={onCancelChangePost}
                    postData={post.content}
                    post={post}
                    onUpdatePost={onUpdatePost}
                    reports={post.reports}
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
            <CommentForm post={post} />
            <List
              header={`${post.comments.length} comments`}
              itemLayout="horizontal"
              dataSource={post.comments}
              renderItem={(item: IComment) => (
                <li>
                  <Comment
                    author={item.user.nickname}
                    avatar={
                      <Link href={`/user/${item.user.id}`}>
                        <Avatar>{item.user.nickname[0]}</Avatar>
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

// PostCard.propTypes = {
//   post: PropTypes.shape({
//     id: PropTypes.number,
//     User: PropTypes.object,
//     content: PropTypes.string,
//     createdAt: PropTypes.string,
//     Comments: PropTypes.arrayOf(PropTypes.object),
//     Images: PropTypes.arrayOf(PropTypes.object),
//     RetweetId: PropTypes.number,
//     Retweet: PropTypes.objectOf(PropTypes.any),
//     likers: PropTypes.objectOf(PropTypes.any),
//     Reports: PropTypes.objectOf(PropTypes.any),
//     lockStatus: PropTypes.bool,
//   }).isRequired,
// };

export default PostCard;
