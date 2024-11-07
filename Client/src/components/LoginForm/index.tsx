import Link from "next/link";
import { FaUserCog } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlinePassword } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Modal } from "reactstrap";
import Cookies from 'js-cookie';
import {
  AdminLogin,
  LandLordLogin,
  UserLogin,
  fetchCaptcha,
} from "../../pages/api/userauth";
import { UserContext } from "../UserAuth/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
type LoginFormProps = {
  isCloseLogin: boolean;
  setIsCloseLogin: any;
};

const LoginForm = ({ isCloseLogin, setIsCloseLogin }: LoginFormProps) => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const [captcha, setCaptcha] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");


  const handleFetchCaptcha = async () => {
    try {
      const response = await fetchCaptcha();
      setCaptchaImage(response.data.captcha);
    } catch (err) {
      console.error("Error fetching captcha:", err);
    }
  };

  useEffect(() => {
    handleFetchCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let response;
      if (role === "admin") {
        response = await AdminLogin(username, password, captcha);
      } else if (role === "landlord") {
        response = await LandLordLogin(username, password, captcha);
      } else {
        response = await UserLogin(username, password, captcha);
      }
      if (response.data.status === "success") {
        console.log("checkLgContext", response.data);
        localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.token); 
            Cookies.set('token', response.data.token, { expires: 1 });
            Cookies.set('role', response.data.role, { expires: 1 });
       
         userContext?.loginContext(username, response.data.token);
        
        setIsCloseLogin(false)
        router.push("/");
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <Modal isOpen={isCloseLogin} className="login-modal">
        <div className="login-wrapper">
          <div
            className="login-icon-close"
            onClick={() => {
              setIsCloseLogin(false);
            }}
          >
            <IoMdClose size={38} color="#ccc" />
          </div>

          <form onSubmit={handleSubmit}>
            <h2
              className="font-Nunito text-uppercase login-title"
              style={{
                fontWeight: "800",
                marginBottom: "38px",
              }}
            >
              Đăng Nhập
            </h2>

            {/* Select Role */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaUserCog
                size={20}
                color="#ced4da"
                style={{ marginBottom: "15px" }}
              />
              <div
                className="ms-3"
                style={{
                  flex: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginBottom: "11px",
                }}
              >
                <label
                  className="me-3"
                  style={{ color: "#ccc", flexShrink: "0" }}
                >
                  Chọn vai trò
                </label>
                <select
                  className="login-select-role"
                  style={{
                    background: "#fff",
                    borderRadius: "6px",
                    padding: "6px 28px",
                    width: "100%",
                    height: "45px",
                  }}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Chọn vai trò
                  </option>
                  <option value="admin">Admin</option>
                  <option value="manager">Chủ trọ</option>
                  <option value="user">Người dùng</option>
                </select>
              </div>
            </div>

            {/* Username */}
            <div
              style={{
                display: "flex",
              }}
            >
              <FaUser
                color="#ced4da"
                style={{
                  marginTop: "32px",
                }}
              />
              <div className="login-input-field ms-3" style={{ flex: "1" }}>
                <input 
                  type="text" 
                  required 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Nhập tài khoản</label>
              </div>
            </div>

            {/* Password */}
            <div
              style={{
                display: "flex",
              }}
            >
              <RiLockPasswordFill
                color="#ced4da"
                style={{
                  marginTop: "32px",
                }}
              />
              <div className="login-input-field ms-3" style={{ flex: "1" }}>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Nhập mật khẩu</label>
              </div>
            </div>

            {/* Confirm code */}
            <div
              style={{
                display: "flex",
              }}
            >
            <img src={captchaImage} alt="Captcha" width={100} height={40} />
              <MdOutlinePassword
                color="#ced4da"
                style={{
                  marginTop: "32px",
                }}
              />
              <div className="login-input-field ms-3" style={{ flex: "1" }}>
                <input 
                  type="text" 
                  required 
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                />
                <label>Nhập mã xác nhận</label>
              </div>
            </div>

            {/* Forgot password */}
            <div className="login-forget">
              <Link
                href=""
                style={{
                  fontSize: "16px",
                }}
              >
                Quên mật khẩu?
              </Link>
            </div>

            {/* Button login */}
            <div className="register-button">
              <input className="font-Nunito" type="submit" value="Đăng nhập" />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default LoginForm;