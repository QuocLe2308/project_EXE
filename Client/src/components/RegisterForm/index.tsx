import React, { useState } from "react";
import { Modal } from "reactstrap";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";

type RegisterFormProps = {
  isCloseRegister: boolean;
  setIsCloseRegister: (value: boolean) => void;
};

const RegisterForm = ({
  isCloseRegister,
  setIsCloseRegister,
}: RegisterFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpModal, setOtpModal] = useState(false); // State for OTP modal
  const [otp, setOtp] = useState(""); // State for OTP input
  const [otpError, setOtpError] = useState<string | null>(null); // OTP-specific error

  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register_send",
        {
          username,
          email,
          passwordHash: password,
          fullName,
          phoneNumber,
          address,
        },
        { withCredentials: true }
      );

      console.log("Registration Response:", response.data);

      if (response && response.data && response.data.status === "success") {
        alert("Đăng ký thành công! Vui lòng nhập OTP để xác nhận.");
        // Open OTP modal after successful registration
        setOtpModal(true);
      } else {
        setError("Đăng ký không thành công. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOtp = async () => {
    setLoading(true);
    setOtpError(null);
    try {
      const response = await axios.post('http://localhost:8080/api/user/register_confirm', {
        username,
        email,
        passwordHash: password,
        fullName,
        phoneNumber,
        address,
        otp: otp,
      }, { withCredentials: true });

      console.log("check otp >>>", otp);
      console.log('OTP Confirmation Response:', response.data);

      // Kiểm tra response không phải null và success trong phản hồi
      if (response && response.data) {
        alert('Registration successful!');
        // Redirect or handle successful registration
      } else {
        setOtpError('Invalid OTP. Please try again.');
      }
      router.push('/');
    } catch (err) {
      console.error('Error during OTP confirmation:', err);
      setOtpError('Failed to confirm OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isCloseRegister} className="register-modal">
        <div className="register-container">
          <div
            className="register-icon-close"
            onClick={() => setIsCloseRegister(false)}
          >
            <IoMdClose size={38} color="#ccc" />
          </div>
          <h2
            className="register-title font-Nunito text-uppercase"
            style={{
              fontSize: "32px",
              fontWeight: "800",
              marginBottom: "38px",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Đăng Ký
          </h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {loading && <p>Loading...</p>}
          <div className="register-content">
            <form>
              <div className="register-user-details">
                <div className="register-input-box">
                  <span className="register-details">Họ & Tên</span>
                  <input
                    type="text"
                    placeholder="Nhập Họ & Tên"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="register-input-box">
                  <span className="register-details">Tài khoản</span>
                  <input
                    type="text"
                    placeholder="Nhập tài khoản"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="register-input-box">
                  <span className="register-details">Email</span>
                  <input
                    type="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="register-input-box">
                  <span className="register-details">Số điện thoại</span>
                  <input
                    type="text"
                    placeholder="Nhập số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="register-input-box">
                  <span className="register-details">Mật khẩu</span>
                  <input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="register-input-box">
                  <span className="register-details">Địa chỉ</span>
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="register-button">
                <input
                  className="font-Nunito"
                  type="button"
                  value="Đăng Ký"
                  onClick={handleRegister}
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>

      {/* OTP Modal */}
      <Modal isOpen={otpModal} className="otp-modal">
        <div className="otp-container bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="otp-title font-Nunito text-3xl font-extrabold text-gray-800">
              Nhập Mã OTP
            </h2>
            <button
              className="hover:bg-gray-100 p-2 rounded-full transition-all duration-300"
              onClick={() => setOtpModal(false)}
            >
              <IoMdClose size={24} className="text-gray-600" />
            </button>
          </div>
          
          <div className="otp-content space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
              />
            </div>
            
            <div className="flex justify-center mt-8">
              <button
                className="font-Nunito bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                onClick={handleConfirmOtp}
              >
                Xác Nhận OTP
              </button>
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              Vui lòng kiểm tra email của bạn để lấy mã OTP
            </p>
          </div>
        </div>
      </Modal>    </>
  );
};

export default RegisterForm;
