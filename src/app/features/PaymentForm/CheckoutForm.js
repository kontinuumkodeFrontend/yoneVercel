import React, { useState, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Payment_API } from "../../services/Url";
import { sendData } from "../../services/Service";
import { toast } from "react-toastify";
import { POPUP_TYPE, SUCCESS } from "../../services/Constants";
import { useDispatch } from "react-redux";
import { popupVisible } from "../../redux/actions/commonAction";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ tripId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cardholderName, setCardholderName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isCardNumValid, setCardNumValid] = useState(false);
  const [cardNumError, setCardNumError] = useState();
  const [isExpiryValid, setExpiryValid] = useState(false);
  const [expiryError, setExpiryError] = useState();
  const [isCvvValid, setCvvValid] = useState();
  const [cvvError, setCvvError] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Validation functions
  const isNameValidHandler = (name) => /^[A-Za-z\s]{3,}$/.test(name); // Minimum 3 characters, no special characters, no numbers

  useEffect(() => {
    setIsNameValid(isNameValidHandler(cardholderName));
  }, [cardholderName]);

  const handleCardInputChange = (event) => {
    // Check if the card details are complete
    const { error, complete } = event;
    if (event.elementType === "cardCvc") {
      if (error === undefined && complete) {
        setCvvError();
        setCvvValid(true);
      } else {
        setCvvError(error?.message);
        setCvvValid(false);
      }
    } else if (event.elementType === "cardExpiry") {
      if (error === undefined && complete) {
        setExpiryError();
        setExpiryValid(true);
      } else {
        setExpiryError(error?.message);
        setExpiryValid(false);
      }
    } else if (event.elementType === "cardNumber") {
      if (error === undefined && complete) {
        setCardNumError();
        setCardNumValid(true);
      } else {
        setCardNumError(error?.message);
        setCardNumValid(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCardNumValid || !isExpiryValid || !isCvvValid || !isNameValid) {
      return;
    }

    setIsLoading(true);

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (cardNumberElement == null) {
      return;
    }

    // payment processing logic here...
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement, //The Stripe Elements library takes care of securely collecting the card details from the input field.
      billing_details: {
        name: cardholderName,
      },
    });

    if (error) {
      setMessage(error?.message);
    } else {
      setMessage();
      // Create a token from the PaymentMethod (Legacy Approach)
      stripe
        .createToken(cardNumberElement, {
          name: cardholderName,
        })
        .then((result) => {
          if (result.error) {
            // console.error("Token Creation Error:", result.error);
            toast.error(result.error);
          } else {
            const token = result.token.id;
            const body = JSON.stringify({
              payment_type: "card",
              tripId: tripId,
              amount: amount,
              stripeToken: token,
            });
            setIsLoading(true);
            sendData(Payment_API, body).then((res) => {
              if (res === SUCCESS) {
                dispatch(popupVisible?.popupOpen(POPUP_TYPE?.PAY_SUCCESS));
                setTimeout(() => {
                  navigate("/triplist");
                  dispatch(popupVisible?.popupClose());
                  setIsLoading(false);
                }, 2000);
              } else {
                setIsLoading(false);
                // toast.error("Payment Failed! Please try again");
              }
            });
          }
        });
    }
  };

  const stripeOptions = {
    placeholder: "Card Number",
  };

  return (
    <div className="checkout-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cardholderName">Name on Card:</label>
          <input
            type="text"
            id="cardholderName"
            placeholder="Name on Card"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            required
            className="form-control"
          />
          {!isNameValid && cardholderName && (
            <div className="error-text">
              Name must be at least 3 characters and contain no special
              characters and numbers.
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number:</label>
          <CardNumberElement
            options={stripeOptions}
            id="cardNumber"
            onChange={handleCardInputChange}
            className="form-control"
          />
          {!isCardNumValid && cardNumError && (
            <div className="error-text">{cardNumError}</div>
          )}
        </div>
        <div className="form-row">
          <div className="form-group col-md-5">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <CardExpiryElement
              id="expiryDate"
              onChange={handleCardInputChange}
              className="form-control"
            />
            {!isExpiryValid && expiryError && (
              <div className="error-text">{expiryError}</div>
            )}
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="cvc">CVV:</label>
            <CardCvcElement
              id="cvc"
              onChange={handleCardInputChange}
              className="form-control"
              placeholder="***"
            />
            {!isCvvValid && cvvError && (
              <div className="error-text">{cvvError}</div>
            )}
          </div>
        </div>

        <div className="form-group">
          <button
            type="submit"
            disabled={
              isLoading ||
              !isNameValid ||
              !isCardNumValid ||
              !isExpiryValid ||
              !isCvvValid
            }
            className="btn btn-primary"
          >
            <span>
              {isNameValid &&
                isCardNumValid &&
                isExpiryValid &&
                isCvvValid &&
                isLoading && (
                  <div className="spinner">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
            </span>{" "}
            {isNameValid &&
              isCardNumValid &&
              isExpiryValid &&
              isCvvValid &&
              isLoading
              ? "Processing..."
              : `PAY $${amount}`}
          </button>
        </div>
        {message && <div className="error-text text-center">{message}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
