import React, { useEffect, useState, useContext } from "react";
import Link from 'next/link';
import MenuDrawer from "./MenuDrawer";
import { MODAL_TYPE, POPUP_TYPE } from "../services/Constants";
import { useDispatch } from "react-redux";
import { modalVisible, popupVisible } from "../redux/actions/commonAction";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import UserContext from "../context/userContextAPI";
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const ctx = useContext(UserContext);
  const [elemHeight, SetElemHeight] = useState(150);
  const dispatch = useDispatch();
  const pathName = pathname;

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(popupVisible?.popupOpen(POPUP_TYPE?.LOGOUT));
  };

  let menuArr;

  if (ctx.isLogin) {
    menuArr = [
      {
        name: "Home",
        type: "link",
        url: "/",
        onclick: "",
      },
      {
        name: "Holiday Package",
        type: "link",
        url: "/holiday",
        onclick: "",
      },
      {
        name: "Car Rental",
        type: "link",
        url: "/car-rental",
        onclick: "",
      },
      {
        name: "Airfare",
        type: "link",
        url: "/flights",
        onclick: "",
      },
      {
        name: "One-Way Flights",
        type: "link",
        url: "/flights/one-way",
        onclick: "",
      },
      {
        name: "Round Trip Flights",
        type: "link",
        url: "/flights/round-trips",
        onclick: "",
      },
      {
        name: "Gallery",
        type: "link",
        url: "/gallery ",
        onclick: "",
      },
      {
        name: "About Us",
        type: "link",
        url: "/about ",
        onclick: "",
      },
      {
        name: "Contact Us",
        type: "link",
        url: "/contactus",
        onclick: "",
      },
    ];
  } else {
    menuArr = [
      {
        name: "Home",
        type: "link",
        url: "/",
        onclick: "",
      },
      {
        name: "Holiday Package",
        type: "link",
        url: "/holiday",
        onclick: "",
      },
      {
        name: "Car Rental",
        type: "link",
        url: "/car-rental",
        onclick: "",
      },
      {
        name: "Airfare",
        type: "link",
        url: "/flights",
        onclick: "",
      },
      {
        name: "One-Way Flights",
        type: "link",
        url: "/flights/one-way",
        onclick: "",
      },
      {
        name: "Round Trip Flights",
        type: "link",
        url: "/flights/round-trips",
        onclick: "",
      },
      {
        name: "Gallery",
        type: "link",
        url: "/gallery",
        onclick: "",
      },
      {
        name: "About Us",
        type: "link",
        url: "/about ",
        onclick: "",
      },
      {
        name: "Contact Us",
        type: "link",
        url: "/contactus",
        onclick: "",
      },
    ];
  }

  useEffect(() => {
    window.scroll(0, 0);
    let divElement = document?.querySelector(".main-hdr");
    SetElemHeight(divElement?.offsetHeight);
  }, [pathName, ctx.isLogin]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(modalVisible?.modalOpen(MODAL_TYPE?.LOGIN));
  };

  const signupHandler = (e) => {
    e.preventDefault();
    dispatch(modalVisible?.modalOpen(MODAL_TYPE?.SIGN_UP));
  };

  return (
    <header className="main-hdr" style={{ marginBottom: `-${elemHeight}px` }}>
      <div className="top-header">
        <div className="container">
          <div className="top-inr">
            {ctx.isLogin ? (
              ""
            ) : (
              <ul className="auth-btns">
                <li>
                  <Link href="#" onClick={(e) => loginHandler(e)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={(e) => signupHandler(e)}>
                    Sign up
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="bottom-header">
        <div className="container">
          <div className="bottom-wpr">
            <div className="lft-ctnt">
              <Link href="/">
                <img src={'/images/innerPages/whiteLogo.png'} alt="img" />
              </Link>
              <ul className="nav-list">
                <li>
                  <Link href="/" className={pathName === "/" ? 'active' :''}>Home</Link>
                </li>
                <li>
                  <Link href="/holiday" className={pathName === "/holiday" ? 'active' :''}>Holiday Packages</Link>
                </li>
                <li>
                  <Link href="/car-rental" className={pathName === "/car-rental" ? 'active' :''}>Car Rental</Link>
                </li>
                <DropdownButton
                  id="dropdown-basic-button flight-dropdown"
                  className={
                    pathname?.includes("/flights") ? "a_active" : ""
                  }
                  title="Flights"
                >
                  <Dropdown.Item href="/flights">All Airfare</Dropdown.Item>
                  <Dropdown.Item href="/flights/one-way">
                    One-Way Flights
                  </Dropdown.Item>
                  <Dropdown.Item href="/flights/round-trips">
                    Round Trip Flights
                  </Dropdown.Item>
                </DropdownButton>
                <li>
                  <Link href="/gallery" className={pathName === "/gallery" ? 'active' :''}>Gallery</Link>
                </li>
                <li>
                  <Link href="/about" className={pathName === "/about" ? 'active' :''}>About Us</Link>
                </li>
                <li>
                  <Link href="/contactus" className={pathName === "/contactus" ? 'active' :''}>Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="rgt-ctnt">
              <div className="btn-wpr">
                {ctx.isLogin ? (
                  <Link href="/triprequest" className="btn-design">
                    Book Now
                  </Link>
                ) : (
                  <button onClick={loginHandler} className="btn-design">
                    Book Now
                  </button>
                )}
                {ctx.isLogin && (
                  <button
                    className="btn-design ms-3 mt-2"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                )}
              </div>
              <MenuDrawer listItem={menuArr} anchor="left" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
