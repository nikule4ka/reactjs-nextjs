import React, { FunctionComponent } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { LayoutProps } from "./Layout.props";
import Sidebar from "./Sidebar/Sidebar";
// import s from "./Layout.module.css";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <div>{children}</div>
      </div>

      <Footer />
    </>
  );
};

export const WithLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return function WithLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
