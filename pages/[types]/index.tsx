import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from "axios";
import { WithLayout } from "../../layout/Layout";
import { MenuItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpres/helpers";
import { ParsedUrlQuery } from "querystring";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { API } from "../../helpres/api";

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
}

function Type({ firstCategory }: TypeProps): JSX.Element {
  return <>Type: {firstCategory} </>;
}

export default WithLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map((m) => "/" + m.route),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({
  params
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    };
  }

  const firstCategoryItem = firstLevelMenu.find(
    (menu) => menu.route === params.types
  );

  if (!firstCategoryItem) {
    return {
      notFound: true
    };
  }

  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id
  });
  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  };
};
