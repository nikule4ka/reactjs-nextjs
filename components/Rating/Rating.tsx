import React, {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useState
} from "react";
import { RatingProps } from "./Rating.props";
import StarIcon from "./star.svg";
import cn from "classnames";
import s from "./Rating.module.css";

const Rating = forwardRef(
  (
    {
      rating,
      setRating,
      isEditable = false,
      error,
      className,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );

    useEffect(() => {
      constructRating(rating);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating]);

    const constructRating = (currentRating: number): void => {
      const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
        return (
          <span
            ref={ref}
            className={cn(s.star, {
              [s.filled]: i < currentRating,
              [s.editable]: isEditable
            })}
            onMouseEnter={(): void => changeDisplay(i + 1)}
            onMouseLeave={(): void => changeDisplay(rating)}
            onClick={(): void => onClick(i + 1)}
          >
            <StarIcon
              onKeyDown={(e: KeyboardEvent<SVGAElement>): boolean | void =>
                isEditable && handleSpace(i + 1, e)
              }
              tabIndex={isEditable ? 0 : -1}
            />
          </span>
        );
      });
      setRatingArray(updateArray);
    };

    const changeDisplay = (r: number): void => {
      if (!isEditable) {
        return;
      }
      constructRating(r);
    };

    const onClick = (r: number): void => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(r);
    };

    const handleSpace = (r: number, e: KeyboardEvent<SVGAElement>): void => {
      if (e.code === "Space" && setRating) {
        setRating(r);
      }
    };
    return (
      <div
        {...props}
        ref={ref}
        className={cn(className, s.ratingWrapper, {
          [s.error]: error
        })}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && <span className={s.errorMessage}> {error.message}</span>}
      </div>
    );
  }
);

export default Rating;
