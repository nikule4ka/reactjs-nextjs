import { HtagProps } from "./Htag.props";
import * as S from "./Htag.styled";

const Htag = ({ tag, children }: HtagProps): JSX.Element => {
  switch (tag) {
    case "h1":
      return <S.StyledTagh1>{children}</S.StyledTagh1>;
    case "h2":
      return <S.StyledTagh2>{children}</S.StyledTagh2>;
    case "h3":
      return <S.StyledTagh3>{children}</S.StyledTagh3>;
    default:
      return <></>;
  }
};

export default Htag;
