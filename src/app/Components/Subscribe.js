import React from "react";
import { Button } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { sendData } from "../services/Service";
import { Apply_Subscription } from "../services/Url";
import { SUCCESS } from "../services/Constants";

export const Subscribe = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Invalid email address"
        )
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      const body = JSON.stringify({
        email: values.email,
      });
      sendData(Apply_Subscription, body).then((res) => {
        if (res === SUCCESS) {
          toast.success("Successfully Subscribed!");
        }
        formik.setFieldValue("email", "");
      });
    },
  });

  const handleSubmit = (e) => {
    toast.dismiss();
    e.preventDefault();
    if (!formik.isValid && formik.submitCount >= 0) {
      toast.error(formik.errors.email);
      return;
    } else {
      formik.handleSubmit(e);
    }
  };

  return (
    <div className="subscribe-sec" data-aos="fade-up">
      <div className="subscribe-content">
        <h2 className="text-dark">Get Special Offers And More From Yone</h2>
        <p className="text-dark">
          Sign up now and get the best deals straight in your inbox!
        </p>
        <div className="d-flex gap-4">
          <input
            type="email"
            name="email"
            className="form-control subscribe-input px-4"
            id="exampleInputtext1"
            placeholder="Enter Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />
          <Button className="common-btn1" onClick={handleSubmit}>
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};
