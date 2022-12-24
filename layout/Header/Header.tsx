import React, { useEffect, useState } from "react";
import { HeaderProps } from "./Header.props";
import cn from "classnames";
import s from "./Header.module.css";
import Logo from "../logo.svg";
import { ButtonIcon } from "../../components";
import { motion, useReducedMotion } from "framer-motion";
import Sidebar from "../Sidebar/Sidebar";
import { useRouter } from "next/router";

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [router]);

  const variants = {
    opened: { opacity: 1, x: 0, transition: { stiffness: 20 } },
    closed: { opacity: shouldReduceMotion ? 1 : 0, x: "100%" }
  };
  return (
    <header className={cn(className, s.header)} {...props}>
      <Logo />
      <ButtonIcon
        appearance="white"
        icon="menu"
        onClick={(): void => setIsOpen(true)}
      />
      <motion.div
        className={s.mobileMenu}
        variants={variants}
        initial="closed"
        animate={isOpen ? "opened" : "closed"}
      >
        <Sidebar />
        <ButtonIcon
          appearance="white"
          icon="close"
          className={s.menuClose}
          onClick={(): void => setIsOpen(false)}
        />
      </motion.div>
    </header>
  );
};

export default Header;
