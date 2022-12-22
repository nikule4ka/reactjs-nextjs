import { DetailedHTMLProps, HTMLAttributes } from "react";
import { ReviewModel } from "../../interfaces/product.inteface";

export interface ReviewProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  review: ReviewModel;
}
