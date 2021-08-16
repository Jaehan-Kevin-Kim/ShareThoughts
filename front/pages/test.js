import React, { useCallback, useState, useRef } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { addPost } from "../reducers/post";

const test = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const imageInput = useRef();

  const onChangeText = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [text],
  );

  //이미지 업로드 시, 아래 예시에서 userRef를 이용했기 떄문에 버튼을 클릭했을때 input을 클릭한 것과 같은 행동이 실행되서,  imageUpload창을 뜨게 할 수 있음. 만약 여기서 useRef를 사용하지 않으면, 원래 원했던 screen이 뜨게 하기위해서 엄청난 styling 변경이 필요함. 하지만 useRef를 사용해서, 기존 html에서 사용하는 DOM에 접근을 할 수 있으므로, 특별한 조작없이 원하는 action을 실행 할 수 있음.
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onSubmit = useCallback(() => {
    dispatch(addPost());
    // dispatch({ type: "ADD_POST" });
  }, []);
  return (
    <Form style={{ margin: "10px 0 20px" }} onFinish={onSubmit} encType="multipart/form-data">
      <Input.TextArea maxLength={140} onChange={onChangeText} placeholder="Write a post in here...">
        {" "}
        value={text}
      </Input.TextArea>
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>Image Upload</Button>
        <Button type="primary" htmlType="submit">
          Post
        </Button>
      </div>
    </Form>
  );
};

export default test;
