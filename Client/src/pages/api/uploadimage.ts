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


const uploadImage = (formData: FormData) => {
    return axiosInstance.post(
      "/image",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
  };

export { uploadImage};
