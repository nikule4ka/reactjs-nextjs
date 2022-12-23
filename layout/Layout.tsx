import React, {
  FunctionComponent,
  KeyboardEvent,
  useRef,
  useState
} from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { LayoutProps } from "./Layout.props";
import s from "./Layout.module.css";
import cn from "classnames";
import { AppContextProvider, IAppContext } from "../context/app.context";
import { Up } from "../components";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] =
    useState<boolean>(false);

  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent): void => {
    if (key.code === "Space" || key.code === "Enter") {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setIsSkipLinkDisplayed(false);
  };

  return (
    <div className={s.wrapper}>
      <a
        onKeyDown={skipContentAction}
        onFocus={(): void => setIsSkipLinkDisplayed(true)}
        tabIndex={1}
        className={cn(s.skipLink, {
          [s.displayed]: isSkipLinkDisplayed
        })}
      >
        straight to content
      </a>
      <Header className={s.header} />

      <Sidebar className={s.sidebar} />
      <div className={s.body} ref={bodyRef} tabIndex={0}>
        {children}
      </div>

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
