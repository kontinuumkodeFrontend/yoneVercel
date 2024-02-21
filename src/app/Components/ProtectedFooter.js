'use client'
import React, { useEffect, useState } from "react";
import { FOOTER_PROTECTED } from "../services/Constants";
import Footer from "./Footer";
import { usePathname } from 'next/navigation';

export const ProtectedFooter = ({ children }) => {
  const pathname = usePathname();
  const [pagePath, setPagePath] = useState("");

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
      default:
        return setPagePath(false);
    }
  }, [pathname]);

  return (pagePath ? <Footer subscribe={true} /> : <Footer subscribe={false} />);
};
