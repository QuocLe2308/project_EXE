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


const fetchAccounts = () => {
    return axiosInstance.get(
      "/user/viewList"
    );
  };
  
  const deleteAccount = (accountId: number) => {
    return axiosInstance.delete(`/user/delete/${accountId}`);
  };


export { fetchAccounts, deleteAccount};
