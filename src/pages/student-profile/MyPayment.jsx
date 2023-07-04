import moment from "moment";
import React from "react";
import { useAuthen } from "../../components/AuthenContext";
import { formatCurrency } from "../../utils/format";
import { localTime } from "../../utils/localTime";

const MyPayment = () => {
  const { userPayments } = useAuthen();

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {userPayments?.length > 0 &&
        userPayments.map((payment, index) => {
          const { course, paymentMethod, createdAt } = payment;
          const { price, title } = course;

          return (
            <div className="itemhistory" key={index}>
              <div className="name">{title}</div>
              <div className="payment">{paymentMethod}</div>
              <div className="date">{localTime(createdAt) || ""}</div>
              <div className="money">{formatCurrency(price)} đ</div>
            </div>
          );
        })}
      {/* <div className="itemhistory">
        <div className="name">Frontend Newbie</div>
        <div className="payment">Chuyển khoản</div>
        <div className="date">05/01/2022</div>
        <div className="money">4.500.000 VND</div>
      </div>
      <div className="itemhistory">
        <div className="name">Web Responsive</div>
        <div className="payment">Tiền mặt</div>
        <div className="date">14/07/2022</div>
        <div className="money">4.900.000 VND</div>
      </div> */}
    </div>
  );
};

export default MyPayment;
