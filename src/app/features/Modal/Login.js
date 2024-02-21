import React, { useState, useContext } from "react";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { PasswordInput } from "../Form/PasswordInput";
import { ForgotPassword } from "./ForgotPassword";
import { modalVisible } from "../../redux/actions/commonAction";
import { useDispatch } from "react-redux";
import { MODAL_TYPE, SUCCESS } from "../../services/Constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendData } from "../../services/Service";
import { User_SignIn } from "../../services/Url";
import { toast } from "react-toastify";
import UserContext from "@/app/context/userContextAPI";

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const Login = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const ctx = useContext(UserContext);

  const emailOrPhoneCookie = decodeURIComponent(
    document.cookie.replace(
      /(?:(?:^|.*;\s*)ideorp\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    )
  );
  const passwordCookie = decodeURIComponent(
    document.cookie.replace(/(?:(?:^|.*;\s*)idp\s*=\s*([^;]*).*$)|^.*$/, "$1")
  );

  const [checked, setChecked] = useState(() => {
    if (emailOrPhoneCookie && passwordCookie) {
      return true;
    } else {
      return false;
    }
  });

  const emailOrPhoneValidation = (value) => {
    // validation for enail email or phone format
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^[0-9]{8,12}$/; // Allow 8 to 12 digits

    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return false;
    }
    // If it's a phone number, check that it doesn't contain a country code
    if (phoneRegex.test(value) && (value.length < 8 || value.length > 12)) {
      return false;
    }
    return true;
  };

  const validationSchema = Yup.object().shape({
    emailOrPhone: Yup.string()
      .test(
        "emailOrPhone",
        "Invalid email or phone format",
        emailOrPhoneValidation
      )
      .required("Email or phone is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      emailOrPhone: emailOrPhoneCookie ? emailOrPhoneCookie : "",
      password: passwordCookie ? passwordCookie : "",
      showPassword: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const loginData = JSON.stringify({
        email: values.emailOrPhone,
        password: values.password,
      });
      toast.dismiss();
      const response = await sendData(User_SignIn, loginData);
      if (response === SUCCESS) {
        ctx.loginHandler();
        dispatch(modalVisible?.modalClose());
        if (checked) {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 10);
          document.cookie = `ideorp=${encodeURIComponent(
            values.emailOrPhone
          )}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
          document.cookie = `idp=${encodeURIComponent(
            values.password
          )}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
        }
      }
    },
  });

  return (
    <div className="mdl-wpr">
      {modal ? (
        <div className="overlay">
          <ForgotPassword />
        </div>
      ) : (
        ""
      )}
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
      <div className="auth-mdl-wpr">
        <div className="auth-lft-ctnt">
          <img src={'/images/loginImg.jpg'} alt="img" />
        </div>
        <div className="auth-rgt-ctnt">
          <h4>Login with Yone Travel</h4>
          <form className="authForm w-100" onSubmit={formik.handleSubmit}>
            <div className="authForm-input">
              <TextField
                label="Email or Phone No."
                name="emailOrPhone"
                id="emailOrPhone"
                value={formik.values.emailOrPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.emailOrPhone &&
                  Boolean(formik.errors.emailOrPhone)
                }
                helperText={
                  formik.touched.emailOrPhone && formik.errors.emailOrPhone
                }
              />
            </div>
            <div className="authForm-input">
              <PasswordInput
                labelName="Password"
                fieldProps={formik.getFieldProps("password")}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                showPassword={formik.values.showPassword}
                setShowPassword={() =>
                  formik.setFieldValue(
                    "showPassword",
                    !formik.values.showPassword
                  )
                }
              />
            </div>
            <div className="remember">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked === true}
                    onChange={(e) => {
                      setChecked(e.target.checked);
                      if (checked) {
                        deleteCookie("ideorp"); //delete the cookie
                        deleteCookie("idp");
                      }
                    }}
                  />
                }
                label="Remember me"
              />
            </div>
            <div className="auth-btn">
              <button type="submit" className="btn-design w-100">
                Login
              </button>
            </div>
          </form>
          <div className="othr-links">
            <p
              className="forgot"
              onClick={() =>
                dispatch(modalVisible?.modalOpen(MODAL_TYPE?.FORGOT_PASSWORD))
              }
            >
              {" "}
              Forgot your password?
            </p>
            <p className="haveAcc">
              Don't have an account?
              <span
                onClick={() =>
                  dispatch(modalVisible?.modalOpen(MODAL_TYPE?.SIGN_UP))
                }
              >
                {" "}
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
