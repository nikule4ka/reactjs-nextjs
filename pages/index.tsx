import { Button, Htag } from "../components";

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag="h1">hello</Htag>
      <Button arrow="wtite" appearance="primary">
        Кнопка
      </Button>
      <Button arrow="none" appearance="ghost">
        Кнопка
      </Button>
    </>
  );
}
