import React from "react";
import s from "./Product.module.css";
import { ProductProps } from "./Product.props";
import Card from "../Card/Card";
import Rating from "../Rating/Rating";
import Tag from "../Tag/Tag";
import Button from "../Button/Button";
import { deсlOfNum, priceRegex } from "../../helpres/helpers";
import Divider from "../Divider/Divider";
import Image from "next/image";
import cn from "classnames";

const Product = ({ product }: ProductProps): JSX.Element => {
  return (
    <Card className={s.product}>
      <div className={s.logo}>
        <Image
          src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
          alt={product.title}
          width={70}
          height={70}
        />
      </div>

      <div className={s.title}>{product.title}</div>

      <div className={s.price}>
        {priceRegex(product.price)}
        {product.oldPrice && (
          <Tag color="green" className={s.oldPrice}>
            {priceRegex(product.price - product.oldPrice)}
          </Tag>
        )}
      </div>
      <div className={s.credit}>
        {priceRegex(product.credit)} <span className={s.month}>/ in month</span>
      </div>
      <div className={s.rating}>
        <Rating rating={product.reviewAvg ?? product.initialRating} />
      </div>
      <div className={s.tag}>
        {product.categories.map((category) => (
          <Tag key={category} color="ghost" className={s.category}>
            {category}
          </Tag>
        ))}
      </div>
      <div className={s.priceTitle}>Price</div>
      <div className={s.creditTitle}>Credit</div>
      <div className={s.rateTitle}>
        {product.reviewCount}
        &#32;
        {deсlOfNum(product.reviewCount, ["відгук", "вігука", "відгуків"])}
      </div>

      <Divider className={s.hr} />

      <div className={s.description}>{product.description}</div>
      <div className={s.feature}>
        {product.characteristics.map((characteristic) => (
          <div key={characteristic.name} className={s.characteristic}>
            <span className={s.characteristicName}>{characteristic.name}</span>
            <span className={s.characteristicDots}></span>
            <span className={s.characteristicValue}>
              {characteristic.value}
            </span>
          </div>
        ))}
      </div>
      <div className={s.advBlock}>
        {product.advantages && (
          <div className={s.advantages}>
            <div className={s.advTitle}>Advantages</div>
            <div>{product.advantages}</div>
          </div>
        )}

        {product.disadvantages && (
          <div className={s.disadvantages}>
            <div className={s.advTitle}>Disadvantages</div>
            <div>{product.disadvantages}</div>
          </div>
        )}
      </div>

      <Divider className={cn(s.hr, s.hr2)} />

      <div className={s.actions}>
        <Button appearance="primary">Learn more</Button>
        <Button appearance="ghost" arrow="right" className={s.reviewButton}>
          Read reviews
        </Button>
      </div>
    </Card>
  );
};

export default Product;
