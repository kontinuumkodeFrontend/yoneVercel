import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { EMAIL, PHONE_NUM } from "../services/Constants";
import { sendData } from "../services/Service";
import { Resend_OTP, Resend_Otp_After_Edit } from "../services/Url";
import { useRouter, usePathname } from 'next/navigation';

function Timer({ otpExpiry, type, otpHandler }) {
  const router = useRouter();
  const pathname = usePathname();
  const initialTime = 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [timerActive, setTimerActive] = useState(true);

  const restartTimer = () => {
    setTimeLeft(initialTime);
    setTimerActive(true);
  };

  const resendOTP = () => {
    //logic to initiate OTP resend
    toast.dismiss();
    otpHandler("");

    let url;
    let body;
    if (type === PHONE_NUM) {
      body = JSON.stringify({
        otpSection: "phone",
        country_code: localStorage.getItem("country_code"),
        phone_number: localStorage.getItem("user_phone"),
      });
    } else if (type === EMAIL) {
      body = JSON.stringify({
        otpSection: "email",
        email: localStorage.getItem("user_email"),
      });
    } else {
      return;
    }

    if (pathname === "/setting") {
      url = Resend_Otp_After_Edit;
    } else {
      url = Resend_OTP;
    }
    const response = sendData(url, body);
    response
      .then((res) => {
        if (res) {
          restartTimer();
          otpExpiry(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    if (timerActive) {
      const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft((prevTime) => prevTime - 1);
        } else {
          clearInterval(timerInterval);
          otpHandler("");
          setTimerActive(false);
          otpExpiry(true);
        }
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [timerActive, timeLeft, otpExpiry]);

  return (
    <div className="otp-timer">
      <p className="text-center">
        Time remaining: <span>{timeLeft}</span> seconds{" "}
      </p>
      <div className="othr-links">
        <p className="haveAcc">
          Didn't received the code?
          <span>
            {" "}
            <button
              onClick={resendOTP}
              disabled={timerActive ? true : false}
              className={timerActive ? "btn-disabled" : ""}
            >
              Re-send
            </button>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Timer;
