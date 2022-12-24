import React, { KeyboardEvent, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import s from "./Menu.module.css";
import cn from "classnames";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpres/helpers";
import { motion, useReducedMotion } from "framer-motion";

const Menu = (): JSX.Element => {
  const [announce, setAnnounce] = useState<"opened" | "closed" | undefined>();
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion
        ? {}
        : {
            when: "beforeChildren",
            staggerChildren: 0.1
          }
    },
    hidden: { marginBottom: 0 }
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29
    },
    hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 }
  };

  const openSecondLevel = (secondCategory: string): void => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory === secondCategory) {
            setAnnounce(m.isOpened ? "closed" : "opened");
            m.isOpened = !m.isOpened;
          }
          return m;
        })
      );
  };

  const buildFirstLevel = (): JSX.Element => {
    return (
      <ul className={s.firstLevelList}>
        {firstLevelMenu.map((m) => (
          <li key={m.route} aria-expanded={m.id === firstCategory}>
            <Link href={`/${m.route}`} legacyBehavior>
              <a>
                <div
                  className={cn(s.firstLevel, {
                    [s.firstLevelActive]: m.id === firstCategory
                  })}
                >
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
            </Link>

            {m.id === firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    );
  };

  const openSecondLevelKey = (key: KeyboardEvent, menuItem: string): void => {
    if (key.code === "Space" || key.code === "Enter") {
      key.preventDefault();
      openSecondLevel(menuItem);
    }
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
    return (
      <ul className={s.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages
              .map((pageItem) => pageItem.alias)
              .includes(router.asPath.split("/")[2])
          ) {
            m.isOpened = true;
          }
          return (
            <li key={m._id.secondCategory}>
              <button
                onKeyDown={(key: KeyboardEvent): void =>
                  openSecondLevelKey(key, m._id.secondCategory)
                }
                className={s.secondLevel}
                onClick={(): void => openSecondLevel(m._id.secondCategory)}
                aria-expanded={m.isOpened}
              >
                {m._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                className={s.secondLevelBlock}
                initial={m.isOpened ? "visible" : "hidden"}
                animate={m.isOpened ? "visible" : "hidden"}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpened: boolean
  ): JSX.Element => {
    return (
      <>
        {pages.map((p) => (
          <motion.li key={p._id} variants={variantsChildren}>
            <Link
              tabIndex={isOpened ? 0 : -1}
              href={`/${route}/${p.alias}`}
              className={cn(s.thirdLevel, {
                [s.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
              })}
              aria-current={
                `/${route}/${p.alias}` === router.asPath ? "page" : false
              }
            >
              {p.category}
            </Link>
          </motion.li>
        ))}
      </>
    );
  };

  return (
    <nav className={s.menu} role="navigation">
      {announce && (
        <span className="visualyHidden" role="log">
          {announce === "opened" ? "Open" : "Closed"}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
};

export default Menu;
