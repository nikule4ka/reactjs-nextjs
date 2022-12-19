import React, { useContext } from "react";
import s from "./Menu.module.css";
import cn from "classnames";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import CoursesIcon from "./icons/courses.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";
import ServicesIcon from "./icons/services.svg";
import { TopLevelCategory } from "../../interfaces/page.interface";

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
  console.log(setMenu);

  const buildFirstLevel = (): JSX.Element => {
    return (
      <>
        {firstLevelMenu.map((m) => (
          <div key={m.route}>
            <a href={`/${m.route}`}>
              <div
                className={cn(s.firstLevel, {
                  [s.firstLevelActive]: m.id === firstCategory
                })}
              >
                {m.icon}
                <span>{m.name}</span>
              </div>
            </a>
            {m.id === firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
    return (
      <div className={s.secondBlock}>
        {menu.map((m) => (
          <div key={m._id.secondCategory}>
            <div className={s.secondLevel}>{m._id.secondCategory}</div>
            <div
              className={cn(s.secondLevelBlock, {
                [s.secondLevelBlockOpened]: m.isOpened
              })}
            >
              {buildThirdLevel(m.pages, menuItem.route)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string): JSX.Element => {
    return (
      <>
        {pages.map((p) => (
          <a
            key={p._id}
            href={`/${route}/${p.alias}`}
            className={cn(s.thirdLevel, {
              [s.thirdLevelActive]: false
            })}
          >
            {p.category}
          </a>
        ))}
      </>
    );
  };

  return <div className={s.menu}>{buildFirstLevel()}</div>;
};

export default Menu;
