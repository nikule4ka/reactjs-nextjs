import React, { useContext } from "react";
import Link from "next/link";
import s from "./Menu.module.css";
import cn from "classnames";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import CoursesIcon from "./icons/courses.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";
import ServicesIcon from "./icons/services.svg";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { useRouter } from "next/router";

const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: "courses",
    name: "Course",
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses
  },
  {
    route: "books",
    name: "Books",
    icon: <BooksIcon />,
    id: TopLevelCategory.Books
  },
  {
    route: "products",
    name: "Products",
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products
  },
  {
    route: "services",
    name: "Services",
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services
  }
];
const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const router = useRouter();

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
              <div
                className={cn(s.secondLevelBlock, {
                  [s.secondLevelBlockOpened]: m.isOpened
                })}
              >
                {buildThirdLevel(m.pages, menuItem.route)}
              </div>
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
          <Link
            href={`/${route}/${p.alias}`}
            key={p._id}
            className={cn(s.thirdLevel, {
              [s.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
            })}
          >
            {p.category}
          </Link>
        ))}
      </>
    );
  };

  return <div className={s.menu}>{buildFirstLevel()}</div>;
};

export default Menu;
