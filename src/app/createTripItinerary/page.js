'use client'
import React, { useRef, useState, useEffect } from "react";
import ItineraryForm from "./ItineraryForm";
import { post } from "../services/Service";
import { Create_Itinerary } from "../services/Url";
import { SUCCESS } from "../services/Constants";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

export default function CreateItinerary(){
  const [isLoading, setLoading] = useState(false);
  const [itineraryData, setItineraryData] = useState();
  const router = useRouter();

  const bodyRef = useRef({});

  const handleFormSubmit = (values) => {
    toast.dismiss();
    bodyRef.current = {
      destination: values.destination,
      budget: values.budget,
      days: values.totalDays,
      accommodation: values.accommodation,
    };
   
    setLoading(true);
    post(
      Create_Itinerary,
      JSON.stringify(bodyRef.current),
      setItineraryData
    ).then((res) => {
      if (res === "deactivate") {
        setLoading(false);       
      }
      else if (res !== SUCCESS) {
        setLoading(false)
        toast.error("Something went wrong. Please try again");
      }
    });
  };

  useEffect(() => {
   
    if (itineraryData) {
      let a = JSON.stringify(itineraryData)
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify({data:a,tripData: bodyRef.current}), 'encryption_key').toString();
      Cookies.set('encryptedData', encrypted);
      localStorage.setItem('encryptLocal', a)
      setTimeout(() => {
        setLoading(false);
        router.push("/tripItinerary");
      }, 1000);
    }
  }, [itineraryData]);


  return (
    <div className="show-trip-page itiner-page">
      <video autoPlay muted loop id="video-bg">
        <source src={'/images/trip-video.mp4'} type="video/mp4" />
      </video>
      <section className="content">
        <div className="container">
          <ItineraryForm formSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
      </section>
    </div>
  );
};
