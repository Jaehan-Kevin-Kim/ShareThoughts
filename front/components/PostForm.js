import { Input, Form, Button } from "antd";
import React, { useCallback, useState, useRef, useEffect } from "react";
import useInput from "./../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../reducers/post";

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

  const onSubmit = useCallback(() => {
    dispatch(addPost(text));
  }, [text]);
  return (
    <>
      <Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data" onFinish={onSubmit}>
        <Input.TextArea
          value={text}
          onChange={onChangeText}
          maxLength={140}
          placeholder="Write a post in here..."></Input.TextArea>
        <div>
          <input type="file" multiple hidden ref={imageInput} />
          <Button onClick={onClickImageUpload}>Image Upload</Button>
          <Button type="primary" style={{ float: "right" }} htmlType="submit">
            Post
          </Button>
        </div>
        <div>
          {imagePaths.map((v) => {
            <div key={v} style={{ display: "inline-block" }}>
              <img src={v} style={{ width: "200px" }} alt={v} />
              <div>
                <Button>Remove</Button>
              </div>
            </div>;
          })}
        </div>
      </Form>
    </>
  );
};

export default PostForm;
