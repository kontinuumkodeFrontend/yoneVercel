'use client'
import React, { useEffect, useState } from "react";
import { post } from "../services/Service";
import { Save_Itinerary } from "../services/Url";
import { SUCCESS } from "../services/Constants";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

export default function ItineraryDetails({props}){
  const router = useRouter();
  const [data, setData] = useState();
  const [tripData, setTripData] = useState();
  const [queryText, setqueryText] = useState();
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    // Retrieve encrypted data from the cookie
    const encryptedData = Cookies.get('encryptedData');

    if (encryptedData) {
      // Decrypt the data using the same key used for encryption
      const bytes = CryptoJS.AES.decrypt(encryptedData, 'encryption_key');
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      let localData = localStorage.getItem('encryptLocal')
      console.log(decryptedData, "decryptedData");
      setTripData(decryptedData?.tripData);
      setData(localData);
    }
  }, []);

  useEffect(() => {
    // Define a function to fetch photos based on the user's input
    const fetchPhotos = () => {
      if (tripData?.destination && window.google && window.google.maps) {
        const placesService = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );

        const request = {
          query: tripData?.destination,
          fields: ["photos"],
        };

        placesService.findPlaceFromQuery(request, (results, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            results.length > 0
          ) {
            const place = results[0];
            const photos = place.photos;
            if (photos && photos.length > 0) {
              // Set the URL of the first photo (small version)
              const photoReference = photos[0].getUrl({
                maxWidth: 700,
                maxHeight: 700,
              });
              setPhotoUrl(photoReference);
            } else {
              setPhotoUrl("");
            }
          } else {
            console.error("Error fetching place photos:", status);
            setPhotoUrl("");
          }
        });
      }
    };

    // Call the function to fetch photos when placeQuery changes
    fetchPhotos();
  }, [tripData?.destination]);

  const handleTripPlanner = () => {
    let body;
    toast.dismiss();
    if (queryText) {
      body = {
        destination: tripData?.destination,
        days: tripData?.days,
        budget: tripData?.budget,
        destinationDetail: data?.contentText,
        accommodation: tripData?.accommodation,
        query: queryText,
        text: data.generatedText,
      };
    } else {
      body = {
        destination: tripData?.destination,
        days: tripData?.days,
        budget: tripData?.budget,
        destinationDetail: data?.contentText,
        accommodation: tripData?.accommodation,
        text: data.generatedText,
      };
    }
    post(Save_Itinerary, JSON.stringify(body), null).then((res) => {
      if (res === SUCCESS) {
        toast.success(
          "Your trip has been successfully submitted to our expert. They will get in touch with you shortly."
        );
        router.push("/triprequest");
      }
    });
  };

  return (
    <div className="show-trip-page">
      <section className="itinerary-data sec-padding">
        <div className="container">

          <div className="row">
            <div className="col-md-6 pe-md-5">
              <div className="trip-form mb-5">
                <h2 className="text-start">
                  {tripData?.days} Days Trip to {tripData?.destination}
                </h2>
                <h4>Budget: ${tripData?.budget}</h4>
                <h4>
                  Accommodation Prefrence: {tripData?.accommodation} ⭐ Hotel
                </h4>
              </div>
              <div>
                <div className="google-photo">
                  {photoUrl && <img src={photoUrl} alt="Place" />}
                </div>
                <p className="mt-4">{data?.contentText}</p>
              </div>
            </div>
            <div className="col-md-6 ps-md-5">
              <div
                dangerouslySetInnerHTML={{ __html: data?.generatedText }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <textarea
              className="custom-textarea"
              rows="4"
              cols="50"
              placeholder="Share your thoughts or questions with us. We're here to listen!"
              value={queryText}
              onChange={(e) => setqueryText(e.target.value)}
            ></textarea>
            <button onClick={handleTripPlanner}>
              Get in Touch with Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

