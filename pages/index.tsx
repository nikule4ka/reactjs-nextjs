import { Button, Htag, Paragraph } from "../components";

export default function Home(): JSX.Element {
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
    </>
  );
}
