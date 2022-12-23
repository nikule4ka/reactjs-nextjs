import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useScrollY } from "../../hooks/useScrollY";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import s from "./Up.module.css";

const Up = (): JSX.Element => {
  const controlls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controlls.start({ opacity: y / document.body.scrollHeight });
  }, [y, controlls]);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <motion.div className={s.up} animate={controlls} initial={{ opacity: 0 }}>
      <ButtonIcon appearance="primary" icon="up" onClick={scrollToTop} />
    </motion.div>
  );
};

export default Up;
