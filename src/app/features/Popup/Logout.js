'use client'
import React, {useContext} from "react";
import { useDispatch } from "react-redux";
import { popupVisible } from "../../redux/actions/commonAction";
import UserContext from "@/app/context/userContextAPI";
import { useRouter } from 'next/navigation';

export const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const ctx = useContext(UserContext);
  
  const navigate = (path) => {
        router.push(path);
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    ctx.logoutHandler();
    navigate("/");
    dispatch(popupVisible?.popupClose());
  };

  return (
    <div className="popup-ctnr-outer logout-popup">
      <div className="popup-ctnr">
        <div
          className="modalClose MuiBox-root css-0"
          onClick={() => dispatch(popupVisible?.popupClose())}
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

        <div className="popup-ctnt">
          <h4>
            Are you sure <br />
            you want to logout?
          </h4>
          <div className="btn-wpr">
            <button onClick={logoutHandler} className="btn-design">
              Logout
            </button>
            <button onClick={() => dispatch(popupVisible?.popupClose())} className="btn-design btn2">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
