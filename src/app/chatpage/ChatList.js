'use client'
import React, { useEffect } from "react";
import { IMAGE_BASE } from "../services/Url";
// const ImageBase = process.env.REACT_APP_IMAGE_BASE;
const ImageBase = IMAGE_BASE;

function getMessageTimestamp(messageCreatedAt) {
  const messageDate = new Date(messageCreatedAt);
  const currentDate = new Date();

  // time difference in milliseconds
  const timeDifference = currentDate - messageDate;

  // number of milliseconds in a day
  const millisecondsInDay = 24 * 60 * 60 * 1000;

  if (timeDifference < millisecondsInDay) {
    // If the message was created today, show the creation time
    const hours = messageDate.getHours().toString().padStart(2, "0");
    const minutes = messageDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else if (timeDifference < 2 * millisecondsInDay) {
    // If the message was created yesterday, show "Yesterday"
    return "Yesterday";
  } else {
    // If more than a day has passed, show the date
    const day = messageDate.getDate().toString().padStart(2, "0");
    const month = (messageDate.getMonth() + 1).toString().padStart(2, "0");
    const year = messageDate.getFullYear();
    return `${day}-${month}-${year}`;
  }
}

const ChatList = ({ item, activeTrip, activeTripHandler, setIsExpired, prevMsg, setPrevMsg }) => {

  const chatHandler = (id, type, chatItem) => {
    if (prevMsg) {
      localStorage.setItem(activeTrip, prevMsg);
    }
    activeTripHandler({
      chatId: id,
      type: type,
    });
    localStorage.setItem("activetripid", id);
    localStorage.setItem("type", type);
    tripExpiryHandler(chatItem);
    setPrevMsg("");
  };

  useEffect(() => {
    if (item) {
      tripExpiryHandler(item[0]);
    }
  }, []);

  function tripExpiryHandler(item) {
    if (item?.isTripEnded === true) {
      setIsExpired(true);
    } else {
      setIsExpired(false);
    }
  }

  return (
    <ul className="chat-usr-list">
      {item?.length > 0 ? (
        item?.map((item) => {
          return (
            <li
              key={item?._id}
              className={
                activeTrip === item._id
                  ? "chat-usr-list-item active"
                  : "chat-usr-list-item"
              }
              onClick={() => {
                chatHandler(item?._id, item?.staticField);
                tripExpiryHandler(item);
              }}
            >
              <span className="chat-usr-img">
                <img
                  src={
                    item?.staticField === "holiday" && item.cover_image
                      ? ImageBase + "coverimage/" + item.cover_image
                      : '/images/innerPages/chatUser.png'
                  }
                  alt="img"
                />
              </span>
              <div className="chat-usr-ctnt">
                {item.source && (
                  <span className="usr-name ellipsis-text source">
                    {item.source}
                  </span>
                )}

                {item.staticField === "holiday" && (
                  <span className="usr-name ellipsis-text holiday">
                    {item.title}
                  </span>
                )}

                {item?.destination && (
                  <span className="usr-name ellipsis-text destination">
                    {item?.destination}
                  </span>
                )}
                <span
                  className={`last-msg ellipsis-text ${item?.chats?.isMessageSeen === false &&
                    item?.chats?.senderRole !== "user"
                    ? "unread"
                    : ""
                    } ${item.staticField === "holiday"
                      ? "holiday"
                      : ""
                    }`}
                >
                  {item?.chats?.senderRole === "user"
                    ? "You: "
                    : item?.chats?.senderRole === "admin"
                      ? "Admin :"
                      : ""}{" "}
                  {(item?.chats?.type === "application/msword" ||
                    item?.chats?.type === "application/pdf") &&
                    "File"}
                  {(item?.chats?.type === "image/png" ||
                    item?.chats?.type === "image/jpeg") &&
                    "Image"}
                  {item?.chats?.type === "text" && item?.chats?.message}
                </span>
              </div>
              <span className="time">
                {item?.chats?.createdAt
                  ? getMessageTimestamp(item?.chats?.createdAt)
                  : ""}
              </span>
            </li>
          );
        })
      ) : item ? (
        <p className="text-center">Create a trip or holiday package to initiate a conversation with our experts!</p>
      ) : (
        <p className="text-danger text-center">Failed to load trip list</p>
      )}
    </ul>
  );
};

export default ChatList;
