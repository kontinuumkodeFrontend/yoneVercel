'use client'
import React, { useState } from "react";
import { InnerBanner } from "../Components/InnerBanner";
import { POPUP_TYPE, SETTING_TABS, SUCCESS } from "../services/Constants";
import { Profile } from "../features/Setting/Profile";
import { ChangePassword } from "../features/Setting/ChangePassword";
import { popupVisible } from "../redux/actions/commonAction";
import { useDispatch } from "react-redux";
import { Edit_Profile_Picture, Get_Profile, IMAGE_BASE } from "../services/Url";
import { useEffect } from "react";
import { get, sendFormData } from "../services/Service";
import { useContext } from "react";
import UserContext from "../context/userContextAPI";
import { toast } from "react-toastify";


// const ImageBase = process.env.REACT_APP_IMAGE_BASE;
const ImageBase = IMAGE_BASE;

const bnrCtnt = {
  heading: "Settings",
  description: "A user can  Edit profile and update password",
  image: '/images/innerPages/innerBanner.jpg',
};

export default function Setting(){
  const [tab, setTab] = useState(SETTING_TABS?.PROFILE);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const ctx = useContext(UserContext);

  useEffect(() => {
    get(Get_Profile, setData);
  }, [ctx.profileUpdated]);

  const [userImg, setUserImg] = useState('/images/innerPages/prfPlaceholder.png');

  useEffect(() => {
    if (data?.profile_picture) {
      setUserImg(ImageBase + "profile/" + data?.profile_picture);
    }
  }, [data]);

  const handleProfileImg = (e) => {
    const selectedImage = e.currentTarget.files[0];
  
    if (selectedImage) {
      if (selectedImage.type.startsWith("image/")) {
        if (selectedImage.size <= 1048576) { // 1MB in bytes
          setUserImg(URL.createObjectURL(selectedImage)); // Update userImg state
  
          const formData = new FormData();
          formData.append('profile_picture', selectedImage);
          
          sendFormData(Edit_Profile_Picture, formData).then((res) => {
            if (res === SUCCESS) {
              toast.success("Profile picture updated successfully!");
            }
          });
        } else {
          toast.error("File size exceeds the allowed limit (up to 1MB allowed).");
        }
      } else {
        toast.error("Selected file is not an image.");
      }
    }
  };
  

  return (
    <div className="setting-page">
      <InnerBanner content={bnrCtnt} />

      {/* Setting */}
      <section className="current-trip-sec sec-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="prf-bx">
                <div className="prf-conatiner">
                  <div className="prf-img">
                    <img src={userImg} alt="img" />
                  </div>
                  <span className="prf-icon">
                    <img src={'/images/innerPages/prfImageIcon.png'} alt="img" />
                  </span>
                  <input type="file" accept="image/*" onChange={handleProfileImg} />
                </div>

                <div className="prf-info">
                  <h5>{data?.name}</h5>
                  <p className="m-0">{data?.email}</p>
                </div>

                <ul className="setting-tabs">
                  <li
                    onClick={() => setTab(SETTING_TABS?.PROFILE)}
                    className={tab === SETTING_TABS?.PROFILE ? "active" : ""}
                  >
                    <div className="stng-lft">
                      <span>
                        <img src={'/images/innerPages/prfIcon.png'} alt="img" />
                        {/* <img src={prfBlueIcon} className="blue" alt="img" /> */}
                      </span>
                      Edit Profile
                    </div>
                    <div className="stng-rgt">
                      <span>
                        <img src={'/images/innerPages/rgtArw.png'} alt="img" />
                        {/* <img src={rgtBlueArw}  className="blue" alt="img" /> */}
                      </span>
                    </div>
                  </li>
                  <li
                    onClick={() => setTab(SETTING_TABS?.CHANGE_PASSWORD)}
                    className={
                      tab === SETTING_TABS?.CHANGE_PASSWORD ? "active" : ""
                    }
                  >
                    <div className="stng-lft">
                      <span>
                        <img src={'/images/innerPages/lockIcon.png'} alt="img" />
                        {/* <img src={lockBlueIcon} className="blue" alt="img" /> */}
                      </span>
                      Change Password
                    </div>
                    <div className="stng-rgt">
                      <span>
                        <img src={'/images/innerPages/rgtArw.png'} alt="img" />
                        {/* <img src={rgtBlueArw} className="blue" alt="img" /> */}
                      </span>
                    </div>
                  </li>
                  <li
                    onClick={() =>
                      dispatch(popupVisible?.popupOpen(POPUP_TYPE?.LOGOUT))
                    }
                  >
                    <div className="stng-lft">
                      <span>
                        <img src={'/images/innerPages/logIcon.png'} alt="img" />
                      </span>
                      Logout
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8 mt-lg-0 mt-4">
              {tab === SETTING_TABS?.PROFILE ? (
                <Profile item={data} />
              ) : tab === SETTING_TABS?.CHANGE_PASSWORD ? (
                <ChangePassword />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
