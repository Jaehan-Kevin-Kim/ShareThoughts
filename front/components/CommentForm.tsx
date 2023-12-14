import { Button, Form, Input } from "antd";
import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/css";
import useInput from "../hooks/useInput";
import { addComment } from "../features/post/postService";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";

const CommentForm = ({ post }) => {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useAppSelector(
    (state) => state.post,
  );
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);

    dispatch(addComment({ content: commentText, postId: post.id}));
  }, [commentText, id]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item
        className={css`
          position: "relative";
          margin: 0;
          z-index: 1;
        `}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          className={css`
            float: right;
          `}
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}>
          Comment Post
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default CommentForm;
