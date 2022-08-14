/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import styled from "@emotion/styled";
import { Col, Input, Menu, Row } from "antd";
import "antd/dist/antd.css";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
  background: crimson;
  border: none;
`;

const Global = createGlobalStyle`
.ant-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.ant-col:first-child {
  padding-left: 0 !important;
}

.ant-col:last-child {
  padding-right: 0 !important;
}
`;
const AppLayout = (props) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { me, logInDone } = useSelector((state) => state.user);
  // const { logInDone } = useSelector((state) => state.user);
  // console.log("me", me);
  // console.log("loginDone", logInDone);

  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item key="ShareThoughts">
          <Link href="/">
            <a>ShareThoughts</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="Profile">
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="Search">
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item key="Signup">
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6} lg={4}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12} lg={16}>
          {props.children}
        </Col>
        <Col xs={24} md={6} lg={4}>
          <a
            href="https://kevin-kim.netlify.app/"
            target="_blank"
            rel="noreferrer noopener">
            Made by Kevin
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired, //node: nodejs의 node가 아닌 react의 node: 화면에 그릴 수 있는 모든 것(return안에 들어갈 수 있는 모든 것)
};

export default AppLayout;
