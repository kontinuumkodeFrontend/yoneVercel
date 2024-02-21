import Head from 'next/head';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./styleBase.css";
import "./custom.css";
import "./responsive.css";
import { UserContextProvider } from "./context/userContextAPI";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "./redux/ReduxProvider";
import { ProtectedHeader } from "./Components/ProtectedHeader";
import { ProtectedFooter } from "./Components/ProtectedFooter";
import { ModalContainer } from "./features/Modal";
import { PopupContainer } from "./features/Popup";

export const metadata = {
  title: "Explore the world together with YoneTravels | Book Tour packages",
  description:
    "Explore the world with YoneTravels. Find and Book awesome flights, hotels, and tour packages. We are a dynamic tour and travel management agency. Get a quote for your tour.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Explore the world with YoneTravels. Find and Book awesome flights, hotels, and tour packages. We are a dynamic tour and travel management agency. Get a quote for your tour."
        />
        <meta
          name="keywords"
          content="tour and travel management agency, tour and travel agency, tour and travel company, travel company in UK, travel agency in UK, travel agency"
        />
        <meta
          name="google-site-verification"
          content="JkNwoFPoEUcs89X2YnpPiGDx6WTSwxwYlXotkmubigU"
        />
        {/* Include external stylesheets */}
      
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
        
      </Head>
      <body>
        <ReduxProvider>
          <UserContextProvider>
          <PopupContainer />
          <ModalContainer />
            <div className="main_container">
              <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ textTransform: "capitalize" }}
              />
              <ProtectedHeader />
              {children}
              <ProtectedFooter />
            </div>
          </UserContextProvider>
          </ReduxProvider>
      </body>
    </html>
  );
}
