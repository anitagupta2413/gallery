import React from "react";

const FormikError = ({error}) => {
    return (
        <p className="p-0 m-0 errTxt">
            {error}
        </p>
    )
}

export default FormikError;