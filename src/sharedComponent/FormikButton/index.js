import React from "react";
import styles from './index.module.css';
import { Button } from "react-bootstrap";

const FormikButton = ({text , type}) => {
    return (
        <Button className={`w-100 ${styles.btn}`} type={type}>{text}</Button>
    )
}

export default FormikButton;