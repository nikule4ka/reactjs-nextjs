import { useState } from "react";
import { Button, Htag, Paragraph, Rating, Tag } from "../components";

export default function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(3);
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
    </>
  );
}
