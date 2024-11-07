// src/app/accountManagement/[accountId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

type AccountDetails = {
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: number;
  disable: boolean;
  createdAt: string;
  updatedAt: string;
};

const AccountDetailsPage = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const router = useRouter();
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");

        if (!token || !role) {
          throw new Error("Token hoặc role không hợp lệ.");
        }

        let res;
        if (role === "1") {
          res = await axios.get(`http://localhost:8080/api/admin/${accountId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else if (role === "2") {
          res = await axios.get(`http://localhost:8080/api/landlord/${accountId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          res = await axios.get(`http://localhost:8080/api/user/${accountId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        setAccountDetails(res.data);
      } catch (error) {
        console.error("Error fetching account details:", error);
        setError("Có lỗi xảy ra khi tải thông tin chi tiết tài khoản.");
      } finally {
        setLoading(false);
      }
    };

    if (accountId) {
      fetchAccountDetails();
    }
  }, [accountId, role]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          ← Quay lại
        </button>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Thông tin tài khoản</h1>
          </div>

          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="p-6">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{error}</p>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Họ và tên</p>
                    <p className="text-lg font-medium">{accountDetails?.fullName}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Tên đăng nhập</p>
                    <p className="text-lg font-medium">{accountDetails?.userName}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-medium">{accountDetails?.email}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                    <p className="text-lg font-medium">{accountDetails?.phoneNumber}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Địa chỉ</p>
                    <p className="text-lg font-medium">{accountDetails?.address}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Vai trò</p>
                    <p className="text-lg font-medium">
                      {accountDetails?.role === 1 ? (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full">Admin</span>
                      ) : accountDetails?.role === 2 ? (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Chủ nhà</span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">Người dùng</span>
                      )}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Trạng thái</p>
                    <p className="text-lg font-medium">
                      {accountDetails?.disable ? (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full">Đã vô hiệu hóa</span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">Đang hoạt động</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Ngày tạo</p>
                    <p className="text-lg font-medium">
                      {accountDetails?.createdAt && new Date(accountDetails.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Cập nhật lần cuối</p>
                    <p className="text-lg font-medium">
                      {accountDetails?.updatedAt && new Date(accountDetails.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsPage;