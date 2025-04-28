import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import { useState, useEffect,useRef } from "react";
import s from "./EditTransactionForm.module.css";
import { useDispatch } from "react-redux";
import { editTransaction } from "../../redux/transactions/operations";
import CalendarIcon from "../AddTransactionForm/CalendarIcon";
import schema from "../../schemas/transactionValidation";
import { expenseCategories } from "../../constants/transactionCategories";
import * as yup from "yup";
import ComboBox from "./ComboBox";
const EditTransactionForm = ({ transaction, onCancel }) => {

  const serverType = transaction.type;
  const isIncome = serverType === true || serverType === "income";
  const type = isIncome ? "income" : "expenses";

  const validCategories = expenseCategories.map(c => c.value);
 const expenseEditSchema = schema
  .pick(["sum", "date", "comment", "category"])
  .shape({
    category: yup.string().oneOf(validCategories, "Choose a valid category").required(),
  });

const incomeEditSchema = schema.pick(["sum", "date", "comment"]);

const editSchema = isIncome ? incomeEditSchema : expenseEditSchema;

  const defaultValues = {
    sum: transaction.sum,
    date: transaction.date.slice(0, 10),
    comment: transaction.comment,
    ...(!isIncome && { category: transaction.category }),
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
    defaultValues,
  });

  const [selectedDate, setSelectedDate] = useState(
    new Date(transaction.date)
  );
  const datepickerRef = useRef(null);
  const [isCalOpen, setIsCalOpen] = useState(false);

  useEffect(() => {
    const iso = selectedDate.toISOString().slice(0, 10);
    setValue("date", iso);
  }, [selectedDate, setValue]);

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const payload = {
      _id: transaction._id,
      sum: Number(data.sum),
      date: selectedDate.toISOString().slice(0, 10),
      comment: data.comment,
      type,
      category: isIncome ? data.category || "income" : data.category,
    };
   

    dispatch(editTransaction(payload))
      .unwrap()
      .then(onCancel)
      
  };

  return (
    <form
  className={`${s.form} ${isIncome ? s.incomeForm : s.expenseForm}`}
  onSubmit={handleSubmit(onSubmit)}
>
      <h2 className={s.title}>Edit transaction</h2>

      <div className={s.switcher}>
        <span className={isIncome ? s.activeIncome : s.inactive}>Income</span>
        <span className={s.separator}>/</span>
        <span className={!isIncome ? s.activeExpense : s.inactive}>Expense</span>
      </div>

      {!isIncome && (
      <ComboBox className={s.comboWrapper}
    options={expenseCategories}                    
    value={getValues("category")}
    onChange={(val) => setValue("category", val)}
    placeholder="Select or enter a category"
    errorMessage={errors.category?.message}
  />
      )}

      <div className={s.row}>
    <label className={s.field}>
      <input
        type="number"
        {...register("sum")}
        className={s.inputSum}
      />
      {errors.sum && <p className={s.error}>{errors.sum.message}</p>}
    </label>

    <label className={`${s.field} ${s.datePickerWrapper}`}>
      <DatePicker
        ref={datepickerRef}
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setIsCalOpen(false);
        }}
        open={isCalOpen}
        onClickOutside={() => setIsCalOpen(false)}
        preventOpenOnFocus
        dateFormat="yyyy-MM-dd"
        className={s.inputDate}
      />
      {errors.date && <p className={s.error}>{errors.date.message}</p>}
      <button
        type="button"
        className={s.calendarIcon}
        onClick={() => setIsCalOpen((o) => !o)}
        aria-label="Open calendar"
      >
        <CalendarIcon />
      </button>
    </label>
  </div>
  <label>
    <input
      type="text"
      {...register("comment")}
      className={s.inputComment}
    />
    {errors.comment && <p className={s.error}>{errors.comment.message}</p>}
  </label>
      <div className={s.buttons}>
        <button type="submit" className={s.saveBtn}>SAVE</button>
        <button type="button" className={s.cancelBtn} onClick={onCancel}>
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default EditTransactionForm;


 