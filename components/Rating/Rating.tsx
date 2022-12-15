import React, { KeyboardEvent, useEffect, useState } from "react";
import { RatingProps } from "./Rating.props";
import StarIcon from "./star.svg";
import cn from "classnames";
import s from "./Rating.module.css";

const Rating = ({
  rating,
  setRating,
  isEditable = false,
  ...props
}: RatingProps): JSX.Element => {
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
          className={cn(s.star, {
            [s.filled]: i < currentRating,
            [s.editable]: isEditable
          })}
          onMouseEnter={(): void => changeDisplay(i + 1)}
          onMouseLeave={(): void => changeDisplay(rating)}
          onClick={(): void => onClick(i + 1)}
        >
          <StarIcon
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            onKeyDown={(e: KeyboardEvent<SVGAElement>) =>
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
    <div {...props}>
      {ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
    </div>
  );
};

export default Rating;
