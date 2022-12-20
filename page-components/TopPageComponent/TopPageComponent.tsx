import React from "react";
import { HhData, Htag, Tag } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import s from "./TopPageComponent.module.css";
import { TopLevelCategory } from "../../interfaces/page.interface";

const TopPageComponent = ({
  firstCategory,
  products,
  page
}: TopPageComponentProps): JSX.Element => {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="grey" size="m">
            {products.length}
          </Tag>
        )}
        <span>Sorting</span>
      </div>
      <div>
        {products &&
          products.map((product) => (
            <div key={product._id}>{product.title}</div>
          ))}
      </div>
      <div className={s.hhTitle}>
        <Htag tag="h2">Vacancies - {page.category}</Htag>

        <Tag color="red" size="m">
          hh.com
        </Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && <HhData {...page.hh} />}
    </div>
  );
};

export default TopPageComponent;
