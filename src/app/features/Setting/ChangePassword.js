'use client'
import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useFormik } from "formik";
import * as Yup from "yup";
import { post } from "../../services/Service";
import { Change_Password } from "../../services/Url";
import { SUCCESS } from "../../services/Constants";
import { toast } from "react-toastify";

export const ChangePassword = () => {
  const [oldPwd, setOldPwd] = useState(false);
  const [newPwd, setNewPwd] = useState(false);
  const [rePwd, setRePwd] = useState(false);
  const [data, setData] = useState();

  const validationSchema = Yup.object().shape({
    oldPass: Yup.string().required("Old password is required"),
    newPass: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^_\-+=])[A-Za-z\d@$!%*?&#^_\-+=]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: @$!%*?&#^_-+="
      )
      .required("New password is required")
      .notOneOf(
        [Yup.ref("oldPass")],
        "New password must not match the old password"
      ),
    confirmPass: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPass")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      oldPass: "",
      newPass: "",
      confirmPass: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const body = JSON.stringify({
        old_password: values.oldPass,
        password: values.newPass,
      });
      const res = await post(Change_Password, body, setData);
      if (res === SUCCESS) {
        toast.success("Password updated successfully!");
        formik.resetForm();
      }
    },
  });

  return (
    <div className="tab-card">
      <div className="tab-heading">Change Password</div>
      <form className="form-design" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Old Password</label>
          <div
            className={`input-icon ${
              formik.touched.oldPass && formik.errors.oldPass
                ? "is-invalid"
                : ""
            }`}
          >
            <input
              type={oldPwd ? "text" : "password"}
              name="oldPass"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.oldPass}
              className={`form-control ${
                formik.touched.oldPass && formik.errors.oldPass
                  ? "is-invalid"
                  : ""
              }`}
            />
            <span onClick={() => setOldPwd(!oldPwd)}>
              {oldPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
          {formik.touched.oldPass && formik.errors.oldPass ? (
            <div className="error-text">{formik.errors.oldPass}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label>New Password</label>
          <div
            className={`input-icon ${
              formik.touched.newPass && formik.errors.newPass
                ? "is-invalid"
                : ""
            }`}
          >
            <input
              type={newPwd ? "text" : "password"}
              name="newPass"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPass}
              className={`form-control ${
                formik.touched.newPass && formik.errors.newPass
                  ? "is-invalid"
                  : ""
              }`}
            />
            <span onClick={() => setNewPwd(!newPwd)}>
              {newPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
          {formik.touched.newPass && formik.errors.newPass ? (
            <div className="error-text">{formik.errors.newPass}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label>Re-enter Password</label>
          <div
            className={`input-icon ${
              formik.touched.confirmPass && formik.errors.confirmPass
                ? "is-invalid"
                : ""
            }`}
          >
            <input
              type={rePwd ? "text" : "password"}
              name="confirmPass"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPass}
              className={`form-control ${
                formik.touched.confirmPass && formik.errors.confirmPass
                  ? "is-invalid"
                  : ""
              }`}
            />
            <span onClick={() => setRePwd(!rePwd)}>
              {rePwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
          {formik.touched.confirmPass && formik.errors.confirmPass ? (
            <div className="error-text">{formik.errors.confirmPass}</div>
          ) : null}
        </div>
        <div className="form-btn-group">
          <button type="submit" className="btn-design">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};
