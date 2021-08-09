import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const AppLayout = (props) => {
  return (
    <div>
      <div>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
        <Link href="/">
          <a>ShareThoughts</a>
        </Link>
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </div>
      Common Section
      {props.children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired, //node: nodejs의 node가 아닌 react의 node: 화면에 그릴 수 있는 모든 것(return안에 들어갈 수 있는 모든 것)
};

export default AppLayout;
