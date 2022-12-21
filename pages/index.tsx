import { GetStaticProps } from "next";
import { useState } from "react";
import {
  Button,
  Htag,
  Input,
  Paragraph,
  Rating,
  Tag,
  TextArea
} from "../components";
import { WithLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(3);
  console.log(menu);

  return (
    <>
      <Htag tag="h1">hello</Htag>
      <Button arrow="wtite" appearance="primary">
        Кнопка
      </Button>
      <Button appearance="ghost">Кнопка</Button>
      <Paragraph size="small">Hi-small</Paragraph>
      <Paragraph>Hi-medium</Paragraph>
      <Paragraph size="large">Hi-large</Paragraph>
      <Tag size="s">tag-small-ghost</Tag>
      <Tag size="m" color="red">
        tag-m-red
      </Tag>
      <Tag size="m" color="green">
        tag-m-green
      </Tag>
      <Tag size="m" color="primary">
        tag-m-green
      </Tag>
      <Rating rating={rating} setRating={setRating} isEditable />
      <Input />
      <TextArea />
    </>
  );
}

export default WithLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    {
      firstCategory
    }
  );
  return {
    props: {
      menu,
      firstCategory
    }
  };
};
