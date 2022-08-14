import { css } from "@emotion/css";
import { Button, Form, Input } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../features/post/postService";
import useInput from "../hooks/useInput";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector(
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
    dispatch(addComment({ content: commentText, PostId: post.id, UserId: id }));
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
