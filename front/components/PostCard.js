import React, { useCallback, useState } from "react";
import { Card, Popover, Button, Avatar, List, Comment } from "antd";
import PropTypes from "prop-types";
import PostImages from "./PostImages";
import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartTwoTone,
} from "@ant-design/icons";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const { me } = useSelector((state) => state.user);
  const id = me?.id;

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, [liked]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, [commentFormOpened]);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone twoToneColor="#AF0000" key="heartTwoTone" onClick={onToggleLike} />
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
                    <Button>Modify</Button>
                    <Button type="danger">Delete</Button>
                    <Button>Report</Button>
                  </>
                ) : (
                  <Button>Report </Button>
                )}
              </Button.Group>
            }>
            <EllipsisOutlined />
          </Popover>,
        ]}>
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />

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
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
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
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
