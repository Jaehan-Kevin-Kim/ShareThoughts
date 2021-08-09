import React from "react";
import PropTypes from "prop-types";

const AppLayout = (props) => {
  return (
    <div>
      Common Section
      {props.children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired, //node: nodejs의 node가 아닌 react의 node: 화면에 그릴 수 있는 모든 것(return안에 들어갈 수 있는 모든 것)
};

export default AppLayout;
