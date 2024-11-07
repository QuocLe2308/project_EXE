"use client";

import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import {  adminEditProfile, adminProfile, landlordEditProfile, landlordProfile, userEditProfile, userProfile } from "../api/user";
import { UserContext } from "@/components/UserAuth/UserContext";
import router from "next/router";

interface updateUserProfile {
  id: number;
  fullName: string;
  phoneNumber: string;
  address: string;
}

const EditProfile = () => {
  const [profile, setProfile] = useState<{
    userID: number;
    adminID?: number;
    landlordID?: number;
    fullName: string;
    phoneNumber: string;
    address: string;
    role: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const context = useContext(UserContext);
  const { user } = context;


  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setError("Bạn chưa đăng nhập");
        setLoading(false);
        return;
      }
     const response = await (user?.role === 1 ? adminProfile() : user?.role === 2 ? landlordProfile() : userProfile());   
     console.log("Response:", response.data);
      setLoading(false);
      if (response.data) {
        setProfile(response.data);
      } else {
        setError("Không nhận được dữ liệu từ server");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profile) {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (!profile) {
      setError("Dữ liệu profile không hợp lệ");
      return;
    }

    try {
      console.log("Profile data before update:", profile);

      const updateData: updateUserProfile = {
        id: user?.role === 1 ? profile.adminID : user?.role === 2 ? profile.landlordID : profile.userID,
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
        address: profile.address,
      };

      let response;
      if (user?.role === 1) {
        response = await adminEditProfile(updateData);
      } else if (user?.role === 2) {
        response = await landlordEditProfile(updateData);
      } else {
        response = await userEditProfile(updateData);
      }
      
      console.log("Response:", response.data);

      if (response.status === 200) {
        console.log("Cập nhật hồ sơ thành công:", response.data);
        router.push("/profile");
      } else {
        setError("Cập nhật hồ sơ thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật hồ sơ:", error);
      setError("Có lỗi xảy ra khi cập nhật thông tin hồ sơ");
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
          No profile data available
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Chỉnh sửa thông tin cá nhân
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Họ và tên
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
                <input
                  type="text"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </label>
            </div>
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
              >
                Cập nhật thông tin
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md transition duration-200"
              >
                Quay lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
