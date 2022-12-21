import React from "react";
import { AdvantagesProps } from "./Advantages.props";
import s from "./Advantages.module.css";
import CheckIcon from "./check.svg";

const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <>
      {advantages.map((ad) => (
        <div key={ad._id} className={s.advantage}>
          <CheckIcon />
          <div className={s.title}>{ad.title}</div>
          <hr className={s.vline} />
          <div className={s.description}>{ad.description}</div>
        </div>
      ))}
    </>
  );
};

export default Advantages;
