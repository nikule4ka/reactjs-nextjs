import React, { useContext } from "react";
// import s from "./Menu.module.css";
// import cn from "classnames";
import { AppContext } from "../../context/app.context";

const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  console.log(firstCategory, setMenu);

  return (
    <div>
      {" "}
      <ul>
        {menu.map((item) => (
          <li key={item._id.secondCategory}>{item._id.secondCategory}</li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
