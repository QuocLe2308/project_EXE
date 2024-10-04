import Link from "next/link";
import { FaUserCog } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlinePassword } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Modal } from "reactstrap";

type LoginFormProps = {
  isCloseLogin: boolean;
  setIsCloseLogin: any;
};

const LoginForm = ({ isCloseLogin, setIsCloseLogin }: LoginFormProps) => {
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

          <form action="#">
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
                >
                  <option value="" disabled selected hidden>
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
                <input type="text" required />
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
                <input type="password" required />
                <label>Nhập mật khẩu</label>
              </div>
            </div>

            {/* Confirm code */}
            <div
              style={{
                display: "flex",
              }}
            >
              <MdOutlinePassword
                color="#ced4da"
                style={{
                  marginTop: "32px",
                }}
              />
              <div className="login-input-field ms-3" style={{ flex: "1" }}>
                <input type="text" required />
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
