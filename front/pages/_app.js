import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";
import wrapper from "../store/configureStore";
// import { Provider } from "react-redux";

const App = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>Share Thoughts</title>
    </Head>
    <Component />
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
