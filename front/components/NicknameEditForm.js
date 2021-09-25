import { Form, Input } from "antd";
import { css } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { useCallback } from "react";
import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || "");
  const onSubmit = useCallback(() => {
    console.log("onSubmit");
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <Form
      className={css`
        margin-bottom: 20px;
        border: 1px solid #d9d9d9;
        padding: 20px;
      `}
      // onFinish={onSubmit}
    >
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="Nickname"
        enterButton="Modify"
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
