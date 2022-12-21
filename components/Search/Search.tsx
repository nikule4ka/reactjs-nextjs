import React, { KeyboardEvent, useState } from "react";
import cn from "classnames";
import s from "./Search.module.css";
import { SearchProps } from "./Search.props";
import Input from "../Input/Input";
import Button from "../Button/Button";
import GlassIcon from "./glass.svg";
import { useRouter } from "next/router";

const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>();
  const router = useRouter();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  const onClickSearch = (): void => {
    router.push({
      pathname: "/search",
      query: { q: search }
    });
  };
  return (
    <div className={cn(s.search, className)} {...props}>
      <Input
        className={s.input}
        placeholder="Search..."
        value={search}
        onChange={(e): void => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button className={s.button} appearance="primary" onClick={onClickSearch}>
        <GlassIcon />
      </Button>
    </div>
  );
};

export default Search;
