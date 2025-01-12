import * as yup from "yup";

export const signupInitialValues = {
    name : "",
    email : "",
    password : "",
    confirmPassword : ""
}

export const loginInitialValues = {
    email : "",
    password : ''
}

export const signUpValidationSchema = yup.object().shape({
    name: yup.string().required("Required Field"), 
    email: yup.string().email("Invalid email").required("Required Field"),
    password: yup.string().required("Required Field"),
    confirmPassword: yup.string().required("Required Field"),
})

export const loginValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required Field"),
    password: yup.string().required("Required Field"),
})

