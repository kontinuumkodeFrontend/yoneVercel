'use client'
import React, { useEffect, useState, useContext } from "react";
import { IMAGE_BASE, Prev_Chats } from "../services/Url";
import { post } from "../services/Service";
import Moment from "react-moment";
import UserContext from "../context/userContextAPI";
import { useDispatch } from "react-redux";
import { popupVisible } from "../redux/actions/commonAction";
import { POPUP_TYPE } from "../services/Constants";
import Alert from "@mui/material/Alert";

// const ImageBase = process.env.REACT_APP_IMAGE_BASE;
const ImageBase = IMAGE_BASE;

export const ExpiredTrip = () => {
  return (
    <div className="exp-trip">
      <Alert severity="success">This trip is expired</Alert>
    </div>
  );
};

export const ReceivedMessage = () => {
  return (
    <div className="recieve-msg">
      <ul className="msg-list">
        <li>Hello! We're excited to help you plan your next adventure.</li>
        <li>
          Our team of travel experts is here to assist you in creating unforgettable experiences.
          If you have any questions, need recommendations, or want to discuss your travel plans, please don't hesitate to reach out.

        </li>
        <li>We're just a message away and ready to make your travel dreams come true!</li>
      </ul>
    </div>
  );
};
export const SentMessages = () => {
  return (
    <div className="send-msg">
      <ul className="msg-list">
        <li>Hey, How can i help you?</li>
        <li>
          I was asking for your New Year Plans, ask we are going to host a
          party.
        </li>
        <li className="p-5">
          <img src={'/images/innerPages/msg-img.png'} alt="img" />
        </li>
      </ul>
    </div>
  );
};

function isTimeGap2(time1, time2) {
  const date1 = new Date(time1);
  const date2 = new Date(time2);

  // Calculate the time difference in milliseconds
  const timeDifference = Math.abs(date1 - date2);

  // Convert the time difference to minutes
  const minutesDifference = timeDifference / (1000 * 60);

  return minutesDifference > 2;
}

const MessageBox = ({ activeChat, messages, setprevChatLoaded }) => {
  const [prevChats, setPrevChats] = useState([]);
  const ctx = useContext(UserContext);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    let body;
    if (activeChat.type === "trip") {
      body = JSON.stringify({
        trip_id: activeChat?.chatId,
        type: activeChat?.type,
      });
    } else {
      body = JSON.stringify({
        holiday_id: activeChat?.chatId,
        type: activeChat?.type,
      });
    }
    if (activeChat.chatId && token) {
      post(Prev_Chats, body, setPrevChats);
    } else {
      setPrevChats(null);
    }
  }, [activeChat, messages]);


  useEffect(() => {
    setprevChatLoaded((prev) => !prev);
  }, [prevChats]);

  return (
    <>
      {prevChats?.length > 0 &&
        prevChats?.map((item, i) => {
          const isDifferentSender =
            item.senderRole !== prevChats[i - 1]?.senderRole;
          const isGapMoreThan2 = isTimeGap2(
            item?.createdAt,
            prevChats[i - 1]?.createdAt
          );

          const currentMessageDate = new Date(item.createdAt);
          const previousMessageDate = prevChats[i - 1]?.createdAt
            ? new Date(prevChats[i - 1]?.createdAt)
            : null;

          // Check if the current message's date is different from the previous one
          const isDiffDay =
            !previousMessageDate ||
            currentMessageDate.toDateString() !==
            previousMessageDate.toDateString();

          // Determine the text to display for the date
          let dateText;
          if (isDiffDay) {
            const today = new Date();
            if (
              currentMessageDate.getDate() === today.getDate() &&
              currentMessageDate.getMonth() === today.getMonth() &&
              currentMessageDate.getFullYear() === today.getFullYear()
            ) {
              dateText = "Today";
            } else if (
              currentMessageDate.getDate() === today.getDate() - 1 &&
              currentMessageDate.getMonth() === today.getMonth() &&
              currentMessageDate.getFullYear() === today.getFullYear()
            ) {
              dateText = "Yesterday";
            } else {
              dateText = currentMessageDate.toDateString();
            }
          }

          const handleImageClick = (img) => {
            ctx.ticketHandler(img);
            dispatch(popupVisible?.popupOpen(POPUP_TYPE?.TICKET));
          };

          return (
            <>
              {isDiffDay && (
                <div className="chat-date">
                  <p>{dateText}</p>
                </div>
              )}
              <div
                key={item._id}
                className={
                  item.senderRole === "admin" ? "recieve-msg" : "send-msg"
                }
              >
                <ul
                  className={
                    item.senderRole === "admin"
                      ? "msg-list admin"
                      : "msg-list usr-msg"
                  }
                >
                  {isDifferentSender || isGapMoreThan2 ? (
                    <Moment format="h:mm a">{item?.createdAt}</Moment>
                  ) : (
                    ""
                  )}
                  {item.type === "text" && (
                    <li>
                      <h6>{item.message}</h6>
                    </li>
                  )}
                  {(item.type === "image/jpeg" ||
                    item.type === "image/png") && (
                      <li className="p-5">
                        <img
                          onClick={() =>
                            handleImageClick(
                              `${ImageBase}mediafiles/${item.message}`
                            )
                          }
                          src={
                            item.message &&
                            `${ImageBase}mediafiles/${item.message}`
                          }
                          alt="img"
                        />
                      </li>
                    )}
                  {item.type === "application/pdf" && (
                    <li className="p-5">
                      <a
                        href={`${ImageBase}mediafiles/${item.message}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={'/images/pdf.png"'} alt="pdf" />
                      </a>
                    </li>
                  )}
                  {item.type === "application/msword" && (
                    <li className="p-5">
                      <a
                        href={`${ImageBase}mediafiles/${item.message}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={'/images/google-docs.png'} alt="pdf" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </>
          );
        })}
    </>
  );
};

export default MessageBox;
