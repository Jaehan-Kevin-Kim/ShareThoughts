import { Form, Input } from "antd";
import { css } from "@emotion/css";

const NicknameEditForm = () => {
  return (
    <Form
      className={css`
        margin-bottom: 20px;
        border: 1px solid #d9d9d9;
        padding: 20px;
      `}>
      <Input.Search addonBefore="Nickname" enterButton="Modify"></Input.Search>
    </Form>
  );
};

export default NicknameEditForm;
