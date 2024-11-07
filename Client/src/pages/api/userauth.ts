import axios, { AxiosError } from "axios";
import axiosInstance from "./customize-axios";

// Define an interface for the error response object
interface ErrorResponse {
  data?: any;
  status?: number;
  headers?: any;
}

const isAxiosError = (error: any): error is AxiosError => {
  return error.isAxiosError;
};

const fetchCaptcha = () => {
  return axiosInstance.get(`/captcha`, {
    withCredentials: true,
  });
};
const AdminLogin = (username: string, password: string, captcha: string) => {
  return axiosInstance.post(
    "/admin/login",
    { username, password, captcha },
    { withCredentials: true }
  );
};
const LandLordLogin = (username: string, password: string, captcha: string) => {
    return axiosInstance.post(
      "/landlord/login",
      { username, password, captcha },
      { withCredentials: true }
    );
  };
  const UserLogin = (username: string, password: string, captcha: string) => {
    return axiosInstance.post(
      "/user/login",
      { username, password, captcha },
      { withCredentials: true }
    );
  };


export { fetchCaptcha, AdminLogin, LandLordLogin, UserLogin };
