import { Form, Input, Button, Checkbox } from "antd";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormItem = styled(Form.Item)`
  margin: 0;
`;
const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const onChangeId = useCallback(
    (e) => {
      setId(e.target.value);
    },
    [id]
  );
  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password]
  );

  return (
    <Form theme="dark">
      <div>
        <label htmlFor="user-id">User ID</label>
        <FormItem style={{ margin: 0 }}>
          <Input name="user-id" value={id} onChange={onChangeId} required />
        </FormItem>
      </div>
      <div>
        <label htmlFor="user-password">User Password</label>
        <FormItem style={{ margin: 0 }}>
          <Input
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </FormItem>
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          Log In
        </Button>
        <Link href="/signup">
          <a>
            <Button htmlType="submit" loading={false}>
              Sign Up
            </Button>
          </a>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

export default LoginForm;
