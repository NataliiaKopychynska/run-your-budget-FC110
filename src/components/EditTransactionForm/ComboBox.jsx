import { useState, useRef, useEffect } from "react";
import s from "./ComboBox.module.css";

export default function ComboBox({  
  options,         
  value,           
  onChange,       
  placeholder,      
  errorMessage,    
}) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(value || "");
  const ref = useRef();

  
  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, []);

  
 const filtered = filter.trim() === ""
  ? options
  : options.filter(o =>
      o.value.toLowerCase().includes(filter.toLowerCase())
    );

  
  const selectValue = (val) => {
    setFilter(val);
    onChange(val);
    setOpen(false);
  };

  return (
    <div className={s.wrapper} ref={ref}>
      <input
        type="text"
        className={s.input}
        placeholder={placeholder}
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />

{open && filtered.length > 0 && (
  <ul className={s.dropdown}>
    {filtered.map(o => (
      <li
        key={o.value}
        className={s.option}
        onClick={() => selectValue(o.value)}
      >
        {o.value}
      </li>
    ))}
  </ul>
)}

      {errorMessage && <p className={s.error}>{errorMessage}</p>}
    </div>
  );
}