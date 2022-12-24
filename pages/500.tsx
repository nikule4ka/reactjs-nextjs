import { Htag } from "../components";
import { WithLayout } from "../layout/Layout";

export function Error500(): JSX.Element {
  return (
    <>
      <Htag tag="h1">Page not found - 500</Htag>
    </>
  );
}

export default WithLayout(Error500);
