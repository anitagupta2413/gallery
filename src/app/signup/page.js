"use client";
import React, { useEffect } from "react";
import { Formik } from "formik";
import {
  signupInitialValues,
  signUpValidationSchema,
} from "@/helper";
import FormikInput from "@/sharedComponent/FormikInput";
import styles from "./page.module.css";
import FormikButton from "@/sharedComponent/FormikButton";
import Link from "next/link";
import FormikError from "@/sharedComponent/FormikError";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSignupMutation } from "../../../apislices/AuthSlice";
import { useDispatch } from "react-redux";
import { signUp } from "../../../store/reducers/AuthReducers";
import { useAuth } from "@/hooks/useAuthh";

const SignUp = () => {
  const {user} = useAuth();
  const dispatch = useDispatch();
  const [userSignup , {isLoading}] = useSignupMutation();
  const router = useRouter();

  useEffect(() => {
    if(user){
      router.replace("/");
    }
  } , [user])
  
  const handleSubmit = async (values) => {
    try {
      const response = await userSignup(values);

      if(response?.data?.user){
        dispatch(signUp(response?.data?.user));
        router.push("/");
      }
    }
    catch(error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center ${styles.main}`}
    >
      <Formik
        initialValues={signupInitialValues}
        validationSchema={signUpValidationSchema}
        onSubmit={handleSubmit}
        validateOnSubmit={true}
      >
        {({ values, setFieldValue, errors, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className={`d-flex flex-column gap-3 justify-content-center align-items-center ${styles.form}`}
          >
            <div>
              <h2 className={styles.title}>Sign Up</h2>
              <p>Let's get started</p>
            </div>
            <div>
              <FormikInput
                type="text"
                name="name"
                placeHolder="Name"
                value={values?.name}
                onChange={(e) => {
                  setFieldValue("name", e.target.value);
                }}
              />
              {errors && errors?.name && <FormikError error={errors?.name} />}
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

            <div>
              <FormikInput
                type="text"
                name="confirmPassword"
                placeHolder="Confirm Password"
                value={values?.confirmPassword}
                onChange={(e) => {
                  setFieldValue("confirmPassword", e.target.value);
                }}
              />
              {errors && errors?.confirmPassword && (
                <FormikError error={errors?.confirmPassword} />
              )}
            </div>

            <FormikButton type="submit" text="Sign Up" />
            <div className="d-flex flex-row">
              <p>Already have an account?</p>
              <Link className="mx-1" href={"/login"}>
                Login
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
