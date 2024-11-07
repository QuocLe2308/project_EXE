// pages/index.tsx

"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { UserContext } from "@/components/UserAuth/UserContext";

type Account = {
  userID?: number;
  landlordID?: number;
  adminID?: number;
  fullName: string;
  userName: string;
  email: string;
  role: number;
};

const IndexPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user }= useContext(UserContext);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        const role = Cookies.get("role");

        if (role !== "1") {
          router.push("/HomePage");
          return;
        }

        const [usersRes, landlordsRes, adminsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/user/viewList", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/api/landlord/viewList", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/api/admin/viewList", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const combinedAccounts: Account[] = [
          ...usersRes.data.data.map((account: Account) => ({ ...account, role: 3 })),
          ...landlordsRes.data.data.map((account: Account) => ({ ...account, role: 2 })),
          ...adminsRes.data.data.map((account: Account) => ({ ...account, role: 1 })),
        ];
        setAccounts(combinedAccounts);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tài khoản:", error);
        setError("Có lỗi xảy ra khi tải danh sách tài khoản.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [router, user]);

  const handleViewDetails = (accountId: number, role: number) => {
    router.push(`/account_detail/${accountId}?role=${role}`);
  };

  const handleDeleteAccount = async (accountId: number, role: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
      try {
        const token = Cookies.get("token");

        if (role === 3) {
          await axios.delete(`http://localhost:8080/api/user/delete/${accountId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else if (role === 2) {
          await axios.delete(`http://localhost:8080/api/landlord/delete/${accountId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else if (role === 1) {
          await axios.delete(`http://localhost:8080/api/admin/delete/${accountId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        setAccounts(prevAccounts => prevAccounts.filter(account => {
          const id = account.userID || account.landlordID || account.adminID;
          return id !== accountId;
        }));
      } catch (error) {
        console.error("Lỗi khi xóa tài khoản:", error);
        alert("Có lỗi xảy ra khi xóa tài khoản.");
      }
    }
  };

  if (user?.role !== 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="text-center text-red-600 text-xl">
              Bạn không có quyền truy cập trang này
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <div className="flex justify-between items-center mb-8">
          <button
                type="button"
                onClick={() => router.back()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                Quay lại
              </button>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Quản lý tài khoản</h1>
            
            <button
              onClick={() => router.push('/create_account')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Thêm tài khoản
            </button>
            
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md" role="alert">
              <div className="flex items-center">
                <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          ) : (
           
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Họ và tên</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tên đăng nhập</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {accounts.map((account, index) => {
                    const accountId = account.userID || account.landlordID || account.adminID;
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{accountId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{account.fullName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{account.userName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{account.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                          {accountId !== undefined && (
                            <>
                              <button
                                onClick={() => handleViewDetails(accountId, account.role)}
                                className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Chi tiết
                              </button>
                              <button
                                onClick={() => handleDeleteAccount(accountId, account.role)}
                                className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Xóa
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;