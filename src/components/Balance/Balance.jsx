import React from "react";
import s from "./Balance.module.css";

export default function Balance() {
  return (
    <div className={s.container}>
      <p className={s.title}>Your balance</p>
      <h2 className={s.sum}>₴ Заглушка</h2>
    </div>
  );
}
