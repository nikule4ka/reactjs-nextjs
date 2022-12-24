import React, { ForwardedRef, forwardRef, useRef, useState } from "react";
import s from "./Product.module.css";
import { ProductProps } from "./Product.props";
import Card from "../Card/Card";
import Rating from "../Rating/Rating";
import Tag from "../Tag/Tag";
import Button from "../Button/Button";
import { deсlOfNum, priceRegex } from "../../helpres/helpers";
import Divider from "../Divider/Divider";
// import Image from "next/image";
import cn from "classnames";
import Review from "../Review/Review";
import ReviewForm from "../ReviewForm/ReviewForm";
import { motion } from "framer-motion";

const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

      const reviewRef = useRef<HTMLDivElement>(null);

      const variants = {
        visible: { opacity: 1, height: "auto" },
        hidden: { opacity: 0, height: 0 }
      };

      const scrollToReview = (): void => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        reviewRef.current?.focus();
      };

      return (
        <div className={cn(className)} {...props} ref={ref}>
          <Card className={s.product}>
            <div className={s.logo}>
              <img
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>

            <div className={s.title}>{product.title}</div>

            <div className={s.price}>
              <span>
                <span className="visualyHidden">Price</span>
                {priceRegex(product.price)}
              </span>
              {product.oldPrice && (
                <Tag color="green" className={s.oldPrice}>
                  <span>
                    <span>Credit</span>
                    {priceRegex(product.price - product.oldPrice)}
                  </span>
                </Tag>
              )}
            </div>
            <div className={s.credit}>
              <span>
                <span className="visualyHidden">Sale</span>
                {priceRegex(product.credit)}
              </span>
              <span className={s.month}>/ in month</span>
            </div>
            <div className={s.rating}>
              <span className="visualyHidden">
                {"Rating" + (product.reviewAvg ?? product.initialRating)}
              </span>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={s.tag}>
              {product.categories.map((category) => (
                <Tag key={category} color="ghost" className={s.category}>
                  {category}
                </Tag>
              ))}
            </div>
            <div className={s.priceTitle} aria-hidden={true}>
              Price
            </div>
            <div className={s.creditTitle} aria-hidden={true}>
              Credit
            </div>
            <div className={s.rateTitle}>
              <a href="#ref" onClick={scrollToReview}>
                {product.reviewCount}
                &nbsp;
                {deсlOfNum(product.reviewCount, [
                  "відгук",
                  "вігука",
                  "відгуків"
                ])}
              </a>
            </div>

            <Divider className={s.hr} />

            <div className={s.description}>{product.description}</div>
            <div className={s.feature}>
              {product.characteristics.map((characteristic) => (
                <div key={characteristic.name} className={s.characteristic}>
                  <span className={s.characteristicName}>
                    {characteristic.name}
                  </span>
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
              <Button
                appearance="ghost"
                arrow={isReviewOpened ? "down" : "right"}
                className={s.reviewButton}
                onClick={(): void => setIsReviewOpened(!isReviewOpened)}
                aria-expanded={isReviewOpened}
              >
                Read reviews
              </Button>
            </div>
          </Card>

          {product.reviews && (
            <motion.div
              animate={isReviewOpened ? "visible" : "hidden"}
              variants={variants}
              initial="hidden"
            >
              <Card
                color="blue"
                className={cn(s.reviews)}
                ref={reviewRef}
                tabIndex={isReviewOpened ? 0 : -1}
              >
                {product.reviews.map((review) => (
                  <div key={review._id}>
                    <Review review={review} />
                    <Divider />
                  </div>
                ))}
                <ReviewForm productId={product._id} isOpened={isReviewOpened} />
              </Card>
            </motion.div>
          )}
        </div>
      );
    }
  )
);

export default Product;
