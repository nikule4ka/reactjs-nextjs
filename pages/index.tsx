import { GetStaticProps } from "next";
import { Htag } from "../components";
import { WithLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpres/api";

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

function Home(): JSX.Element {
  return (
    <>
      <Htag tag="h1">hello</Htag>
    </>
  );
}

export default WithLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};
