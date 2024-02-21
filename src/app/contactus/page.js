'use client'
import React from "react";
// import { POPUP_TYPE, SUCCESS } from "../../services/Constants";
import { useDispatch } from "react-redux";
import { popupVisible } from "../redux/actions/commonAction";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import { get, sendData } from "../services/Service";
import { Contact_Us, Get_Contact } from "../services/Url";
import { useState } from "react";
import { Banner } from "../Components/Banner";
import { POPUP_TYPE, SUCCESS } from "../services/Constants";

const bnrCtnt = {
  heading: "Contact Us",
  description: "Your feedback matters – contact us and let's make it count.",
  image: '/images/innerPages/Banner.jpg',
};
    export default function Contact() {
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name should be at least 3 characters long"),
    email: Yup.string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email address"
      )
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number should only contain digits and be 10 digits long')
      .required('Phone number is required'),
    subject: Yup.string()
      .required("Subject is required")
      .min(5, "Subject should be at least 5 characters long"),
    message: Yup.string()
      .required("Message is required")
      .min(10, "Message should be at least 10 characters long")
      .max(100, "Message can have a maximum of 100 characters."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const body = JSON.stringify({
        email: values.email,
        name: values.name,
        phone_number: values.phoneNumber,
        subject: values.subject,
        message: values.message
      });
      sendData(Contact_Us, body).then((res) => {
        if (res === SUCCESS) {
          dispatch(popupVisible?.popupOpen(POPUP_TYPE?.MESSAGE));
          formik.resetForm();
        }
      })
    },
  });
  useEffect(() => { get(Get_Contact, setData) }, []);

  return (
    <div className="contact-page">
      <Banner content={bnrCtnt} />

      {/* Contact Section */}
      <section className="contact-card-sec sec-padding">
        <div className="container">
          <div className="sec-heading-wpr text-center" data-aos="fade-left">
            <div className="cursiv-heading after-line center blue">
              Contact Us
            </div>
            <h2 className="sec-heading">
              Ready to Get our best Services!
              <br /> Feel free to contact with us
            </h2>
          </div>

          <div className="contact-cards">
            <div
              className="contact-card"
              data-aos="zoom-in"
            >
              <div className="contact-img">
                <img src={'/images/innerPages/location.png'} alt="img" />
              </div>
              <h4 className="contact-heading">Office Location</h4>
              <p className="contact-desc">
                {data?.address}
              </p>
            </div>
            <a
              href="mailto:Info@yonetravels.com"
              className="contact-card"
              data-aos="zoom-in"
            >
              <div className="contact-img">
                <img src={'/images/innerPages/mail.png'} alt="img" />
              </div>
              <h4 className="contact-heading">Email Address</h4>
              <p className="contact-desc">{data?.email}</p>
            </a>
            <a
              href="tel:+234 811 166 9663"
              className="contact-card"
              data-aos="zoom-in"
            >
              <div className="contact-img">
                <img src={'/images/innerPages/contact.png'} alt="img" />
              </div>
              <h4 className="contact-heading">Phone Number</h4>
              <p className="contact-desc">{data?.phone_number}</p>
            </a>
          </div>
        </div>
      </section>

      <section className="contact-form-sec sec-padding-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div
                className="sec-heading-wpr center-content-vertical"
                data-aos="fade-up"
              >
                <div className="cursiv-heading after-heading line">
                  Get In Touch
                </div>
                <h2 className="sec-heading">
                  Have questions? Feel free to write us
                </h2>
                <p>
                  Founded by Mrs H.O. Ogunye whose wealth of experience in the
                  travel industry, combined with her innovative and forward
                  thinking skills has been of tremendous value to our phenomenal
                  growth and development.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-form" data-aos="fade-left">
                <h3>Contact with us</h3>
                <form className="cstm-form-rw" onSubmit={formik.handleSubmit}>
                  <div className="fx-6">
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${formik.touched.name && formik.errors.name ? 'invalid' : ''}`}
                      placeholder="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="error-text">{formik.errors.name}</div>
                    ) : null}
                  </div>
                  <div className="fx-6">
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${formik.touched.email && formik.errors.email ? 'invalid' : ''}`}
                      placeholder="Email "
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error-text">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="fx-6">
                    <input
                      type="tel"
                      name="phoneNumber"
                      className={`form-control ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'invalid' : ''}`}
                      placeholder="Phone Number"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      <div className="error-text">{formik.errors.phoneNumber}</div>
                    ) : null}
                  </div>
                  <div className="fx-6">
                    <input
                      type="text"
                      name="subject"
                      className={`form-control ${formik.touched.subject && formik.errors.subject ? 'invalid' : ''}`}
                      placeholder="Subject"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.subject && formik.errors.subject ? (
                      <div className="error-text">{formik.errors.subject}</div>
                    ) : null}
                  </div>
                  <div className="fx-12">
                    <textarea
                      placeholder="Message"
                      rows={8}
                      name="message"
                      className={`form-control ${formik.touched.message && formik.errors.message ? 'invalid' : ''}`}
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.message && formik.errors.message ? (
                      <div className="error-text">{formik.errors.message}</div>
                    ) : null}
                  </div>
                  <div className="btn-wpr mt-sm-4 mt-2">
                    <button
                      type="submit"
                      className="btn-design d-inline-flex"
                      onClick={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                      }}
                    >
                      Send a Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
