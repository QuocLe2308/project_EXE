"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

// Định nghĩa kiểu cho props
interface DeleteAccountProps {
  params: {
    accountId: string; // ID của tài khoản
    role: string;      // Vai trò của tài khoản
  };
}

const DeleteAccount = ({ params }: DeleteAccountProps) => {
  const router = useRouter();
  const { accountId, role } = params;

  useEffect(() => {
    const deleteAccount = async () => {
      const token = Cookies.get("token");
      const userRole = Cookies.get("role");

      // Kiểm tra xem người dùng có phải là admin không
      if (userRole !== "1") {
        alert("Bạn không có quyền xóa tài khoản.");
        router.push("/list_account");
        return;
      }

      let apiUrl: string | null = null;

      // Xác định URL API dựa trên vai trò
      if (role === "1") {
        apiUrl = `http://localhost:8080/api/admin/delete/${accountId}`;
      } else if (role === "2") {
        apiUrl = `http://localhost:8080/api/landlord/delete/${accountId}`;
      } else if (role === "3") { // Vai trò người dùng
        apiUrl = `http://localhost:8080/api/user/delete/${accountId}`;
      }

      if (apiUrl) {
        try {
          await axios.delete(apiUrl, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert("Tài khoản đã được xóa thành công.");
          router.push("/list_account"); // Quay lại trang quản lý tài khoản
        } catch (error) {
          console.error("Lỗi khi xóa tài khoản:", error);
          alert("Có lỗi xảy ra khi xóa tài khoản.");
        }
      }
    };

    deleteAccount();
  }, [accountId, role, router]);

  return (
    <div>
      <h1>Đang xóa tài khoản...</h1>
    </div>
  );
};

export default DeleteAccount;
