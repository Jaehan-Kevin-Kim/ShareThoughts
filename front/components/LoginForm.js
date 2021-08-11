import { Form, Input, Button, Checkbox } from "antd";
import Link from "next/link";
import React, { useCallback, useState } from "react";

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
        <Form.Item style={{ margin: 0 }}>
          <Input name="user-id" value={id} onChange={onChangeId} required />
        </Form.Item>
      </div>
      <div>
        <label htmlFor="user-password">User Password</label>
        <Form.Item style={{ margin: 0 }}>
          <Input
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </Form.Item>
      </div>
      <div>
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
      </div>
    </Form>
  );
};

export default LoginForm;
