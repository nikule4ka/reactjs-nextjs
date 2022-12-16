import React, { FunctionComponent } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { LayoutProps } from "./Layout.props";
import s from "./Layout.module.css";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={s.wrapper}>
      <Header className={s.header} />

      <Sidebar className={s.sidebar} />
      <div className={s.body}>{children}</div>

      <Footer className={s.footer} />
    </div>
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
