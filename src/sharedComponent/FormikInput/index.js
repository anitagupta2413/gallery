import React from "react";
import styles from "./index.module.css";

const FormikInput = ({ type , name, placeHolder, value, onChange }) => {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
    />
  );
};

export default FormikInput;
