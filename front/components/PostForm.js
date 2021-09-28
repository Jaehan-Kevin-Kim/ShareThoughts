import { Input, Form, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useState, useRef, useEffect } from "react";
import useInput from "../hooks/useInput";
import { addPost, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const [text, onChangeText, setText] = useInput("");

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const imageInput = useRef();
  //이미지 업로드 시, 아래 예시에서 userRef를 이용했기 떄문에 버튼을 클릭했을때 input을 클릭한 것과 같은 행동이 실행되서,  imageUpload창을 뜨게 할 수 있음. 만약 여기서 useRef를 사용하지 않으면, 원래 원했던 screen이 뜨게 하기위해서 엄청난 styling 변경이 필요함. 하지만 useRef를 사용해서, 기존 html에서 사용하는 DOM에 접근을 할 수 있으므로, 특별한 조작없이 원하는 action을 실행 할 수 있음.
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log("images", e.target.files);
    const imageFormData = new FormData(); // FormData로 만들면 multipart 형식으로 server로 보낼 수 있음. (무조건 multipart 형태로 만들어야지 backend에서 multer가 처리 함.)

    //아래 내용은 위 e.target.files가 배열처럼 생겼지만 배열이 아닌 유사배열이기 때문에 forEach를 사용을 못하는 상황이 발생 함. 따라서 아래와 같이 배열의 forEach method를 빌려와서 하나씩 반복해서 사용 함.
    [].forEach.call(e.target.files, (f) => {
      //아래 append()안에 들어가는 'image'는 backend에서 upload.array()안에 받는 'image', 아래 input file에서 name으로 준 'image' 와 이름이 똑같아야지 정상 동작 함.
      imageFormData.append("image", f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_IMAGE,
        data: index,
      });
    },
    [],
  );

  // eslint-disable-next-line consistent-return
  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("Please write a post.");
    }

    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append("image", p);
    });
    formData.append("content", text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
    //위의 경우는 image가 있기 때문에 formData로 안보내고 json으로 보내도 됨. (data:{imagePaths, content:text}), 이런 형태로 해도 됨.
  }, [text, imagePaths]);

  return (
    <>
      <Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data" onFinish={onSubmit}>
        <Input.TextArea
          value={text}
          onChange={onChangeText}
          maxLength={140}
          placeholder="Write a post in here..."
        />
        <div>
          <input
            type="file"
            name="image"
            multiple
            hidden
            ref={imageInput}
            onChange={onChangeImages}
          />
          <Button onClick={onClickImageUpload}>Image Upload</Button>
          <Button type="primary" style={{ float: "right" }} htmlType="submit">
            Post
          </Button>
        </div>
        <div>
          {imagePaths.map((v, i) => (
            <div key={v} style={{ display: "inline-block" }}>
              <img src={`http://localhost:3065/${v}`} style={{ width: "200px" }} alt={v} />
              <div>
                <Button onClick={onRemoveImage(i)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      </Form>
    </>
  );
};

export default PostForm;
