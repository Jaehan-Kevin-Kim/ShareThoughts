/* eslint-disable no-unused-vars */
import styled from "@emotion/styled";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
// import { css, jsx } from "@emotion/react";
import { css } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/userService";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormItem = styled(Form.Item)`
  margin: 0;
`;
const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const { logInLoading, logInError } = useSelector((state) => state.user);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onChangeEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email],
  );
  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password],
  );

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(login({ email, password }));
    // dispatch(loginRequestAction({ email, password }));
    // setIsLoggedIn(true);
  }, [email, password]);
  return (
    <Form
      onFinish={onSubmitForm}
      className={css`
        padding: 10px;
      `}>
      <div>
        <label htmlFor="user-email">User Email</label>
        <FormItem style={{ margin: 0 }}>
          <Input
            name="user-email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            required
          />
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
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          Log In
        </Button>
        <Link href="/signup">
          <a>
            <Button htmlType="submit" loading={logInLoading}>
              Sign Up
            </Button>
          </a>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

export default LoginForm;
