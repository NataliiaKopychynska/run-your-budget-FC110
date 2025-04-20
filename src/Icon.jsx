import Icons from "../public/img/icons.svg";

export const Icon = ({ id, className }) => {
  return (
    <svg className={className}>
      <use href={Icons + id}></use>
    </svg>
  );
};
