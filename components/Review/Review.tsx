import React from "react";
import { ReviewProps } from "./Review.props";
import cn from "classnames";
import s from "./Review.module.css";
import UserIcon from "./user.svg";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import Rating from "../Rating/Rating";

const Review = ({ review, className, ...props }: ReviewProps): JSX.Element => {
  const { name, description, rating, title, createdAt } = review;

  return (
    <div className={cn(s.review, className)} {...props}>
      <UserIcon className={s.user} />
      <div className={s.title}>
        <span className={s.name}>{name}: </span>&nbsp;&nbsp;
        <span>{title}</span>
      </div>
      <div className={s.date}>
        {format(new Date(createdAt), "dd MMMM yyyy", { locale: uk })}
      </div>
      <div className={s.rating}>
        <Rating rating={rating} />
      </div>
      <div className={s.description}>{description}</div>
    </div>
  );
};

export default Review;
