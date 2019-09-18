import App from "next/app";
import Router from "next/router";
import NProgress from "nprogress";

import { Auth } from "../src/client/components/Auth/Context";
import Navigation from "../src/client/components/Navigation";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Auth>
        <Navigation />
        <Component {...pageProps} />
      </Auth>
    );
  }
}
