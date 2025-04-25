import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import { useState, useEffect,useRef } from "react";
import s from "./EditTransactionForm.module.css";
import { useDispatch } from "react-redux";
import { editTransaction } from "../../redux/transactions/operations";
import CalendarIcon from "../AddTransactionForm/CalendarIcon";
import schema from "../../schemas/transactionValidation";

const editSchema = schema.pick(["sum", "date", "comment","category"]);


const EditTransactionForm = ({ transaction, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(transaction.date));
 const type = transaction.type ? "income" : "expense";
    const datepickerRef = useRef(null);
    const [isCalOpen, setIsCalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
    defaultValues: {
      sum: transaction.sum,
      date: selectedDate,
      comment: transaction.comment,
      category: transaction.category, 
    },
  });

 useEffect(() => {
    setValue("date", selectedDate);
  }, [selectedDate, setValue]);

  const dispatch = useDispatch();
  const onSubmit = (data) => {
  dispatch(
    editTransaction({
      id: transaction.id,
      ...data,
      type,
    })
  )
    .unwrap()
    .then(onCancel); 
};

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={s.title}>Edit transaction</h2>

      <div className={s.switcher}>
        <span className={type === "income" ? s.active : s.inactive}>
          Income     
        </span>
        <span className={s.separator}>/</span>
        <span className={type === "expense" ? s.active : s.inactive}>Expense
        </span>
      </div>
<label>
  <input
    type="text"
    {...register("category")}
    className={s.inputCategory}
  />
  {errors.category && (
    <p className={s.error}>{errors.category.message}</p>
  )}
</label>
      <label>
        <input type="number" {...register("sum")} className={s.inputSum}/>
        {errors.sum && <p className={s.error}>{errors.sum.message}</p>}
      </label>

    <label className={s.datePickerWrapper}>
      <DatePicker
        ref={datepickerRef}
        selected={selectedDate}
        onChange={date => {
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
       onClick={() => setIsCalOpen(open => !open)}
       aria-label="Open calendar"
     >
       <CalendarIcon />
     </button>
      </label>
      <label>
        <input type="text" {...register("comment")} className={s.inputComment} />
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