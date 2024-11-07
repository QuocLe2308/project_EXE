import axios, { AxiosError } from "axios";
import axiosInstance from "./customize-axios";

// Define an interface for the error response object
interface ErrorResponse {
  data?: any;
  status?: number;
  headers?: any;
}
interface updateUserProfile {
  id: number;
  fullName: string;
  phoneNumber: string;
  address: string;
}

const isAxiosError = (error: any): error is AxiosError => {
  return error.isAxiosError;
};

const userEditProfile = (updateUserProfile: updateUserProfile) => {
  return axiosInstance.put(
    "/user", updateUserProfile
  );
};

const adminEditProfile = (updateUserProfile: updateUserProfile) => {
  return axiosInstance.put(
    "/admin", updateUserProfile
  );
};

const landlordEditProfile = (updateUserProfile: updateUserProfile) => {
  return axiosInstance.put(
    "/landlord", updateUserProfile
  );
};


const userProfile = () => {
    return axiosInstance.get(
      "/user/profile"
    );
  };
  const adminProfile = () => {
    return axiosInstance.get(
      "/admin/profile"
    );
  };
  const landlordProfile = () => {
    return axiosInstance.get(
      "/landlord/profile"
    );
  };

  const adminDetail = (id: string) => {
    return axiosInstance.get(
      `/admin/${id}`
    );
  };
  const landlordDetail = (id: string) => {
    return axiosInstance.get(
      `/landlord/${id}`
    );
  };

  const userDetail = ( id: string) => {
    return axiosInstance.get(
      `/user/${id}`
    );
  };
 


export {userDetail, landlordDetail, adminDetail, userEditProfile, adminEditProfile, landlordEditProfile, userProfile, adminProfile, landlordProfile};
