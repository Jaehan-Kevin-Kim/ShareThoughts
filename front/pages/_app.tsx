import React, { FC } from "react";
import PropTypes from "prop-types";
// import "antd/dist/antd.css";
import "antd/dist/reset.css";

import Head from "next/head";
import wrapper from "../store/configureStore";
import { Provider } from "react-redux";
// import { AppProps } from "antd";
import type { AppProps } from "next/app";
// import { Provider } from "react-redux";

// const ShareThought = ({ Component }) => (
//   // <>
//   <Provider>
//     <Head>
//       <meta charSet="utf-8" />
//       <title>Share Thoughts</title>
//     </Head>
//     <Component />
//   </Provider>
// )
//   {/* </> */}
// );

const ShareThought: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Head>
        <meta charSet="utf-8" />
        <title>Share Thoughts</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

// ShareThought.propTypes = {
//   Component: PropTypes.elementType.isRequired,
// };

export default ShareThought;
