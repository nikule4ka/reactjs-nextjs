import React from "react";
import { ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import s from "./ReviewForm.module.css";
import Input from "../Input/Input";
import Rating from "../Rating/Rating";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import CloseIcon from "./close.svg";

const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  return (
    <>
      <div className={cn(s.reviewForm, className)} {...props}>
        <Input placeholder="Name" />
        <Input className={s.title} placeholder="Review title" />
        <div className={s.rating}>
          <span>Grade: </span>
          <Rating rating={0} />
        </div>
        <TextArea className={s.description} placeholder="Text title" />
        <div className={s.submit}>
          <Button appearance="primary">Send</Button>
          <span className={s.info}>
            * Before publication, the review will be pre-moderated and checked
          </span>
        </div>
      </div>
      <div className={s.success}>
        <div className={s.successTitle}>Your review has been sent</div>
        <div>Thank you, your review will be published after verification</div>
        <CloseIcon className={s.close} />
      </div>
    </>
  );
};

export default ReviewForm;
