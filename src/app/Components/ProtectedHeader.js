'use client'
import React, {  useEffect, useState } from "react";
import { FOOTER_PROTECTED } from "../services/Constants";
import InnerHeader from "../Components/InnerHeader";
import Header from "./Header";
import { usePathname } from 'next/navigation';

export const ProtectedHeader = ({ children }) => {
  const [pagePath, setPagePath] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    switch (pathname) {
      case FOOTER_PROTECTED?.HOME:
        return setPagePath(true);
      case FOOTER_PROTECTED?.ABOUT:
        return setPagePath(true);
      case FOOTER_PROTECTED?.CONTACT:
        return setPagePath(true);
      case FOOTER_PROTECTED?.GALLERY:
        return setPagePath(true);
      case FOOTER_PROTECTED?.PRIVACY:
        return setPagePath(true);
      case FOOTER_PROTECTED?.TERM:
        return setPagePath(true);
      case FOOTER_PROTECTED?.HOLIDAY_PACKAGE:
        return setPagePath(true);
      case FOOTER_PROTECTED?.CAR_RENTAL:
        return setPagePath(true);
        case FOOTER_PROTECTED?.AIRFARE:
        return setPagePath(true);
        case FOOTER_PROTECTED?.ONEWAYFLIGHT:
        return setPagePath(true);
        case FOOTER_PROTECTED?.ROUNDTRIP:
        return setPagePath(true);
      default:
        return setPagePath(false);
    }
  }, [pathname]);

  return <>{pagePath ? <Header /> : <InnerHeader />}</>;
};
