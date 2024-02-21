import React from "react";
import { TextField } from "@mui/material";
import { PasswordInput } from "../Form/PasswordInput";
import MuiPhoneNumber from "material-ui-phone-number";
import parsePhoneNumber from "libphonenumber-js";
import { ImagePreview } from "../Form/ImagePreview";
import { useDispatch } from "react-redux";
import { modalVisible } from "../../redux/actions/commonAction";
import { MODAL_TYPE, SUCCESS } from "../../services/Constants";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { sendFormData } from "../../services/Service";
import { User_SignUp } from "../../services/Url";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const Signup = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
  }, []);

  localStorage.removeItem("user_email");
  localStorage.removeItem("user_phone");
  const COUNTRIES_TO_DISPLAY = ["gb", "in"]; // Array of country codes to display
  const [dialCode, setDialCode] = useState("");
  const [noWithOutDialCode, setNoWithOutDialCode] = useState("");
  const [userImg, setUserImg] = useState('/images/placeholder.png');

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full Name is required")
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain characters"),
    email: Yup.string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email address"
      )
      .required("Email is required"),
    phone: Yup.string()
      .test("phone", "Invalid phone number", function (value) {
        const phoneNumber = parsePhoneNumber(value, formik.values.countryCode);
        return phoneNumber && phoneNumber.isValid();
      })
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^_\-+=])[A-Za-z\d@$!%*?&#^_\-+=]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: @$!%*?&#^_-+="
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: null,
      phone: "",
      countryCode: "gb",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      toast.dismiss();
      const formData = new FormData();
      formData.append("name", values.fullName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phone_number", noWithOutDialCode);
      formData.append(
        "profile_picture",
        userImg === '/images/placeholder.png' ? null : userImg
      );
      formData.append("country_code", dialCode);
      const response = await sendFormData(User_SignUp, formData);

      if (response === SUCCESS) {
        localStorage.setItem("user_email", values.email);
        localStorage.setItem("user_phone", noWithOutDialCode);
        localStorage.setItem("country_code", dialCode);
        dispatch(modalVisible?.modalOpen(MODAL_TYPE?.VERIFICATION));
      } else {
        if (
          response.errors.hasOwnProperty("email") &&
          response.errors.hasOwnProperty("phone_number")
        ) {
          toast.error("User email and phone number already exists");
        } else if (response.errors.hasOwnProperty("email")) {
          toast.error("User email already exists");
        } else if (response.errors.hasOwnProperty("phone_number")) {
          toast.error("User phone number already exists");
        } else {
          toast.error("Something went wrong. Try again!");
        }
      }
    },
  });
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
      <div className="auth-mdl-wpr signup-form">
        <div className="auth-lft-ctnt">
          <img src={'/images/loginImg.jpg'} alt="img" />
        </div>
        <div className="auth-rgt-ctnt">
          <h4 className="mb-3">Register with Yone Travel</h4>
          <form className="authForm w-100" onSubmit={formik.handleSubmit}>
            <ImagePreview placeImg={userImg} imgHandler={setUserImg} />
            <div className="authForm-input">
              <TextField
                label="Full Name"
                name="fullName"
                id="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </div>
            <div className="authForm-input">
              <TextField
                type="email"
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
            <div
              className={
                formik.touched.phone && formik.errors.phone
                  ? "error-border authForm-input"
                  : "authForm-input"
              }
            >
              <div className="phn-input">
                <MuiPhoneNumber
                  defaultCountry={formik.values.countryCode}
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={(value, country) => {
                    formik.setFieldValue("phone", value);
                    setDialCode(`+${country.dialCode}`);
                    // Remove any non-numeric characters from phone no
                    const numericValue = value.replace(/[^\d]/g, "");
                    // Remove the dial code from the numeric value
                    const phoneValueWithoutDialCode = numericValue.replace(
                      country.dialCode,
                      ""
                    );
                    setNoWithOutDialCode(phoneValueWithoutDialCode);
                    formik.setFieldValue("countryCode", country.countryCode);
                  }}
                  value={formik.values.phone}
                  // onlyCountries={COUNTRIES_TO_DISPLAY}
                  countryCodeEditable
                  disableDropdown={false}
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <div className="error">{formik.errors.phone}</div>
              )}
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
            <div className="authForm-input">
              <PasswordInput
                labelName="Confirm Password"
                fieldProps={formik.getFieldProps("confirmPassword")}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                showPassword={formik.values.showConfirmPassword}
                setShowPassword={() =>
                  formik.setFieldValue(
                    "showConfirmPassword",
                    !formik.values.showConfirmPassword
                  )
                }
              />
            </div>
            <div className="auth-btn">
              <button type="submit" className="btn-design w-100">
                Sign up
              </button>
            </div>
          </form>
          <div className="othr-links">
            <p className="haveAcc">
              Already have an account?
              <span
                onClick={() =>
                  dispatch(modalVisible?.modalOpen(MODAL_TYPE?.LOGIN))
                }
              >
                {" "}
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
