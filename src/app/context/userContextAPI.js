'use client'
import { useState, createContext } from "react";

const UserContext = createContext({
  isLogin: false,
  loginHandler: () => { },
  logoutHandler: () => { },
  isFeedback: false,
  feedbackHandler: () => { },
  isPaySuccess: false,
  paySuccessHandler: () => { },
  tripTicketDetails: {},
  tripDetailsHandler: () => { },
  ticket: null,
  ticketHandler: () => { },
  editDetailType: null,
  editDetailTypeHandler: () => { },
  profileUpdated: false,
  profileUpdatedHandler: () => { },
  holidayChat: null,
  holidayChatHandler: () => { },
});

export const UserContextProvider = (props) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const [feedback, setFeedBack] = useState(false);
  const [payment, setPayment] = useState(false);
  const [tripDetails, setTripDetails] = useState({});
  const [ticket, setTicket] = useState(null);
  const [editDetailType, setEditDetailType] = useState(null);
  const [profileUpdated, setProfileUpdate] = useState(false);
  const [holidayChat, setHolidayChat] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (token) {
      return true;
    } else {
      return false;
    }
  });

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  const feedbackHandler = () => {
    setFeedBack((prev) => !prev);
  };

  const paySuccessHandler = () => {
    setPayment((prev) => !prev);
  }

  const tripHandler = (tripId, payableAmount) => {
    setTripDetails({
      tripId,
      payableAmount,
    });
  }

  const ticketHandler = (fileName) => {
    setTicket(fileName);
  }

  const editDetailTypeHandler = (type) => {
    setEditDetailType(type);
  }

  const profileUpdatedHandler = () => {
    setProfileUpdate((prev) => !prev);
  }

  const holidayChatHandler = (id) => {
    setHolidayChat(id);
  }


  return (
    <UserContext.Provider
      value={{
        isLogin: isLoggedIn,
        loginHandler,
        logoutHandler,
        isFeedback: feedback,
        feedbackHandler,
        isPaySuccess: payment,
        paySuccessHandler,
        tripTicketDetails: tripDetails,
        tripDetailsHandler: tripHandler,
        ticket,
        ticketHandler,
        editDetailType,
        editDetailTypeHandler,
        profileUpdated,
        profileUpdatedHandler,
        holidayChat,
        holidayChatHandler
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
