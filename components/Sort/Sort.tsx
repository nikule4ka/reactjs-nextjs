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
  return (
    <div className={cn(s.sort, className)} {...props}>
      <div className={s.sortName} id="sort">
        Sort
      </div>
      <button
        id="rating"
        onClick={(): void => setSort(SortEnum.Rating)}
        className={cn({
          [s.active]: sort === SortEnum.Rating
        })}
        aria-selected={sort === SortEnum.Rating}
        aria-labelledby="sort rating"
      >
        <SortIcon className={s.sortIcon} />
        Rating
      </button>
      <button
        id="price"
        className={cn({
          [s.active]: sort === SortEnum.Price
        })}
        onClick={(): void => setSort(SortEnum.Price)}
        aria-selected={sort === SortEnum.Price}
      >
        <SortIcon className={s.sortIcon} />
        Price
      </button>
    </div>
  );
};

export default Sort;
