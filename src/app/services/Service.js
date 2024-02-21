import { toast } from "react-toastify";
import {
  BASE_URL,
  Create_Itinerary,
  Edit_User_Profile,
  Get_CMS,
  UnSubscribe,
  User_SignIn,
} from "./Url";
import { SUCCESS } from "./Constants";

// const BaseUrl = process.env.REACT_APP_BASE_URL;
const BaseUrl = BASE_URL;

const tokenSetter = () => {
  let token = localStorage.getItem("token");

  let headers;
  if (token === "" || token == null || token === undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };
  }
  return headers;
};

//Post API for formData
export const sendFormData = async (url, body) => {
  let token = localStorage.getItem("token");
  let completeUrl = BaseUrl + url;
  try {
    const res = await fetch(completeUrl, {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
      body,
    });
    const response = await res.json();
    const httpsStatus = res.status;
    if (httpsStatus === 200) {
      return SUCCESS;
    } else if (httpsStatus === 401) {
      toast.error(response?.message);
      localStorage?.removeItem("token");
    } else {
      toast.error(response?.message);
      return response?.message;
    }
  } catch (err) {
    toast.error(err);
    return err;
  }
};

//Post API, (sending body)
export const sendData = async (url, body) => {
  let headers = tokenSetter();
  const completeUrl = BaseUrl + url;
  try {
    const res = await fetch(completeUrl, {
      method: "POST",
      headers,
      body,
    });
    const response = await res.json();
    const httpsStatus = res.status;
    if (httpsStatus === 200) {
      if (url === User_SignIn) {
        //if the reuest is a login
        localStorage.setItem("token", response?.data);
        localStorage.setItem("user_id", response?.user?.user_id);
        toast.success("Login Successful!");
        return SUCCESS;
      }
      if (url === Edit_User_Profile) {
        return response.responseVal;
      }
      if (url === UnSubscribe) {
        return response.message;
      } else {
        return SUCCESS;
      }
    } else if (httpsStatus === 401) {
      toast.error(response?.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      localStorage?.removeItem("token");
      return "DEACTIVE";
    } else if (httpsStatus === 403) {
      console.log("there's no data available");
      window.location.href = "/login";
    } else {
      toast.error(response?.message);
      return false;
    }
  } catch (err) {
    toast.error(err);
    return err;
  }
};

//post API to get and send data
export const post = async (url, body, setData) => {
  let headers = tokenSetter();
  const completeUrl = BaseUrl + url;
  try {
    const res = await fetch(completeUrl, {
      method: "POST",
      headers,
      body,
    });
    const response = await res.json();
    let httpsStatus = res.status;
    if (httpsStatus === 200) {
      setData(response?.data);
      return SUCCESS;
    } else if (httpsStatus === 201 && url === Create_Itinerary) {
      setData(response?.data);
      return SUCCESS;
    } else if (httpsStatus === 201) {
      return SUCCESS;
    } else if (httpsStatus === 404 && url === Get_CMS) {
      return;
    } else if (httpsStatus === 404) {
      toast.error(response?.message);
    } else if (httpsStatus === 401) {
      toast.error(response?.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      localStorage?.removeItem("token");
      return "deactivate";
    } else {
      toast.error(response?.message);
    }
  } catch (error) {
    console.log("error", error);
    toast.error(error);
  }
};

//Get API request
export const get = async (url, setData) => {
  var headers = tokenSetter();
  const completeUrl = BaseUrl + url;
  try {
    const res = await fetch(completeUrl, {
      method: "GET",
      headers,
    });
    const response = await res.json();
    let httpsStatus = res.status;
    if (httpsStatus === 200) {
      setData(response?.data);
      return SUCCESS;
    } else if (httpsStatus === 401) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      toast.error(response?.message);
      localStorage?.removeItem("token");
    } else if (httpsStatus === 404 && response.message === "No Data found") {
      return;
    } else {
      toast.error(response?.message);
      return;
    }
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

// Mobile verification
export const mobileVerify = async (url, number, body) => {
  let headers = tokenSetter();

  const completeUrl = BaseUrl + url + "/" + number;

  try {
    const res = await fetch(completeUrl, {
      method: "POST",
      headers,
      body,
    });
    const response = await res.json();
    let httpsStatus = res.status;
    if (httpsStatus === 200) {
      return response.response;
    } else if (httpsStatus === 404) {
      toast.error("You've entered wrong OTP!");
      return false;
    } else {
      toast.error(response?.message);
      return false;
    }
  } catch (error) {
    console.log("error:", error);
    toast.error(error);
    return false;
  }
};

// Email verification
export const emailVerify = async (url, number, body) => {
  let headers = tokenSetter();

  const completeUrl = BaseUrl + url + "/" + number;

  try {
    const res = await fetch(completeUrl, {
      method: "POST",
      headers,
      body,
    });
    const response = await res.json();
    let httpsStatus = res.status;
    if (httpsStatus === 200) {
      return true;
    } else if (httpsStatus === 404) {
      toast.error("You've entered wrong OTP!");
      return false;
    } else {
      toast.error(response?.message);
      return false;
    }
  } catch (error) {
    console.log("error", error);
    toast.error(error);
    return false;
  }
};
