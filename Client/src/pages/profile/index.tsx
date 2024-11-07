"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState<{
    createdAt: string;
    address: string;
    role: number;
    phoneNumber: string;
    disable: boolean;
    fullName: string;
    userName: string;
    userID: number;
    email: string;
    passwordHash: string;
    updatedAt: string;
    adminID: number;
    landlordID: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("token");
      const role = Cookies.get("role");

      console.log("Token:", token);
      console.log("Role:", role);

      if (!token || !role) {
        setError("Bạn chưa đăng nhập");
        setLoading(false);
        return;
      }

      try {
        let response;

        switch (role) {
          case "1":
            response = await axios.get(
              "http://localhost:8080/api/admin/profile",
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            break;
          case "2":
            response = await axios.get(
              "http://localhost:8080/api/landlord/profile",
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            break;
          case "3":
            response = await axios.get(
              "http://localhost:8080/api/user/profile",
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            break;
          default:
            setError("Vai trò không hợp lệ");
            setLoading(false);
            return;
        }

        console.log("Dữ liệu trả về từ server:", response.data);

        if (response.data) {
          const profileData = JSON.parse(JSON.stringify(response.data));
          setProfile(profileData);
        } else {
          setError("Không nhận được dữ liệu từ server");
        }
      } catch (_error) {
        if (axios.isAxiosError(_error)) {
          setError(`Lỗi: ${_error.response?.data?.message || _error.message}`);
        } else {
          setError("Có lỗi xảy ra khi lấy thông tin profile");
        }
        console.error(_error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      console.log("Profile data:", profile);
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
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

  const getRoleName = (role: number) => {
    switch (role) {
      case 1:
        return "Admin";
      case 2:
        return "Landlord";
      case 3:
        return "User";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-4 mb-4">
          <button 
            onClick={() => window.history.back()} 
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            ← Quay lại
          </button>
          <button 
            onClick={() => window.location.href = '/edit_profile'} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Chỉnh sửa thông tin
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Profile Information</h1>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-center mb-8">
              <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-4xl text-blue-600">{profile.fullName.charAt(0)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold">{profile.fullName}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="font-semibold">{profile.userName}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{profile.email}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-semibold">{profile.phoneNumber}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-semibold">{profile.address}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-semibold">{getRoleName(profile.role)}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Account Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    profile.disable ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {profile.disable ? 'Disabled' : 'Active'}
                  </span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-semibold">{new Date(profile.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 text-center mt-4">
              Last updated: {new Date(profile.updatedAt).toLocaleString()}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
