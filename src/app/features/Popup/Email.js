import React from "react";
import { useDispatch } from "react-redux";
import { popupVisible } from "../../redux/actions/commonAction";

export const Email = () => {
    const dispatch = useDispatch();
    return (
        <div className="popup-ctnr-outer">
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

                <div className="popup-img">
                    <img src={'/images/innerPages/email-popup.png'} alt="img" className="img-fluid" />
                </div>
                <div className="popup-ctnt">
                    <h4>Congratulations!</h4>
                    <p className="mb-5">
                        You've been successfully registered with us.
                        Start exploring and enjoy your experience!
                    </p>
                </div>
            </div>
        </div>
    );
};
