'use client'
import React, { useEffect, useContext, useState } from "react";
import Link from 'next/link';
import { popupVisible } from "../redux/actions/commonAction";
import { POPUP_TYPE } from "../services/Constants";
import { useDispatch } from "react-redux";
import UserContext from "../context/userContextAPI";
import MenuDrawer from "./MenuDrawer";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function InnerHeader() {
  const [domLoaded, setDomLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname()
  const ctx = useContext(UserContext);
  const dispatch = useDispatch();
  const pathName = pathname;

  
  let elemHeight = 80;
  setTimeout(() => {
    if(typeof document !== "undefined"){
      let divElement = document?.querySelector(".main-hdr");
      elemHeight = divElement?.offsetHeight;
    }
  }, 2000);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  let menuArr = [
    {
      name: "Upcoming Bookings",
      type: "link",
      url: "/triplist",
      onclick: "",
    },
    {
      name: "History",
      type: "link",
      url: "/triphistory ",
      onclick: "",
    },
    {
      name: "Chat",
      type: "link",
      url: "/chatpage",
      onclick: "",
    },
    {
      name: "Settings",
      type: "button",
      url: "/setting",
      onclick: "",
    },
    {
      name: "Request your Trip",
      type: "button",
      url: "/triprequest",
      onclick: "",
    },
    {
      name: "AI Travel Organizer",
      type: "button",
      url: "/createTripItinerary",
      onclick: "",
    },
  ];

  const navigate = (path) => {
    router.push(path);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathName]);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(popupVisible?.popupOpen(POPUP_TYPE?.LOGOUT));
  };

  return (
    <header
      className={
        pathname.includes("/tripItinerary")
          ? "main-hdr bg-color inr-hdr"
          : "main-hdr inr-hdr"
      }
      style={{ marginBottom: `-${elemHeight}px` }}
    >
      <div className="bottom-header">
        <div className="container">
          <div className="bottom-wpr">
            <div className="lft-ctnt">
              <Link href="/">
                <img src={'/images/innerPages/whiteLogo.png'} alt="img" />
              </Link>
              {domLoaded && (ctx.isLogin && (
                <><ul className="nav-list">
                  <li>
                    <Link
                      href="/triplist"
                      className={
                        pathname.includes("tripstatus") || pathname === "/triplist"  ? "active" : ""
                      }
                    >
                      <span>
                        <img src={'/images/innerPages/menuIcon.png'} alt="img" />
                      </span>
                      Upcoming Bookings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/triphistory"
                      className={
                        pathname.includes("triphistorystatus") || pathname === "/triphistory"
                          ? "active"
                          : ""
                      }
                    >
                      <span>
                        <img src={'/images/innerPages/menuIcon2.png'} alt="img" />
                      </span>
                      History
                    </Link>
                  </li>
                  <li>
                    <Link href="/chatpage" className={pathName === "/chatpage" ? 'active' :''}>
                      <span>
                        <img src={'/images/innerPages/menuIcon3.png'} alt="img" />
                      </span>
                      Chat
                    </Link>
                  </li>
                  <li>
                    <Link href="/setting" className={pathName === "/setting" ? 'active' :''}>
                      <span>
                        <img src={'/images/innerPages/menuIcon4.png'} alt="img" />
                      </span>
                      Settings{" "}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/createTripItinerary")}
                      className="ai-btn"
                    >
                      <span>
                        <img src={'/images/shining.png'} alt="img" />
                      </span>
                      AI Travel Organizer
                    </button>
                  </li>
                </ul></>
              ))}
            </div>
            <div className="rgt-ctnt">
              {domLoaded && (ctx.isLogin && (
                <div className="btn-wpr">
                  <button
                    onClick={() => navigate("/createTripItinerary")}
                    className="ai-btn"
                  >
                    <span>
                      <img src={'/images/shining.png'} alt="img" />
                    </span>
                    AI Travel Organizer
                  </button>
                  <Link href="/triprequest" className="btn-design">
                    Request your Trip
                  </Link>
                  <button onClick={logoutHandler} className="btn-design-strok logout-btn">
                    <span>
                      <img src={'/images/innerPages/logout.png'} alt="img" />
                    </span>
                    Logout
                  </button>

                </div>
              ))}
              <MenuDrawer listItem={menuArr} anchor="left" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
