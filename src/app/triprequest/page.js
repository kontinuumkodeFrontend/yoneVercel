"use client";
import React, { useState, useEffect } from "react";
import { InnerBanner } from "../Components/InnerBanner";
import SelectBox from "../features/Form/SelectBox";
import { ApplyOffer } from "../features/Coupons/ApplyOffer";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import { get, sendData } from "../services/Service";
import {
  Get_Individual_Offer,
  Get_Offers,
  Request_Trip,
} from "../services/Url";
import { SUCCESS } from "../services/Constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Carousel from "better-react-carousel";

const today = new Date();
const minDate = (date) => {
  const minDate = new Date(date);
  minDate.setDate(today.getDate() + 1);
  return minDate.toISOString().split("T")[0];
};

const bnrCtnt = {
  heading: "Request your Trip",
  description: "Let’s know what you are interested to see!",
  image: "/images/innerPages/innerBanner.jpg",
};

export default function RequestTrip({ params }) {
  const router = useRouter();
  const { offerId: selectedOfferId } = params;
  const [numOfPass, setNumOfPass] = useState("");
  const [offers, setOffers] = useState([]);
  const [individualOffer, setIndividualOffer] = useState();
  const [offerID, setOfferID] = useState(null);
  const [offerName, setOfferName] = useState();
  const [bookClick, setBookClick] = useState(false);
  const [ageValues, setAgeValues] = useState({});
  const [percent, setPercent] = useState();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    if (selectedOfferId) {
      const url = Get_Individual_Offer + "/" + selectedOfferId;
      get(url, setIndividualOffer);
    }
  }, [selectedOfferId]);

  useEffect(() => {
    if (individualOffer) {
      const text = individualOffer?.title;
      const number = text.match(/(\d+)%/); // to extract number from title
      const percentageOff = number ? number[1] : "";
      setPercent(percentageOff);
    }
  }, [individualOffer]);

  //for input type select box
  const [selectTouched, setSelectTouched] = useState(false);
  const [selectError, setSelectError] = useState();
  const [flights, setFlights] = useState({
    flight1: "",
    flight2: "",
    flight3: "",
  });
  const [hotel, setHotel] = useState({
    hotel1: "",
    hotel2: "",
    hotel3: "",
  });
  const [activity, setActivity] = useState({
    activity1: "",
    activity2: "",
    activity3: "",
  });

  useEffect(() => {
    get(Get_Offers, setOffers);
  }, []);

  const generateValidationSchema = (numOfPass) => {
    const schemaObject = {
      startDate: Yup.date()
        .min(new Date(), "Start date must be in the future")
        .max(
          new Date(new Date().setMonth(new Date().getMonth() + 3)),
          "Start date can be up to 3 months from the current date"
        )
        .required("Start date is required"),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "End date must be after start date")
        .test(
          "max",
          "End date can be up to 3 months from start date",
          function (value) {
            const startDate = this.resolve(Yup.ref("startDate"));
            const endDate = new Date(value);
            const maxEndDate = new Date(startDate);
            maxEndDate.setMonth(startDate.getMonth() + 3);
            return endDate <= maxEndDate;
          }
        )
        .required("End date is required"),
      source: Yup.string().required("Source is required"),
      destination: Yup.string()
        .required("Destination is required")
        .test(
          "not-same",
          "Source and destination can't be the same",
          function (value) {
            return value !== this.parent.source;
          }
        ),
    };

    for (let i = 1; i <= parseInt(numOfPass); i++) {
      schemaObject[`age${i}`] = Yup.number()
        .required(`Age of passenger ${i} is required`)
        .min(1, "Minimum age is 1")
        .max(100, "Maximum age is 100");
    }

    return Yup.object().shape(schemaObject);
  };

  const handleAgeChange = (fieldName, fieldValue) => {
    setAgeValues((prevAgeValues) => ({
      ...prevAgeValues,
      [fieldName]: fieldValue,
    }));
  };

  const handleFlightChange = (e) => {
    const { name, value } = e.target;
    setFlights((prevFlights) => ({
      ...prevFlights,
      [name]: value,
    }));
  };
  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotel((prevHotels) => ({
      ...prevHotels,
      [name]: value,
    }));
  };
  const handleActivityChange = (e) => {
    const { name, value } = e.target;
    setActivity((prevActs) => ({
      ...prevActs,
      [name]: value,
    }));
  };

  const filterList = (data) => {
    //to filter out empty input fields from an object before sending them to the server
    return Object.entries(data).reduce((result, [key, value]) => {
      if (value !== "") {
        result.push(value);
      }
      return result;
    }, []);
  };

  const formik = useFormik({
    initialValues: {
      startDate: undefined,
      endDate: undefined,
      source: "",
      destination: "",
      ...ageValues,
    },
    validationSchema: generateValidationSchema(numOfPass),
    onSubmit: async (values) => {
      const formBody = {
        trip_start_date: values.startDate,
        trip_end_date: values.endDate,
        number_of_passenger: numOfPass,
        source: values.source,
        destination: values.destination,
        age: Object.values(ageValues), //returns array of age values
        flight: filterList(flights), //returns array of flights
        accommodation: filterList(hotel), //returns array of hotels
        activities: filterList(activity), //returns array of activities
      };
      if (offerID || selectedOfferId) {
        formBody.offerid = offerID ? offerID : selectedOfferId;
      }
      const formBodyJSON = JSON.stringify(formBody);
      const response = await sendData(Request_Trip, formBodyJSON);
      if (response === SUCCESS) {
        toast.success("Your trip was successfully submitted");
        router.push("/triplist");
      } else if (response === "DEACTIVE") {
        return;
      } else {
        toast.error("Failed to submit your trip request");
      }
    },
  });

  const renderAgeInputs = () => {
    const inputs = [];
    for (let i = 1; i <= parseInt(numOfPass); i++) {
      const fieldName = `age${i}`;
      const validity = () => {
        if (
          !formik.isValid &&
          formik.submitCount > 0 &&
          !formik.values[`age${i}`]
        ) {
          return true;
        } else {
          return false;
        }
      };

      inputs.push(
        <div key={i} className="form-group col-fx-6">
          <label>Age of Passenger no. {i}</label>
          <div className="input-icon1">
            <input
              type="number"
              name={fieldName}
              id={fieldName}
              placeholder="Passenger Age"
              className={
                validity() ||
                (formik.touched[fieldName] && formik.errors[fieldName])
                  ? "form-control is-invalid"
                  : "form-control"
              }
              onBlur={formik.handleBlur}
              onChange={(e) => {
                formik.handleChange(e);
                handleAgeChange(fieldName, e.target.value);
              }}
              value={formik.values[fieldName]}
            />
            {(formik.touched[fieldName] && formik.errors[fieldName]) ||
            validity() ? (
              <div className="error-text">{formik.errors[fieldName]}</div>
            ) : null}
          </div>
        </div>
      );
    }
    return inputs;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectTouched(true);
    formik.handleSubmit(event);
    if (!numOfPass || numOfPass === "") {
      setSelectError("Please select number of passengers");
    } else {
      setSelectTouched(false);
      setSelectError("");
    }
  };

  useEffect(() => {
    // Initialize Autocomplete for source and destination
    if (window.google && window.google.maps) {
      const sourceInput = document.getElementById("source");
      const destinationInput = document.getElementById("destination");

      const sourceAutocomplete = new window.google.maps.places.Autocomplete(
        sourceInput
      );
      const destinationAutocomplete =
        new window.google.maps.places.Autocomplete(destinationInput);

      sourceAutocomplete.addListener("place_changed", () => {
        const selectedPlace = sourceAutocomplete.getPlace();
        formik.setFieldValue("source", selectedPlace.formatted_address);
      });

      destinationAutocomplete.addListener("place_changed", () => {
        const selectedPlace = destinationAutocomplete.getPlace();
        formik.setFieldValue("destination", selectedPlace.formatted_address);
      });
    }
  }, [formik]);

  return (
    <div className="trip-list-page">
      <InnerBanner content={bnrCtnt} />
      {/* Trip List */}
      <section className="trip-list-sec sec-padding">
        <form>
          <div className="container">
            <div className="row">
              <div className="col-xl-6">
                <div className="triprequest-img">
                  <img
                    src={"/images/innerPages/rquestpage.png"}
                    className="img-fluid"
                    alt="img"
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="mb-4">
                  <div className="form-heading">Book your tour</div>
                  <div className="fx-row">
                    <div className="form-group col-fx-6">
                      <label>Start Date</label>
                      <div className="input-icon1">
                        <input
                          type="date"
                          className={`form-control ${
                            formik.touched.startDate && formik.errors.startDate
                              ? "is-invalid"
                              : ""
                          }`}
                          name="startDate"
                          onBlur={formik.handleBlur}
                          min={minDate(today)}
                          onChange={(e) => {
                            formik.setFieldValue("startDate", e.target.value);
                          }}
                          value={formik.values.startDate}
                        />
                        {formik.touched.startDate &&
                          formik.errors.startDate && (
                            <div className="error-text">
                              {formik.errors.startDate}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="form-group col-fx-6">
                      <label>End Date</label>
                      <div className="input-icon1">
                        <input
                          type="date"
                          className={`form-control ${
                            formik.touched.endDate && formik.errors.endDate
                              ? "is-invalid"
                              : ""
                          }`}
                          name="endDate"
                          min={minDate(today)}
                          onBlur={formik.handleBlur}
                          onChange={(e) => {
                            formik.setFieldValue("endDate", e.target.value);
                          }}
                          value={formik.values.endDate}
                        />
                        {formik.touched.endDate && formik.errors.endDate && (
                          <div className="error-text">
                            {formik.errors.endDate}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group col-fx-6">
                      <label>Number of Passengers</label>
                      <SelectBox
                        place={"Select Number of Passengers"}
                        setPass={setNumOfPass}
                        setAgeValues={setAgeValues}
                        pass={numOfPass}
                        isTouched={setSelectTouched}
                        isError={setSelectError}
                        touchStatus={selectTouched}
                        errorStatus={selectError}
                      />
                      {selectTouched && selectError && (
                        <div className="error-text">{selectError}</div>
                      )}
                    </div>
                    {renderAgeInputs()}
                    <div className="form-group col-fx-6">
                      <label>Source</label>
                      <div className="input-icon1">
                        <input
                          type="text"
                          placeholder="Source"
                          id="source"
                          name="source"
                          className={`form-control ${
                            formik.touched.source && formik.errors.source
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("source")}
                        />
                        {formik.touched.source && formik.errors.source ? (
                          <div className="error-text">
                            {formik.errors.source}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-group col-fx-6">
                      <label>Destination</label>
                      <div className="input-icon1">
                        <input
                          type="text"
                          id="destination"
                          name="destination"
                          placeholder="Destination"
                          className={`form-control ${
                            formik.touched.destination &&
                            formik.errors.destination
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("destination")}
                        />
                        {formik.touched.destination &&
                        formik.errors.destination ? (
                          <div className="error-text">
                            {formik.errors.destination}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="form-heading">Preferences</div>
                  <div className="form-group col-fx-12">
                    <label className="label">Flight</label>
                  </div>
                  <div className="fx-row">
                    <div className="form-group col-fx-4">
                      <div className="input-icon1">
                        <input
                          type="text"
                          name="flight1"
                          placeholder="Flight"
                          className="form-control"
                          value={flights.flight1}
                          onChange={handleFlightChange}
                        />
                      </div>
                    </div>
                    <div className="form-group col-fx-4">
                      <div className="input-icon1">
                        <input
                          type="text"
                          name="flight2"
                          placeholder="Flight"
                          value={flights.flight2}
                          onChange={handleFlightChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-group col-fx-4">
                      <div className="input-icon1">
                        <input
                          type="text"
                          name="flight3"
                          placeholder="Flight"
                          value={flights.flight3}
                          onChange={handleFlightChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-fx-12">
                    <label className="label">Accommodation</label>
                  </div>
                  <div className="fx-row">
                    <div className="form-group col-fx-4">
                      <div className="input-icon1">
                        <input
                          type="text"
                          placeholder="Accommodation"
                          className="form-control"
                          name="hotel1"
                          value={hotel.hotel1}
                          onChange={handleHotelChange}
                        />
                      </div>
                    </div>
                    <div className="form-group col-fx-4">
                      <div className="input-icon1">
                        <input
                          type="text"
                          placeholder="Accommodation"
                          className="form-control"
                          name="hotel2"
                          value={hotel.hotel2}
                          onChange={handleHotelChange}
                        />
                      </div>
                    </div>
                    <div className="form-group col-fx-4">
                      <div className="input-icon1">
                        <input
                          type="text"
                          placeholder="Accommodation"
                          className="form-control"
                          name="hotel3"
                          value={hotel.hotel3}
                          onChange={handleHotelChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-fx-12">
                    <label className="label">Activities</label>
                  </div>
                  <div className="fx-row">
                    <div className="form-group col-fx-4">
                      <div className="input-icon1">
                        <input
                          type="text"
                          placeholder="Activities"
                          className="form-control"
                          name="activity1"
                          value={activity.activity1}
                          onChange={handleActivityChange}
                        />
                      </div>
                    </div>
                    <div className="form-group col-fx-4">
                      <div className="input-icon1">
                        <input
                          type="text"
                          placeholder="Activities"
                          className="form-control"
                          name="activity2"
                          value={activity.activity2}
                          onChange={handleActivityChange}
                        />
                      </div>
                    </div>
                    <div className="form-group col-fx-4">
                      <div className="input-icon1">
                        <input
                          type="text"
                          placeholder="Activities"
                          className="form-control"
                          name="activity3"
                          value={activity.activity3}
                          onChange={handleActivityChange}
                        />
                      </div>
                    </div>
                  </div>
                  {selectedOfferId && !offerID && individualOffer && (
                    <>
                      <div className="cpn-select mt-4">
                        <div className="d-flex gap-2 align-items-center">
                          <img src={"/images/coupon.png"} alt="img" />
                          <h5>{`YONE${percent}`}</h5>
                        </div>
                      </div>
                    </>
                  )}
                  {offerID && (
                    <>
                      <div className="cpn-select mt-4">
                        <div className="d-flex gap-2 align-items-center">
                          <img src={"/images/coupon.png"} alt="img" />
                          <h5>{offerName}</h5>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {individualOffer
                  ? null
                  : !bookClick && (
                      <div className="mb-4">
                        <div className="form-heading">
                          <Button
                            className="btn-coupon btn"
                            type="button"
                            onClick={() => setBookClick(true)}
                          >
                            Add Coupon
                          </Button>
                        </div>
                      </div>
                    )}
              </div>
            </div>
          </div>
          <div className="container mt-4">
            {(individualOffer || bookClick) && (
              <div className="fx-row-copoun offers-list mt-3 mb-4">
                <Carousel
                  cols={3}
                  rows={1}
                  gap={10}
                  loop={true}
                  scrollSnap={true}
                  autoplay={false}
                  infinite={true}
                  responsiveLayout={[
                    {
                      breakpoint: 481,
                      cols: 1,
                      rows: 1,
                      gap: 0,
                      loop: true,
                      autoplay: 1000,
                    },
                  ]}
                >
                  {offers.length > 0 ? (
                    offers.map((item) => (
                      <Carousel.Item>
                        <div className="col-fx-4 cpn-cards" key={item._id}>
                          <ApplyOffer
                            item={item}
                            setOfferID={setOfferID}
                            offerName={setOfferName}
                          />
                        </div>
                      </Carousel.Item>
                    ))
                  ) : (
                    <div className="col-fx-4 cpn-cards">
                      <Skeleton height="200px" />
                    </div>
                  )}
                </Carousel>
              </div>
            )}

            <div className="d-flex justify-content-sm-end justify-content-center">
              <button
                className="btn btn-design "
                type="submit"
                onClick={handleFormSubmit}
              >
                Book Now
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
