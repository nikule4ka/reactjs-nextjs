import React from "react";
import { SortEnum, SortProps } from "./Sort.props";
import cn from "classnames";
import s from "./Sort.module.css";
import SortIcon from "./sort.svg";

const Sort = ({
  setSort,
  sort,
  className,
  ...props
}: SortProps): JSX.Element => {
  console.log(sort);

  return (
    <div className={cn(s.sort, className)} {...props}>
      <span
        onClick={(): void => setSort(SortEnum.Rating)}
        className={cn({
          [s.active]: sort === SortEnum.Rating
        })}
      >
        <SortIcon className={s.sortIcon} />
        Rating
      </span>
      <span
        className={cn({
          [s.active]: sort === SortEnum.Price
        })}
        onClick={(): void => setSort(SortEnum.Price)}
      >
        <SortIcon className={s.sortIcon} />
        Price
      </span>
    </div>
  );
};

export default Sort;
