'use client'
import React from "react";
import { PasswordInput } from "../../features/Form/PasswordInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/navigation'
import { sendData } from "../../services/Service";
import { BASE_URL, Reset_Password } from "../../services/Url";
import { SUCCESS } from "../../services/Constants";
import { toast } from "react-toastify";

// const BaseUrl = process.env.REACT_APP_BASE_URL;
const BaseUrl = BASE_URL;

const validationSchema = Yup.object().shape({
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

export default function ResetPassword({params}) {
    const router = useRouter();
    const id = params.id;
    

  const navigate = () => {
    // Use router.push to navigate to a different page
    router.push('/path/to/destination');
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const url = Reset_Password + "/" + id;
      const body = JSON.stringify({
        password: values.password,
      });
      const res = await sendData(url, body);
      if (res === SUCCESS) {
        toast.success("Password updated successfully!");
        navigate("/");
      }
    },
  });
  return (
    <div className="reset-page">
      <div
        className="bnr-sec bg"
        style={{ backgroundImage: `url('/images/banner-bg.jpg')` }}
      ></div>
      <div className="reset-pass">
        <div className="text-center mb-2">
          <img src={'/images/innerPages/chatlogo.png'} alt="img" />
        </div>
        <h4 className="mb-sm-5 mb-4 text-center">Reset Password</h4>
        <div>
          <form className="authForm w-100" onSubmit={formik.handleSubmit}>
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
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
