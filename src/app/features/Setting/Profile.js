'use client'
import React, { useState, useContext, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import MuiPhoneNumber from "material-ui-phone-number";
import parsePhoneNumber from "libphonenumber-js";
import { useDispatch } from "react-redux";
import { modalVisible } from "../../redux/actions/commonAction";
import { sendData } from "../../services/Service";
import { Edit_User_Profile } from "../../services/Url";
import { toast } from "react-toastify";
import { MODAL_TYPE } from "../../services/Constants";
import UserContext from "../../context/userContextAPI";
import {
    Email_Phone_Edit,
    Email_Edit,
    Phone_Edit,
} from "../../services/Constants";

export const Profile = ({ item }) => {
    const [dialCode, setDialCode] = useState("");
    const [noWithOutDialCode, setNoWithOutDialCode] = useState("");
    const dispatch = useDispatch();
    const ctx = useContext(UserContext);

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
    });

    const isEmailDiff = () => {
        if (formik.values.email === item?.email) return false;
        else return true;
    };
    const isNameDiff = () => {
        if (formik.values.fullName === item?.name) return false;
        else return true;
    };

    const isPhoneDiff = () => {
        const completePhoneNumber = `${item?.country_code}${item?.phone_number}`;
        if (completePhoneNumber.replace(/[^\d]/g, "") === formik.values.phone.replace(/[^\d]/g, "")) return false;
        else return true;
    };

    const formik = useFormik({
        initialValues: {
            fullName: item?.name ? item?.name : '',
            email: item?.email ? item?.email : "",
            phone: `${item?.country_code}${item?.phone_number}`,
            countryCode: "in",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let body;

            if (isNameDiff() && !isPhoneDiff() && !isEmailDiff()) {
                //only name is updated
                body = {
                    name: values.fullName,
                };
            } else if (isEmailDiff() && !isNameDiff() && !isPhoneDiff()) {
                //only email id is changed
                body = {
                    email: values.email,
                };
                ctx.editDetailTypeHandler(Email_Edit);
            } else if (!isNameDiff() && !isEmailDiff() && isPhoneDiff()) {
                //only phone number is changed
                body = {
                    phone_number: noWithOutDialCode,
                    country_code: dialCode,
                };
                ctx.editDetailTypeHandler(Phone_Edit);
            } else if (isNameDiff() && isEmailDiff() && !isPhoneDiff()) {
                //name and email is changed
                body = {
                    email: values.email,
                    name: values.fullName,
                };
                ctx.editDetailTypeHandler(Email_Edit);
            } else if (isNameDiff() && isPhoneDiff() && !isEmailDiff()) {
                //name and phone is changed
                body = {
                    phone_number: noWithOutDialCode,
                    country_code: dialCode,
                    name: values.fullName,
                };
                ctx.editDetailTypeHandler(Phone_Edit);
            } else if (!isNameDiff() && isPhoneDiff() && isEmailDiff()) {
                //email and phone is changed
                body = {
                    phone_number: noWithOutDialCode,
                    country_code: dialCode,
                    email: values.email,
                };
                ctx.editDetailTypeHandler(Email_Phone_Edit);
            } else if (isNameDiff() && isEmailDiff() && isPhoneDiff()) {
                //email, phone and name is changed
                body = {
                    phone_number: noWithOutDialCode,
                    email: values.email,
                    country_code: dialCode,
                    name: values.fullName,
                };
                ctx.editDetailTypeHandler(Email_Phone_Edit);
            } else {
                return;
            }
            body = JSON.stringify(body);
            const res = await sendData(Edit_User_Profile, body);
            if (res === 0) {
                //only name is updated
                toast.success("Profile updated successfully!");
                ctx.profileUpdatedHandler();
            } else if (res === 1) {
                //only phone number is updated
                localStorage.setItem("user_phone", noWithOutDialCode);
                localStorage.setItem("country_code", dialCode);
                dispatch(modalVisible?.modalOpen(MODAL_TYPE?.VERIFICATION));
            } else if (res === 2) {
                //only email is updated
                localStorage.setItem("user_email", values.email);
                dispatch(modalVisible?.modalOpen(MODAL_TYPE?.VERIFICATION_OTP));
            } else if (res === 3) {
                //both email and phone is updated
                localStorage.setItem("user_email", values.email);
                localStorage.setItem("user_phone", noWithOutDialCode);
                localStorage.setItem("country_code", dialCode);
                dispatch(modalVisible?.modalOpen(MODAL_TYPE?.VERIFICATION));
            } else {
                return;
            }
        },
        enableReinitialize: true,
    });


    useEffect(() => {
        formik.resetForm();
    }, [ctx.profileUpdated]);


    return (
        <div className="tab-card">
            <div className="tab-heading">Edit Profile</div>
            <form className="form-design" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className={`form-control ${formik.touched.fullName && formik.errors.fullName ? "invalid" : ""
                            }`}
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.fullName && formik.errors.fullName ? (
                        <div className="error-text">{formik.errors.fullName}</div>
                    ) : null}
                </div>

                <div
                    className={
                        formik.touched.phone && formik.errors.phone
                            ? "error-border form-group"
                            : "form-group"
                    }
                >
                    <label>Phone Number</label>
                    <div className="phn-input">
                        <MuiPhoneNumber
                            defaultCountry="gb"
                            name="phone"
                            onBlur={formik.handleBlur}
                            onChange={(value, country) => {
                                formik.setFieldValue("phone", value);
                                setDialCode(`+${country.dialCode}`);
                                // Removing any non-numeric characters from phone no
                                const numericValue = value.replace(/[^\d]/g, "");
                                // Removing the dial code from the numeric value
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
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className={`form-control ${formik.touched.email && formik.errors.email ? "invalid" : ""
                            }`}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="error-text">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="form-btn-group">
                    <button className="btn-design" type="submit">
                        Save
                    </button>
                    <button
                        className="btn-design btn-primary"
                        onClick={(e) => {
                            e.preventDefault();
                            formik.resetForm();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};
