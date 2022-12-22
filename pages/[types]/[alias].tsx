import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";
import { WithLayout } from "../../layout/Layout";
import { MenuItem } from "../../interfaces/menu.interface";
import {
  TopLevelCategory,
  TopPageModel
} from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.inteface";
import { firstLevelMenu } from "../../helpres/helpers";
import { TopPageComponent } from "../../page-components";
import { API } from "../../helpres/api";

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}

function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
  return (
    <>
      <TopPageComponent
        firstCategory={firstCategory}
        page={page}
        products={products}
      />
    </>
  );
}

export default WithLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const menuItem of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: menuItem.id
    });
    paths = paths.concat(
      menu.flatMap((p) => p.pages.map((pa) => `/${menuItem.route}/${pa.alias}`))
    );
  }

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
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

  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id
    });
    if (menu.length === 0) {
      return {
        notFound: true
      };
    }

    const { data: page } = await axios.get<TopPageModel>(
      API.topPage.byAlias + params.alias
    );

    const { data: products } = await axios.post<ProductModel[]>(
      API.product.find,
      {
        category: page.category,
        limit: 10
      }
    );
    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};
