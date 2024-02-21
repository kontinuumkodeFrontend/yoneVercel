import React from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useRouter } from "next/router";

export default function Custom404() {
    const router = useRouter();

    return(
        <>
        <div className="hdr-outer">
          <Header />
        </div>
        <div className="error-page">
          <section className="error-sec sec-padding">
            <div className="container">
              <div className="error-sec-inr">
                <div className="err-img">
                  <img src={'/images/innerPages/error.png'} alt="img" />
                </div>
                <div className="err-ctnt">
                  <div className="err-heading">
                    Oops! Page <b>Not Found</b>!
                  </div>
                  <p className="err-desc">
                    we are sorry for the inconvenience. it looks like you are
                    trying to access a page.
                  </p>
                  <button className="btn-design mt-4" onClick={() => router.push('/')}>Back to Home</button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </>
    )
  }