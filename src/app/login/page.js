"use client"

import React, { useEffect } from "react";
import { Formik } from "formik";
import FormikButton from "@/sharedComponent/FormikButton";
import FormikInput from "@/sharedComponent/FormikInput";
import FormikError from "@/sharedComponent/FormikError";
import styles from "../signup/page.module.css";
import { loginInitialValues, loginValidationSchema } from "@/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../apislices/AuthSlice";
import { login } from "../../../store/reducers/AuthReducers";
import { useAuth } from "@/hooks/useAuthh";

const Login = () => {
const {user} = useAuth();
const router = useRouter();
const dispatch = useDispatch();
const [userLogin , {isLoading}] = useLoginMutation();


useEffect(() => {
  if(user){
    router.replace("/");
  }
} , [user])

const handleSubmit = async (values) => {
  try {
    const response = await userLogin(values);
    if(response?.data?.user) {
      dispatch(login(response?.data?.user));
      router.push("/");
    }
  } catch (error) {
    console.error("Error logging in", error);
  }
};

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