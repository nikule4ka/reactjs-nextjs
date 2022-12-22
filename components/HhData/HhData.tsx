import React from "react";
import { HhDataProps } from "./HhData.props";
import s from "./HhData.module.css";
import Card from "../Card/Card";
import Rateicon from "./rate.svg";
import { priceRegex } from "../../helpres/helpers";

const HhData = ({
  count,
  juniorSalary,
  middleSalary,
  seniorSalary
}: HhDataProps): JSX.Element => {
  return (
    <div className={s.hh}>
      <Card className={s.count}>
        <div className={s.title}>All Vacancies</div>
        <div className={s.countValue}>{count}</div>
      </Card>
      <Card className={s.salary}>
        <div>
          <div className={s.title}>Junior</div>
          <div className={s.salaryValue}>{priceRegex(juniorSalary)}</div>
          <div className={s.rate}>
            <Rateicon className={s.filled} />
            <Rateicon />
            <Rateicon />
          </div>
        </div>

        <div>
          <div className={s.title}>Middle</div>
          <div className={s.salaryValue}>{priceRegex(middleSalary)}</div>
          <div className={s.rate}>
            <Rateicon className={s.filled} />
            <Rateicon className={s.filled} />
            <Rateicon />
          </div>
        </div>

        <div>
          <div className={s.title}>Senior</div>
          <div className={s.salaryValue}>{priceRegex(seniorSalary)}</div>
          <div className={s.rate}>
            <Rateicon className={s.filled} />
            <Rateicon className={s.filled} />
            <Rateicon className={s.filled} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HhData;
