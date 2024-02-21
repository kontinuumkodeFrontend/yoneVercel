'use client'
import React, { useEffect, useState, useRef } from "react";
import { InnerBanner } from "../Components/InnerBanner";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachmentIcon from "@mui/icons-material/Attachment";
import io from "socket.io-client";
import { Chat_List, SERVER_URL, Send_Chat_File } from "../services/Url";
import ChatList from "./ChatList";
import { post } from "../services/Service";
import { ExpiredTrip, ReceivedMessage } from "./MessageBox";
import MessageBox from "./MessageBox";
import { toast } from "react-toastify";

// const ServerURL = process.env.REACT_APP_SERVER_URL
const ServerURL = SERVER_URL

const bnrCtnt = {
  heading: "Chat",
  description:
    "If user has any query he/she can discuss the same with the admin.",
  image: '/images/innerPages/innerBanner.jpg',
};

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  let token, userId
  if(typeof localStorage !== 'undefined'){
    token = localStorage.getItem("token");
    userId = localStorage.getItem("user_id");
  }
  // const [activeTripChat, setActiveTripChat] = useState({
  //   chatId: localStorage.getItem("activetripid")
  //     ? localStorage.getItem("activetripid")
  //     : null,
  //   type: localStorage.getItem("type") ? localStorage.getItem("type") : null,
  // });
  const [activeTripChat, setActiveTripChat] = useState({
    chatId: typeof localStorage !== 'undefined' && localStorage.getItem("activetripid") !== null
      ? localStorage.getItem("activetripid")
      : null,
    type: typeof localStorage !== 'undefined' && localStorage.getItem("type") !== null
      ? localStorage.getItem("type")
      : null,
  });
  const [searchText, setSearchText] = useState("");
  const [prevChatLoaded, setprevChatLoaded] = useState(false);
  const chatReference = useRef(null);
 


  useEffect(() => {
    //to get trip list for chat
    const body = JSON.stringify({
      search_string: searchText,
    });
    if (token) {
      post(Chat_List, body, setData)
    }
  }, [messages, activeTripChat, prevChatLoaded]);

  useEffect(() => {
    //searching
    if (!/^[a-zA-Z0-9]/.test(searchText[0])) {
      //first character shouldn't be special character
      return;
    }
    const delay = 500;
    let timerId;
    let body = JSON.stringify({
      search_string: searchText,
    });
    const delayedSearch = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        // Make API call here
        if (token) {
          post(Chat_List, body, setData);
        }
      }, delay);
    };

    delayedSearch();
    return () => {
      clearTimeout(timerId);
    };
  }, [searchText]);

  useEffect(() => {
    // Check if activeTripChat is defined and chatId exists in data
    if (activeTripChat && data?.some(item => item._id === activeTripChat.chatId)) {
      return;
    }
    if (data && data[0]) {
      setActiveTripChat({
        chatId: data[0]._id,
        type: data[0].staticField,
      });
      localStorage.setItem("activetripid", data[0]._id);
      localStorage.setItem("type", data[0].staticField);
    }
  }, [data]);

  useEffect(() => {
    // Function to scroll to the bottom of the chat
    const scrollToBottom = () => {
      if (chatReference.current) {
        chatReference.current.scrollTop = chatReference.current.scrollHeight;
      }
    };
    const observer = new MutationObserver(scrollToBottom);

    if (chatReference.current) {
      observer.observe(chatReference.current, { childList: true });
    }
    return () => {
      observer.disconnect();
    };
  }, [messages, file, activeTripChat]);

  useEffect(() => {
    //setting up socket connection
    const socketInstance = io(ServerURL);
    socketInstance.on("connection", () => {
      // console.log(socketInstance.connected);
    });
    socketInstance.on("message", (msg) => {
      setMessages([...messages, msg]);
    });
    setSocket(socketInstance);
    // Clean up the socket connection when component unmounts
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [activeTripChat]);


  const sendMessage = () => {
    if (socket && message.trim()) {
      // Emit the message to the server
      let chatData;
      if (activeTripChat?.type === "trip") {
        chatData = {
          trip_id: activeTripChat?.chatId,
          message: message,
          sentby_id: userId,
          senderRole: "user",
          type: "text",
        };
      } else {
        chatData = {
          holiday_id: activeTripChat?.chatId,
          message: message,
          sentby_id: userId,
          senderRole: "user",
          type: "text"
        };
      }
      socket.emit("message", chatData);
      setMessage("");
      setFile(null);
    } else if (file) {
      const formData = new FormData();
      let chatData;
      formData.append("file", file);
      const url = ServerURL + Send_Chat_File;
      fetch(url, {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        body: formData,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          if (activeTripChat.type === "trip") {
            chatData = {
              trip_id: activeTripChat?.chatId,
              sentby_id: userId,
              senderRole: "user",
              message: data?.uploadedFile,
              type: file?.type,
            };
          } else {
            chatData = {
              holiday_id: activeTripChat?.chatId,
              sentby_id: userId,
              senderRole: "user",
              message: data?.uploadedFile,
              type: file?.type,
            };
          }
          socket.emit("start", chatData);
          setFile(null);
        })
        .catch((error) => {
          console.error("Failed to upload file:", error);
          setFile(null);
        });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const FileHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/msword",
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (
        allowedTypes.includes(selectedFile.type) &&
        selectedFile?.size <= maxSize
      ) {
        // File is valid, set it in state
        setFile(selectedFile);
      } else {
        // File is invalid, show an error
        toast.error(
          "File must be an image (jpg, png) or a document (pdf, docx) and not exceed 10MB in size."
        );
        setFile(null);
      }
    }
  };
  const undoFileHandler = () => {
    setFile(null);
  };

  useEffect(() => {
    undoFileHandler();
  }, [activeTripChat]);


  useEffect(() => {
    //to set prev message in input field if message was not sent
    const keysInLocalStorage = Object.keys(localStorage);
    // Check if chatIdToCompare is in localStorage keys
    const isChatIdInLocalStorage = keysInLocalStorage.includes(activeTripChat?.chatId);
    if (isChatIdInLocalStorage) {
      setMessage(localStorage.getItem(activeTripChat?.chatId));
      localStorage.removeItem(activeTripChat?.chatId);
    }

  }, [activeTripChat])

  return (
    <div className="chat-page">
      <InnerBanner content={bnrCtnt} />
      {/* Chat*/}
      <section className="chat-sec reverse sec-padding">
        <div className="container">
          <div className="chat-ctnt">
            <h4 className="sec-inr-heading mb-4">Connect With Us</h4>
            <div className="chat-bx-otr">
              <div className="chat-bx-user">
                <div className="sec-inr-heading">
                  <h4>Chat</h4>
                </div>
                <div className="chat-srch">
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                    disabled={data?.length === 0 ? true : false}
                  />
                  <SearchOutlinedIcon />
                </div>
                <ChatList
                  item={data ? data : null}
                  activeTrip={activeTripChat?.chatId}
                  activeTripHandler={setActiveTripChat}
                  setIsExpired={setIsExpired}
                  prevMsg={message}
                  setPrevMsg={setMessage}
                />
              </div>
              <div className="chat-bx">
                <div className="chat-hdr">
                  <div className="chat-img">
                    <img src={'/images/innerPages/chatlogo.png'} className="img-fluid" alt="img" />
                  </div>
                  <div className="chat-info">
                    <h5>Yone Travel & Tour</h5>
                    <h6>We are here to help</h6>
                  </div>
                </div>
                <div className="chat-msg-wpr" ref={chatReference}>
                  {data?.length > 0 && (
                    <>
                      <ReceivedMessage />
                      <MessageBox
                        activeChat={activeTripChat}
                        messages={messages}
                        setprevChatLoaded={setprevChatLoaded}
                      />
                    </>
                  )}
                  {isExpired && <ExpiredTrip />}
                </div>
                <div className="chat-ftr">
                  {file && (
                    <div
                      className={file ? "file-preview show" : "file-preview"}
                    >
                      {file?.type === "image/png" ||
                        file?.type === "image/jpeg" ||
                        file?.type === "image/jpg" ? (
                        <div className="img-preview">
                          <button onClick={undoFileHandler}>x</button>
                          <div>
                            <img alt="img" src={URL.createObjectURL(file)} />
                          </div>
                        </div>
                      ) : (
                        <div className="doc-preview">
                          <button onClick={undoFileHandler}>x</button>
                          <div>
                            <img alt="img" src={'/images/doc-file.png'} />
                            <p>{file.name}</p>
                            <p>{(file.size / 1024).toFixed(2)} KB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Type your Message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={(data?.length === 0 || isExpired) ? true : false}
                      style={(data?.length === 0 || isExpired) ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
                    />
                    <div className="d-flex gap-3 align-items-center">
                      <div className="send-files">
                        <input
                          type="file"
                          onChange={FileHandler}
                          accept="image/jpeg, image/png, application/pdf, application/msword"
                        />
                        <AttachmentIcon />
                      </div>
                      <span>
                        <button onClick={sendMessage}>
                          <img src={'/images/innerPages/sendIcon.png'} alt="img" />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
