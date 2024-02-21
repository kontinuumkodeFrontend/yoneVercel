import React, { useState, useContext } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { modalVisible } from "../../redux/actions/commonAction";
import { useDispatch } from "react-redux";
import { Email_Phone_Edit, MODAL_TYPE, PHONE_NUM, Phone_Edit } from "../../services/Constants";
import { mobileVerify } from "../../services/Service";
import { Mobile_Verify, Verify_Edit_Phone, Verify_Edit_Phone_Email } from "../../services/Url";
import Timer from "../Timer";
import { toast } from "react-toastify";
import { useRouter, usePathname } from 'next/navigation';
import UserContext from "@/app/context/userContextAPI";

export const Verification = () => {
  const [otp, setOtp] = useState("");
  const [isOtpComplete, setOtpComplete] = useState(false);
  const phn_no = localStorage.getItem('user_phone');
  const country_code = localStorage.getItem('country_code');
  const [otpExpires, setOtpExpires] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  const ctx = useContext(UserContext);

  const verifyHandler = async (e) => {
    e.preventDefault();
    toast.dismiss();
    let body;
    let url;
    if (pathname === '/setting') {
      if (ctx.editDetailType === Phone_Edit) {
        url = Verify_Edit_Phone
        body = JSON.stringify({
          phone_number: phn_no,
          country_code: country_code
        });
      } else if (ctx.editDetailType === Email_Phone_Edit) {
        url = Verify_Edit_Phone_Email;
        body = JSON.stringify({
          email: localStorage.getItem('user_email'),
          phone_number: phn_no,
        });
      }
    } else {
      url = Mobile_Verify;
      body = JSON.stringify({
        phone_number: localStorage.getItem('user_phone')
      });
    }
    if (isOtpComplete) {
      //mobile verfication
      const response = await mobileVerify(url, otp, body);
      if (response) {
        if (pathname === '/setting') {
          toast.success("Phone Number updated successfully!");
          if (ctx.editDetailType === Phone_Edit) {
            localStorage.removeItem('user_phone');
            localStorage.removeItem('country_code');
            dispatch(modalVisible?.modalClose());
            ctx.profileUpdatedHandler();
          } else if (ctx.editDetailType === Email_Phone_Edit) {
            dispatch(modalVisible?.modalOpen(MODAL_TYPE?.VERIFICATION_OTP));
            ctx.profileUpdatedHandler();
          }
        }
        else {
          toast.success(response);
          dispatch(modalVisible?.modalOpen(MODAL_TYPE?.VERIFICATION_OTP));
        }
      } else {
        setOtp('');
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

  function extractLastThreeDigits(mobileNumber) {
    //regular expression to match the last three digits
    const lastThreeDigitsMatch = mobileNumber.match(/\d{3}$/);
    if (lastThreeDigitsMatch) {
      const lastThreeDigits = lastThreeDigitsMatch[0];
      return lastThreeDigits;
    } else {
      // If there are less than three digits, handle accordingly
      return 'N/A';
    }
  }

  const lastThreeDigits = extractLastThreeDigits(phn_no);

  return (
    <div className="mdl-wpr">
      <div
        className="modalClose MuiBox-root css-0"
        onClick={() => {
          if (pathname !== ('/setting')) { localStorage?.clear(); } else {
            ctx.profileUpdatedHandler();
          }
          dispatch(modalVisible?.modalClose());
        }}
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
          <h4 className="mb-4">Mobile Verification</h4>
          <p className="mb-md-5 mb-3">
            Please enter the verification code we have send to your mobile ** ** **
            *{lastThreeDigits}
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
                className={otpExpires ? 'btn-design w-100 btn-disabled' : 'btn-design w-100'}
                onClick={verifyHandler}
                disabled={otpExpires ? true : false}
              >
                Verify
              </button>
            </div>
          </form>
          <div className="timer mt-4 text-center">
            <Timer otpExpiry={setOtpExpires} type={PHONE_NUM} otpHandler={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};