import Head from "next/head";
import Router from "next/router";
import { Button, Form, Input, Checkbox } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";
import { SIGN_UP_REQUEST } from "../reducers/user";

const ErrorMessage = styled.div`
  color: red;
`;

const signup = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);

  const dispatch = useDispatch();
  const { signUpLoading, me, signUpDone, signUpError } = useSelector((state) => state.user);

  useEffect(() => {
    if (me?.id) {
      Router.push("/");
    }
  }, [me?.id]);
  if (me?.id) {
    return null;
  }

  useEffect(() => {
    if (signUpDone) {
      Router.push("/");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      // console.log(signUpError);
      alert(signUpError);
    }
  }, [signUpError]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordLengthError(e.target.value.length < 8);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );
  const onChangeTerm = useCallback((e) => {
    // console.log(e.target.checked);
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password.length < 8) {
      return setPasswordLengthError(true);
    }

    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      // console.log(term);
      return setTermError(true);
    }
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  return (
    <>
      <Head>
        <title>Sign Up | Share Thoughts</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-email">Email</label> <br />
            <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
          </div>
          <div>
            <label htmlFor="user-nickname">Nick Name</label> <br />
            <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
          </div>
          <div>
            <label htmlFor="user-password">Password</label> <br />
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password-check">Password Check</label> <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordLengthError && (
              <ErrorMessage>Password should be longer than 8 characters!</ErrorMessage>
            )}
            {passwordError && <ErrorMessage>Password is not matched!</ErrorMessage>}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              Do you agree to the terms and conditions for use?
            </Checkbox>
            {termError && (
              <ErrorMessage>You have to agree to the terms and conditions.</ErrorMessage>
            )}
          </div>
          <div style={{ marginTop: "10px" }}>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>
              Sign Up
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export default signup;
