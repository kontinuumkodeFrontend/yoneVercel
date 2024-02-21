import React, { useContext, useState } from "react";
import Timer from "../Timer";
import { MuiOtpInput } from "mui-one-time-password-input";
import { modalVisible, popupVisible } from "../../redux/actions/commonAction";
import { useDispatch } from "react-redux";
import { EMAIL, POPUP_TYPE } from "../../services/Constants";
import { emailVerify } from "../../services/Service";
import { Email_Verify, Verify_Edit_Email } from "../../services/Url";
import { toast } from "react-toastify";
import { usePathname, useRouter } from 'next/navigation';
import UserContext from "@/app/context/userContextAPI";

export const VerificationMail = () => {
  const [otp, setOtp] = useState("");
  const email = localStorage.getItem("user_email");
  const [isOtpComplete, setOtpComplete] = useState(false);
  const [otpExpires, setOtpExpires] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const ctx = useContext(UserContext)
  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const verifyHandler = async (e) => {
    e.preventDefault();
    toast.dismiss();
    const body = JSON.stringify({
      email: email,
    });
    let url;
    if (pathname === '/setting') {
      url = Verify_Edit_Email
    } else {
      url = Email_Verify
    }
    if (isOtpComplete) {
      const response = await emailVerify(url, otp, body);
      if (response) {
        toast.success(response);
        if (pathname === '/setting') {
          toast.success("Email updated successfully!");
          dispatch(modalVisible?.modalClose());
          localStorage.removeItem("user_email");
          localStorage.removeItem('user_phone');
          localStorage.removeItem('country_code');
          ctx.profileUpdatedHandler();
        }
        else {
          dispatch(popupVisible?.popupOpen(POPUP_TYPE?.EMAIL));
          dispatch(modalVisible?.modalClose());
          localStorage?.clear();
        }
      }else{
        setOtp('')
      }
    }
    else if (!isOtpComplete) {
      toast.info('Please Enter the Verification Code!');
    }
    else {
      return;
    }
  };

  const handleComplete = () => {
    setOtpComplete(true);
  };

  const validateChar = (value) => {
    return !isNaN(Number(value));
  };

  return (
    <div className="mdl-wpr">
      <div
        className="modalClose MuiBox-root css-0"
        onClick={() => { dispatch(modalVisible?.modalClose()); if(pathname!==('/setting')) {localStorage?.clear();} }}
      >
        <svg
          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="CloseIcon"
        >
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </div>
      <div className="auth-mdl-wpr verification-pwd">
        <div className="auth-lft-ctnt">
          <img src={'/images/loginImg.jpg'} alt="img" />
        </div>
        <div className="auth-rgt-ctnt justify-content-center">
          <h4 className="mb-4">Email Verification</h4>
          <p className="mb-md-5 mb-3">
            Please enter the verification code we have send to your email: {email}
          </p>
          <form className="authForm w-100">
            <MuiOtpInput
              length={6}
              value={otp}
              onChange={handleChange}
              autoFocus
              validateChar={validateChar}
              onComplete={handleComplete}
            />
            <div className="auth-btn">
              <button
                type="submit"
                className={
                  otpExpires
                    ? "btn-design w-100 btn-disabled"
                    : "btn-design w-100"
                }
                onClick={verifyHandler}
                disabled={otpExpires ? true : false}
              >
                Verify
              </button>
            </div>
          </form>
          <Timer otpExpiry={setOtpExpires} type={EMAIL} otpHandler={handleChange} />
        </div>
      </div>
    </div>
  );
};
