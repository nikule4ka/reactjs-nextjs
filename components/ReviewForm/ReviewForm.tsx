import React from "react";
import { ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import s from "./ReviewForm.module.css";
import Input from "../Input/Input";
import Rating from "../Rating/Rating";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import CloseIcon from "./close.svg";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm } from "./ReviewForm.interface";

const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IReviewForm>();
  console.log(productId);

  const onSubmit = (data: IReviewForm): void => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn(s.reviewForm, className)} {...props}>
          <Input
            placeholder="Name"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required"
              }
            })}
            error={errors.name}
          />
          <Input
            {...register("title", {
              required: {
                value: true,
                message: "Title is required"
              }
            })}
            error={errors.title}
            className={s.title}
            placeholder="Review title"
          />
          <div className={s.rating}>
            <span>Grade: </span>
            <Controller
              control={control}
              name="rating"
              rules={{
                required: {
                  value: true,
                  message: "Rating is required"
                }
              }}
              render={({ field }): JSX.Element => (
                <Rating
                  isEditable
                  ref={field.ref}
                  rating={field.value}
                  setRating={field.onChange}
                  error={errors.rating}
                />
              )}
            />
          </div>
          <TextArea
            {...register("description", {
              required: {
                value: true,
                message: "Description is required"
              }
            })}
            className={s.description}
            placeholder="Text title"
            error={errors.description}
          />
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
      </form>
    </>
  );
};

export default ReviewForm;
