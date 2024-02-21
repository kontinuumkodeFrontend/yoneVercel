'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { POPUP_TYPE } from '../../services/Constants';
import { Email } from './Email';
import { ErrorPopup } from './ErrorPopup';
import { Feedback } from './Feedback';
import { Logout } from './Logout';
import { Offer } from './Offer';
import { Payment } from './Payment';
import { FlightTicket } from './FlightTicket';
import { Message } from './Message';
import { PaySuccess } from './PaySuccess';
import { HolidayChat } from './HolidayChat';

export const PopupContainer = () => {

  const { isPopupOpen } = useSelector((state) => state.commonReducer);
  const { popupCategory } = useSelector((state) => state.commonReducer);

  const modalType = () => {
    switch (popupCategory) {
      case POPUP_TYPE?.EMAIL:
        return <Email />;
      case POPUP_TYPE?.ERROR_POPUP:
        return <ErrorPopup />;
      case POPUP_TYPE?.FEEDBACK:
        return <Feedback />;
      case POPUP_TYPE?.LOGOUT:
        return <Logout />;
      case POPUP_TYPE?.PAYMENT:
        return <Payment />;
      case POPUP_TYPE?.OFFER:
        return <Offer />;
      case POPUP_TYPE?.TICKET:
        return <FlightTicket />;
      case POPUP_TYPE?.MESSAGE:
        return <Message />;
      case POPUP_TYPE?.PAY_SUCCESS:
        return <PaySuccess />;
      case POPUP_TYPE?.HOLIDAY_CHAT:
        return <HolidayChat />;
      default:
        return null;
    }
  }

  return (
    <>
      {
        isPopupOpen ?
          <>{modalType()}</>
          :
          ''
      }
    </>
  )
}
