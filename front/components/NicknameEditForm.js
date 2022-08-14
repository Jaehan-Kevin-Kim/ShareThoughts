import { css } from "@emotion/css";
import { Form, Input } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNickname } from "../features/user/userService";
import useInput from "../hooks/useInput";

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || "");
  const onSubmit = useCallback(() => {
    console.log("onSubmit");
    dispatch(changeNickname(nickname));
    // dispatch({
    //   type: CHANGE_NICKNAME_REQUEST,
    //   data: nickname,
    // });
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
