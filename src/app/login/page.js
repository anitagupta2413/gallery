"use client"

import React from "react";
import { Formik } from "formik";
import FormikButton from "@/sharedComponent/FormikButton";
import FormikInput from "@/sharedComponent/FormikInput";
import FormikError from "@/sharedComponent/FormikError";
import styles from "../signup/page.module.css";
import { loginInitialValues, loginValidationSchema } from "@/helper";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
const router = useRouter();
    const handleSubmit = async (values) => {
      await axios
      .post("http://localhost:5000/api/auth/login", {
        email: values?.email,
        password: values?.password,
      })
      .then((data) => {
        localStorage.setItem('auth_token' , data.data.token);
        router.push("/");
      })
      .catch((error) => {
        console.log("error logging in", error);
      });
    }

    return (
        <div
        className={`d-flex justify-content-center align-items-center ${styles.main}`}
      >
        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
          validateOnSubmit={true}
        >
          {({ values, setFieldValue, errors ,handleSubmit}) => (
            <form
              onSubmit={handleSubmit}
              className={`d-flex flex-column gap-3 justify-content-center align-items-center ${styles.form}`}
            >
              <div className="d-flex flex-column justify-content-center align-items-center">  
                <h2 className={styles.title}>Log In</h2>
                <p>Please enter your details below</p>
              </div>
              <div>
                <FormikInput
                  type="text"
                  name="email"
                  placeHolder="Email"
                  value={values?.email}
                  onChange={(e) => {
                    setFieldValue("email", e.target.value);
                  }}
                />
                {errors && errors?.email && <FormikError error={errors?.email} />}
              </div>
  
              <div>
                <FormikInput
                  type="text"
                  name="password"
                  placeHolder="Password"
                  value={values?.password}
                  onChange={(e) => {
                    setFieldValue("password", e.target.value);
                  }}
                />
                {errors && errors?.password && (
                  <FormikError error={errors?.password} />
                )}
              </div>
              <FormikButton type="submit" text="Log in" />
              <div className="d-flex flex-row">
                <p>Don't have an account?</p>
                <Link className="mx-1" href={"/signup"}>
                  Sign up
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    )
}

export default Login;