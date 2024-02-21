'use client'
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { popupVisible } from "../../redux/actions/commonAction";
import PdfViewer from "../PdfViewer";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import UserContext from "@/app/context/userContextAPI";
import { IMAGE_BASE } from "@/app/services/Url";
import { useRouter, usePathname } from 'next/navigation';

// const ImageBase = process.env.REACT_APP_IMAGE_BASE;
const ImageBase = IMAGE_BASE;

const lightboxStyle = {
    overlay: {
        zIndex: 1000000000000,
    },
    container: {
        zIndex: 1000000000001,
    },
};

function ImageComponent(props) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <img
                src={props.src}
                alt="img"
                className="img-fluid"
                onClick={() => setIsOpen(true)}
                style={{ cursor: "pointer" }}
            />
            {isOpen && (
                <Lightbox
                    mainSrc={props.src}
                    onCloseRequest={() => setIsOpen(false)}
                    reactModalStyle={lightboxStyle}
                />
            )}
        </>
    );
}

export const FlightTicket = () => {
    const router = useRouter();
    const pathname = usePathname();
    
    const dispatch = useDispatch();
    const { ticket } = useContext(UserContext);

    function isPDF(fileName) {
        return fileName.toLowerCase().endsWith(".pdf") || fileName.toLowerCase().endsWith(".doc");
    }

    return (
        <div className="popup-ctnr-outer">
            <div className="popup-ctnr ticket-ctnr">
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
                <div className="ticket-img mt-3">
                    {ticket ? (
                        isPDF(ticket) ? (
                            <PdfViewer pdfSrc={ImageBase + "uploadticket/" + ticket} />
                        ) : pathname.includes("gallery") ? (
                            <ImageComponent src={ImageBase + "coverimage/" + ticket} />
                        ) : pathname.includes("chatpage") ? (
                            <ImageComponent src={ticket} />
                        ) : (
                            <ImageComponent src={ImageBase + "uploadticket/" + ticket} />
                        )
                    ) : (
                        <>
                            <div className="popup-img mb-5">
                                <img alt="img" className="img-fluid" />
                            </div>
                            <h4 style={{ color: "red" }}>Something went wrong!</h4>
                            <p className="mb-5">Ticket can't be loaded. Try again later.</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
