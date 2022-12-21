import React from "react";
import { Advantages, HhData, Htag, Tag } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import s from "./TopPageComponent.module.css";
import { TopLevelCategory } from "../../interfaces/page.interface";

const TopPageComponent = ({
  firstCategory,
  products,
  page
}: TopPageComponentProps): JSX.Element => {
  return (
    <div>
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
      {firstCategory === TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}

      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2">Advantages</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}

      {page.seoText && (
        <div
          className={s.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag="h2">Received skills</Htag>
      {page.tags.map((tag) => (
        <Tag key={tag} color={"primary"}>
          {tag}
        </Tag>
      ))}
    </div>
  );
};

export default TopPageComponent;
