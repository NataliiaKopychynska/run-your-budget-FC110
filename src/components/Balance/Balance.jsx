import React, { useEffect } from "react";
import s from "./Balance.module.css";
import { useDispatch, useSelector } from "react-redux";
import { balanceSelector } from "../../redux/balance/selectors";
import { getBalance } from "../../redux/balance/operations";

export default function Balance() {
  const dispatch = useDispatch();
  const total = useSelector(balanceSelector);
  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);
  console.log(total);
  return (
    <div className={s.container}>
      <p className={s.title}>Your balance</p>
      <h2 className={s.sum}>₴ {total}</h2>
    </div>
  );
}
