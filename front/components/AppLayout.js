import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Input, Menu, Row, Col } from "antd";
import "antd/dist/antd.css";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled from "@emotion/styled";

const SearchInput = styled(Input.Search)`
  vertical-align: "middle";
  background: "crimson";
  border: "none";
`;

const AppLayout = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <div>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link href="/">
              <a>ShareThoughts</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <SearchInput
              enterButton
              style={{ verticalAlign: "middle", background: "crimson", border: "none" }}
            />
          </Menu.Item>
          <Menu.Item>
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </Menu.Item>
        </Menu>
        <Row gutter={8}>
          <Col xs={24} md={6} lg={4}>
            {isLoggedIn ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={24} md={12} lg={16}>
            {props.children}
          </Col>
          <Col xs={24} md={6} lg={4}>
            <a href="https://kevin-kim.netlify.app/" target="_blank" rel="noreferrer noopener">
              Made by Kevin
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired, //node: nodejs의 node가 아닌 react의 node: 화면에 그릴 수 있는 모든 것(return안에 들어갈 수 있는 모든 것)
};

export default AppLayout;
