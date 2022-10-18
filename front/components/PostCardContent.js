import { Input, Button } from "antd";
import { useCallback, useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_POST_REQUEST } from "../reducers/post";
import { useEffect } from "react";

//Hashtag checker with regular expression
const PostCardContent = ({
  postData,
  editMode,
  onCancelChangePost,
  post,
  onUpdatePost,
}) => {
  const { updatePostLoading, updatePostDone } = useSelector(
    (state) => state.post,
  );
  const dispatch = useDispatch();
  const regex = /(#[^\s#]+)/g;
  const [editText, setEditText] = useState(postData);

  useEffect(() => {
    if (updatePostDone) {
      onCancelChangePost();
    }
  }, [updatePostDone]);

  const onChangeText = useCallback(
    (v) => {
      setEditText(v.target.value);
    },
    [editText],
  );

  const onCancelUpdatePost = useCallback(() => {
    console.log("cancel Change Post");
    onCancelChangePost();
  }, []);

  // const onUpdatePost = useCallback(() => {
  //   // const formData = new FormData();
  //   // formData.append("content", editText);
  //   console.log("post: ", post);
  //   console.log("editText: ", editText);
  //   dispatch({
  //     type: UPDATE_POST_REQUEST,
  //     data: {
  //       postId: post.id,
  //       content: editText,
  //     },
  //   });
  //   onCancelChangePost();
  // }, [editText]);

  return (
    <div>
      {editMode ? (
        <>
          <Input.TextArea value={editText} onChange={onChangeText} />
          <Button.Group>
            <Button
              loading={updatePostLoading}
              // type="primary"
              onClick={onUpdatePost(editText)}>
              Save
            </Button>

            <Button
              type="danger"
              onClick={onCancelUpdatePost}
              // loading={removePostLoading}
            >
              Cancel
            </Button>
          </Button.Group>
        </>
      ) : (
        postData.split(regex).map((v, i) => {
          if (v.match(regex)) {
            return (
              <Link key={i} href={`/hashtag/${v.slice(1)}`}>
                <a>{v}</a>
              </Link>
            );
          }
          return v;
        })
      )}
      {}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  onCancelChangePost: PropTypes.func.isRequired,
  onUpdatePost: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  post: PropTypes.object,
};

PostCardContent.defaultProps = {
  editMode: false,
  post: undefined,
};

export default PostCardContent;
