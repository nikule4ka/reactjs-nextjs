import React, {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useRef,
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
      tabIndex,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );

    const ratingRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      constructRating(rating);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating, tabIndex]);

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!rating && i === 0) {
        return tabIndex ?? 0;
      }
      if (r === i + 1) {
        return tabIndex ?? 0;
      }
      return -1;
    };

    const constructRating = (currentRating: number): void => {
      const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
        return (
          <span
            className={cn(s.star, {
              [s.filled]: i < currentRating,
              [s.editable]: isEditable
            })}
            onMouseEnter={(): void => changeDisplay(i + 1)}
            onMouseLeave={(): void => changeDisplay(rating)}
            onClick={(): void => onClick(i + 1)}
            tabIndex={computeFocus(rating, i)}
            onKeyDown={handleKey}
            ref={(r): number | undefined => ratingRef.current?.push(r)}
          >
            <StarIcon />
          </span>
        );
      });
      setRatingArray(updateArray);
    };

    const handleKey = (e: KeyboardEvent): void => {
      if (!isEditable || !setRating) {
        return;
      }

      if (e.code === "ArrowRight" || e.code === "ArrowUp") {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingRef.current[rating]?.focus();
      }

      if (e.code === "ArrowLeft" || e.code === "ArrowDown") {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingRef.current[rating - 2]?.focus();
      }
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
