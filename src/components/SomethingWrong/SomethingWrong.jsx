import s from "./SomethingWrong.module.css";

const SomethingWrong = () => {
  return (
    <div className={s.somethingWrong}>
      <p className={s.somethingWrongMain}>Something went wrong.</p>
      <p className={s.somethingWrongSecondary}>Please try again later.</p>
    </div>
  );
};
export default SomethingWrong;
