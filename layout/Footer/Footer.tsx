import React from "react";
import { FooterProps } from "./Footer.props";
import s from "./Footer.module.css";
import cn from "classnames";
import { format } from "date-fns";

const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer className={cn(className, s.footer)} {...props}>
      <div className={s.rights}>
        Nika © {format(new Date(), "yyyy")} All rights reserved
      </div>

      <a href="#" target="_blank">
        Terms of use
      </a>

      <a href="#" target="_blank">
        Privacy Policy
      </a>
    </footer>
  );
};

export default Footer;
