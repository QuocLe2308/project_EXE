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


const fetchAllProperties = () => {
  return axiosInstance.get(
    "/property",
   
  );
};
const fetchPropertiesByLocation = (latitude: number, longitude: number, distance: number) => {
    return axiosInstance.post(
      "/property/nearby", {
          latitude: latitude,
          longitude: longitude,
          distance: distance,
      }
    );
  };
  const fetchPropertiesByPrice = (apiUrl: string) => {
    return axiosInstance.get(
        apiUrl,
    );
  };


export { fetchAllProperties, fetchPropertiesByLocation, fetchPropertiesByPrice };
