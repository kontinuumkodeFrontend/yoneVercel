import React from "react";
import { TextField } from "@mui/material";
import { modalVisible } from "../../redux/actions/commonAction";
import { useDispatch } from "react-redux";
import { MODAL_TYPE } from "../../services/Constants";
import * as Yup from "yup";
import { useFormik } from "formik";
import { BASE_URL, Forget_Password } from "../../services/Url";
import { toast } from "react-toastify";

// const BaseUrl = process.env.REACT_APP_BASE_URL;
const BaseUrl = BASE_URL;

export const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email address"
      ).required("Email is required"),
    }),
    onSubmit: (values) => {
      toast.dismiss();
      const url = BaseUrl + Forget_Password;
      const body = JSON.stringify({
        email: values.email,
      });
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
        .then((response) => {
          if (response.status === 404) {
            throw new Error('Email not found');
          } else {
            return response.json();
          }
        }
        ).then((res) => {
          toast.dismiss();
          toast.success(res.data);
          formik.resetForm();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    },
  });

  const dispatch = useDispatch();
  return (
    <div className="mdl-wpr">
      <div
        className="modalClose MuiBox-root css-0"
        onClick={() => dispatch(modalVisible?.modalClose())}
      >
        <svg
          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="CloseIcon"
        >
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </div>
      <div className="auth-mdl-wpr forgot-pwd">
        <div className="auth-lft-ctnt">
          <img src={'images/loginImg.jpg'} alt="img" />
        </div>
        <div className="auth-rgt-ctnt justify-content-center">
          <h4>Forgot your password? </h4>
          <form className="authForm w-100" onSubmit={formik.handleSubmit}>
            <div className="authForm-input">
              <TextField
                label="Email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="auth-btn">
              <button type="submit" className="btn-design w-100" style={{ cursor: 'pointer' }}>
                Submit
              </button>
            </div>
          </form>
          <div className="othr-links">
            <p
              className="forgot"
              onClick={() =>
                dispatch(modalVisible?.modalOpen(MODAL_TYPE?.LOGIN))
              }
            >
              Back to Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
