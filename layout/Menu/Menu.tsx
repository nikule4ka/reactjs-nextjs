import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import s from "./Menu.module.css";
import cn from "classnames";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpres/helpers";
import { motion } from "framer-motion";

const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
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
    hidden: { opacity: 0, height: 0 }
  };

  const openSecondLevel = (secondCategory: string): void => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory === secondCategory) {
            m.isOpened = !m.isOpened;
          }
          return m;
        })
      );
  };

  const buildFirstLevel = (): JSX.Element => {
    return (
      <>
        {firstLevelMenu.map((m) => (
          <div key={m.route}>
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
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
    return (
      <div className={s.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages
              .map((pageItem) => pageItem.alias)
              .includes(router.asPath.split("/")[2])
          ) {
            m.isOpened = true;
          }
          return (
            <div key={m._id.secondCategory}>
              <div
                className={s.secondLevel}
                onClick={(): void => openSecondLevel(m._id.secondCategory)}
              >
                {m._id.secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                className={cn(s.secondLevelBlock)}
                initial={m.isOpened ? "visible" : "hidden"}
                animate={m.isOpened ? "visible" : "hidden"}
              >
                {buildThirdLevel(m.pages, menuItem.route)}
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string): JSX.Element => {
    return (
      <>
        {pages.map((p) => (
          <motion.div key={p._id} variants={variantsChildren}>
            <Link
              href={`/${route}/${p.alias}`}
              className={cn(s.thirdLevel, {
                [s.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
              })}
            >
              {p.category}
            </Link>
          </motion.div>
        ))}
      </>
    );
  };

  return <div className={s.menu}>{buildFirstLevel()}</div>;
};

export default Menu;
