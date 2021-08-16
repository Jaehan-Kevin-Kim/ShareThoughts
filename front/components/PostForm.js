import { Input, Form, Button } from "antd";
import React, { useCallback, useState, useRef } from "react";
import useInput from "./../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths } = useSelector((state) => state.post);
  const [text, setText] = useState("");
  const imageInput = useRef();
  const onChangeText = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [text],
  );

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onSubmit = useCallback(() => {
    dispatch(addPost());
    setText("");
  }, []);
  return (
    <>
      <Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data" onFinish={onSubmit}>
        <Input.TextArea
          value={text}
          onChange={onChangeText}
          maxLength={140}
          placeholder="write a post in here..."></Input.TextArea>
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
