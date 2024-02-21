'use client'
import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import { useFormik } from "formik";

const ItineraryForm = ({ formSubmit, isLoading }) => {
  const [value, setValue] = useState(null);
  const [starError, setStarError] = useState();

  const validationSchema = Yup.object().shape({
    destination: Yup.string()
      .required("Destination is required")
      .min(3, "Destination must be at least 3 characters")
      .max(100, "Destination must not exceed 100 characters"),
    totalDays: Yup.number()
      .required("Total number of days is required")
      .min(1, "Total days must be at least 1 day")
      .max(20, "Total days cannot exceed 20 days"),
    budget: Yup.number()
      .required("Budget is required")
      .min(45, "Budget must be at least 45")
      .max(1000000, "Budget cannot exceed 1,000,000"),
  });

  const formik = useFormik({
    initialValues: {
      destination: "",
      totalDays: "",
      budget: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (value) {
        formSubmit({ ...values, accommodation: value });
        setStarError("");
      } else {
        setStarError("Please select your accommodation preference.");
      }
    },
  });

  useEffect(() => {
    if (window.google && window.google.maps) {
      // Once the script is loaded, initialize the Autocomplete
      const destinationInput = document.getElementById("destination");
      const destinationAutocomplete =
        new window.google.maps.places.Autocomplete(destinationInput);
      destinationAutocomplete.addListener("place_changed", () => {
        const selectedPlace = destinationAutocomplete.getPlace();

        // Extract address components
        const addressComponents = selectedPlace.address_components;
        let city, state, country;

        for (const component of addressComponents) {
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
          if (component.types.includes("country")) {
            country = component.long_name;
          }
        }
        // Create the destination string with city, state, and country
        const destinationString = [city, state, country]
          .filter(Boolean)
          .join(", ");
        formik.setFieldValue("destination", destinationString);
      });
    }
  }, [formik]);

  return (
    <div className="form-box">
      <h4>Trip Itinerary</h4>
      <form
        className="d-flex flex-column gap-sm-4 gap-3"
        onSubmit={formik.handleSubmit}
      >
        <div className="input-grp">
          <div>
            <input
              type="text"
              name="destination"
              id="destination"
              placeholder="Destination"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.destination}
              className={
                formik.touched.destination &&
                formik.errors.destination &&
                "input-error"
              }
            />
            {formik.touched.destination && formik.errors.destination ? (
              <p className="error">{formik.errors.destination}</p>
            ) : null}
          </div>
        </div>
        <div className="input-grp">
          <div>
            <input
              type="number"
              name="totalDays"
              id="days"
              placeholder="No. of days"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.totalDays}
              className={
                formik.touched.totalDays &&
                formik.errors.totalDays &&
                "input-error"
              }
            />
            {formik.touched.totalDays && formik.errors.totalDays ? (
              <p className="error">{formik.errors.totalDays}</p>
            ) : null}
          </div>

          <div className="position-relative">
            {formik.values.budget > 0 && <p className="dollar-sign">$</p>}
            <input
              type="number"
              name="budget"
              id="budget"
              style={formik.values.budget > 0 ? { paddingLeft: "30px" } : {}}
              placeholder="Budget"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.budget}
              className={
                formik.touched.budget && formik.errors.budget && "input-error"
              }
            />
            {formik.touched.budget && formik.errors.budget ? (
              <p className="error">{formik.errors.budget}</p>
            ) : null}
          </div>
        </div>
        <div className="input-grp">
          <div className="m-auto text-center">
            <Typography component="legend">Accommodation Prefrence</Typography>
            <Rating
              name="accomModation"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              className="mx-auto"
              size="large"
            />
            {!value && starError ? <p className="error text-center">{starError}</p> : null}
          </div>
        </div>
        <div className="text-center">
          <button type="submit">Get Started</button>
        </div>
        {isLoading && (
          <div className="spinner">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ItineraryForm;
