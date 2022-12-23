import React, { FunctionComponent } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { LayoutProps } from "./Layout.props";
import s from "./Layout.module.css";
import { AppContextProvider, IAppContext } from "../context/app.context";
import { Up } from "../components";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={s.wrapper}>
      <Header className={s.header} />

      <Sidebar className={s.sidebar} />
      <div className={s.body}>{children}</div>

      <Footer className={s.footer} />
      <Up />
    </div>
  );
};

export const WithLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function WithLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
