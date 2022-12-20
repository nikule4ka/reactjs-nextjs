import {
  TopLevelCategory,
  TopPageModel
} from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.inteface";

export interface TopPageComponentProps {
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
