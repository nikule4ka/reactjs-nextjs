import React, { useState } from "react";
import { ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import s from "./ReviewForm.module.css";
import Input from "../Input/Input";
import Rating from "../Rating/Rating";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import CloseIcon from "./close.svg";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "../../helpres/api";

const ReviewForm = ({
  productId,
  className,
  isOpened,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();

  const onSubmit = async (formData: IReviewForm): Promise<void> => {
    try {
      const { data } = await axios.post<IReviewResponse>(
        API.review.createDemo,
        {
          ...formData,
          productId
        }
      );
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setIsError("Something went wrong!");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setIsError(err.response?.data);
      }
    }
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
            tabIndex={isOpened ? 0 : -1}
            aria-invalid={errors.name ? "true" : "false"}
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
            tabIndex={isOpened ? 0 : -1}
            aria-invalid={errors.title ? "true" : "false"}
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
                  tabIndex={isOpened ? 0 : -1}
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
            placeholder="Review text"
            error={errors.description}
            tabIndex={isOpened ? 0 : -1}
            aria-label="Review text"
            aria-invalid={errors.description ? "true" : "false"}
          />
          <div className={s.submit}>
            <Button
              appearance="primary"
              tabIndex={isOpened ? 0 : -1}
              onClick={(): void => clearErrors()}
            >
              Send
            </Button>
            <span className={s.info}>
              * Before publication, the review will be pre-moderated and checked
            </span>
          </div>
        </div>
        {isSuccess && (
          <div className={cn(s.success, s.panel)} role="alert">
            <div className={s.successTitle}>Your review has been sent</div>
            <div>
              Thank you, your review will be published after verification
            </div>
            <button
              className={s.close}
              onClick={(): void => setIsSuccess(false)}
              aria-label="Close notification"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {isError && (
          <div className={cn(s.error, s.panel)} role="alert">
            Something went wrong - try refreshing the page
            <button
              className={s.close}
              onClick={(): void => setIsError(undefined)}
              aria-label="Close notification"
            >
              <CloseIcon />
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default ReviewForm;
