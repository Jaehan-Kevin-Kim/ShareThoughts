import { Button, Collapse, Input } from "antd";
import Link from "next/link";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { backEndUrl } from "../config/config";
import {
  REMOVE_UPDATEIMAGE,
  REMOVE_UPDATEIMAGEALL,
  UPDATE_IMAGES_REQUEST,
} from "../reducers/post";

//Hashtag checker with regular expression
const PostCardContent = ({
  postData,
  editMode,
  onCancelChangePost,
  post,
  onUpdatePost,
  lockStatus,
  reports,
  onOpenAppealModal,
}) => {
  const { updatePostLoading, updatePostDone } = useSelector(
    (state) => state.post,
  );
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { updateImagePaths } = useSelector((state) => state.post);
  const regex = /(#[^\s#]+)/g;
  const [editText, setEditText] = useState(postData);
  const imageInput = useRef();

  const prod = process.env.NODE_ENV === "production";
  const id = me?.id;

  useEffect(() => {
    if (updatePostDone) {
      onCancelChangePost();
    }
    console.log(post);
  }, [updatePostDone]);

  // useEffect(() => {
  //   if (lockStatus) {
  //     console.log("lockStatus: ", lockStatus);
  //     return <div> This Post has been deactivated by reports.</div>;
  //   }
  //   return null;
  // }, [lockStatus]);

  const onChangeText = useCallback(
    (v) => {
      setEditText(v.target.value);
    },
    [editText],
  );

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImage = useCallback(
    (index) => () => {
      // console.log("updateImagePaths: ", updateImagePaths);
      // console.log("index: ", index);
      dispatch({
        type: REMOVE_UPDATEIMAGE,
        data: index,
      });
    },
    [],
  );

  const onChangeImages = useCallback((e) => {
    console.log("image event: ", e);
    console.log(e.target);
    console.log("e.target.files: ", e.target.files);
    // console.log(e.target.files.map((v) => console.log(v)));
    console.log(e.target.files[0]);

    const imageFormData = new FormData();

    Array.from(e.target.files).forEach((file) => {
      imageFormData.append("image", file);
    });

    dispatch({
      type: UPDATE_IMAGES_REQUEST,
      data: imageFormData,
    });

    // [].forEach.call(e.target.files, (f) => {
    //   //아래 append()안에 들어가는 'image'는 backend에서 upload.array()안에 받는 'image', 아래 input file에서 name으로 준 'image' 와 이름이 똑같아야지 정상 동작 함.
    //   imageFormData.append("image", f);
    // });

    // console.log("imageFormData: ", imageFormData);
    // console.log("imageFormData: ", imageFormData);

    // for (let key of imageFormData.keys()) {
    //   console.log(`${key}: ${imageFormData.get(key)}`);
    // }
    // for (let value of imageFormData.values()) {
    //   console.log(value);
    // }

    // for (const pair of imageFormData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    //   console.log(`${pair}, ${pair.values()}`);
    // }
  }, []);

  const onCancelUpdatePost = useCallback(() => {
    console.log("cancel Change Post");
    dispatch({
      type: REMOVE_UPDATEIMAGEALL,
    });
    onCancelChangePost();
  }, []);

  const onClickSaveBtn = useCallback(() => {
    const formData = new FormData();
    updateImagePaths.forEach((path) => formData.append("image", path));
    formData.append("content", editText);
    // console.log("click in post card content");
    onUpdatePost(formData);
  }, [editText, updateImagePaths]);

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
    <>
      {lockStatus && !post.appeal ? (
        <>
          <div
            style={{
              background: "#333333",
              color: "white",
              textAlign: "center",
              marginBottom: "0.5rem",
              padding: "12px",
            }}>
            This Post has been deactivated by several reports.{" "}
          </div>
          {id && id === post.UserId && (
            <Collapse>
              <Collapse.Panel
                header="See All Reports"
                // showArrow={false}
              >
                {/* <ul> */}
                {reports.map((report) => (
                  <p
                    key={report.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <span>{report.reason}</span>
                    <span>{moment(report.createdAt).format("YYYY.MM.DD")}</span>
                  </p>
                ))}
                {/* </ul> */}
                {/* <p>haha</p> */}
                <Button
                  onClick={onOpenAppealModal}
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: 0,
                  }}
                  type="danger">
                  Write an appeal message
                </Button>
              </Collapse.Panel>
            </Collapse>
          )}
          {/* <Button type="dashed">See All Reports</Button> */}
        </>
      ) : (
        <div>
          {editMode ? (
            <>
              <Input.TextArea value={editText} onChange={onChangeText} />
              <input
                type="file"
                name="image"
                multiple
                hidden
                ref={imageInput}
                onChange={onChangeImages}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.2rem",
                }}>
                <Button onClick={onClickImageUpload}>Add Image</Button>
                <Button.Group>
                  <Button
                    loading={updatePostLoading}
                    // type="primary"
                    onClick={onClickSaveBtn}>
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
              </div>
              <div style={{}}>
                {updateImagePaths.map((v, i) => (
                  <div key={v} style={{ display: "inline-block" }}>
                    <img
                      src={
                        prod
                          ? v.replace(/\/thumb\//, "/original/")
                          : // ? v
                            `${backEndUrl}/${v}`
                      }
                      style={{ width: "200px" }}
                      alt={v}
                    />
                    {/* <img
                src={prod ? v : `${backEndUrl}/${v}`}
                style={{ width: "200px" }}
                alt={v}
              /> */}
                    <div>
                      <Button onClick={onRemoveImage(i)}>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
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
        </div>
      )}
    </>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  onCancelChangePost: PropTypes.func.isRequired,
  onUpdatePost: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  post: PropTypes.object,
  lockStatus: PropTypes.bool.isRequired,
  reports: PropTypes.objectOf(PropTypes.any),
  onOpenAppealModal: PropTypes.func,
};

PostCardContent.defaultProps = {
  editMode: false,
  post: undefined,
  onOpenAppealModal: undefined,
  reports: undefined,
};

export default PostCardContent;
