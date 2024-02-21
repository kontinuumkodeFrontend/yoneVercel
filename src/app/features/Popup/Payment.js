'use client'
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { popupVisible } from "../../redux/actions/commonAction";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import {
  BANK_TRANSFER,
  PAYMENTS_TABS,
  SUCCESS,
} from "../../services/Constants";
import { toast } from "react-toastify";
import { sendFormData } from "../../services/Service";
import { Payment_API } from "../../services/Url";
import { useContext } from "react";
import UserContext from "../../context/userContextAPI";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export const Payment = ({param}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [paymentType, setPaymentType] = useState(
    PAYMENTS_TABS?.PAY_CREDIT_CARD
  );
  let pathArr = pathname.split('/')
  let tripId = pathArr[2]
  console.log(tripId, "popup param", pathname);
  const [bankTransFile, setBankTransFile] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  // const { tripId } = router.query;

  const ctx = useContext(UserContext);
  const { tripTicketDetails } = useContext(UserContext);
  

  // Use router.push for navigation
  const navigate = (path) => {
    router.push(path);
  };


  const checkoutHandler = (e) => {
    toast.dismiss()
    e.preventDefault();
    if (paymentType === PAYMENTS_TABS?.PAY_BANK_TRANSFER) {
      if (bankTransFile) {
        const formData = new FormData();
        formData.append("payment_type", BANK_TRANSFER);
        formData.append("tripId", tripId);
        formData.append("amount", tripTicketDetails?.payableAmount);
        formData.append("bank_receipt", bankTransFile);
        sendFormData(Payment_API, formData).then((res) => {
          if (res === SUCCESS) {
            dispatch(popupVisible?.popupClose());
            toast.success("Your receipt was successfully submitted");
            ctx.paySuccessHandler();
          } else {
            toast.error("An error occurred while submitting your receipt")
          }
        })
      } else {
        setError("Please upload your bank receipt");
      }
    } else {
      navigate(`/payment/${tripId}`);
      dispatch(popupVisible?.popupClose());
    }
  };

  return (
    <div className="popup-ctnr-outer payment-popup ">
      <div className="popup-ctnr">
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

        <div className="popup-ctnt">
          <h4>Select Payment Method</h4>
          <RadioGroup
            aria-label="Your plan"
            name="people"
            defaultValue={paymentType}
            onChange={(e) => {
              setPaymentType(e.target.value);
            }}
          >
            <List
              sx={{
                minWidth: 240,
                "--List-gap": "0.5rem",
                "--ListItem-paddingY": "1rem",
                "--ListItem-radius": "8px",
                "--ListItemDecorator-size": "32px",
              }}
            >
              {[
                PAYMENTS_TABS?.PAY_CREDIT_CARD,
                PAYMENTS_TABS?.PAY_DEBIT_CARD,
                PAYMENTS_TABS?.PAY_BANK_TRANSFER,
              ].map((item, index) => (
                <ListItem
                  variant="outlined"
                  key={item}
                  sx={{ boxShadow: "sm", bgcolor: "background.body" }}
                >
                  <ListItemDecorator>
                    {
                      [
                        <img src={'/images/innerPages/master.png'} alt="img" />,
                        <img src={'/images/innerPages/visa.png'} alt="img" />,
                        <img src={'/images/innerPages/bankTransfer.png'} alt="img" />,
                      ][index]
                    }
                  </ListItemDecorator>
                  <Radio
                    overlay
                    value={item}
                    label={item}
                    sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                    slotProps={{
                      action: ({ checked }) => ({
                        sx: (theme) => ({
                          ...(checked && {
                            inset: -1,
                            border: "2px solid",
                            borderColor: theme.vars.palette.primary[500],
                          }),
                        }),
                      }),
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </RadioGroup>
          {paymentType === PAYMENTS_TABS?.PAY_BANK_TRANSFER ? (
            <>
              <div className="file-upload">
                <span className="file-name ellipsis-text">
                  {bankTransFile ? bankTransFile.name : "Upload Bank Receipt"}
                </span>
                <span className="icon">
                  <img src={'/images/innerPages/uploadFile.png'} alt="img" />
                </span>
                <input
                  type="file"
                  onChange={(e) => {
                    setBankTransFile(e.target.files[0]);
                    setError("");
                  }}
                />
              </div>
              {error && <p className="error-text">{error}</p>}
            </>
          ) : (
            ""
          )}
          <div className="btn-wpr text-center">
            <button onClick={checkoutHandler} className="btn-design">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
