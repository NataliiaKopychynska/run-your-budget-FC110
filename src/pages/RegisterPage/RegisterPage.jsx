import RegisterForm from "../../components/RegisterForm/RegisterForm";
import s from "./RegisterPage.module.css";

function RegisterPage() {
  return (
    <div className={s.reg_page}>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
