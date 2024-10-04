import { IoMdClose } from "react-icons/io";
import { Modal } from "reactstrap";

type RegisterFormProps = {
  isCloseRegister: boolean;
  setIsCloseRegister: any;
};

const RegisterForm = ({
  isCloseRegister,
  setIsCloseRegister,
}: RegisterFormProps) => {
  return (
    <>
      <Modal isOpen={isCloseRegister} className="register-modal">
        <div className="register-container">
          <div
            className="register-icon-close"
            onClick={() => {
              setIsCloseRegister(false);
            }}
          >
            <IoMdClose size={38} color="#ccc" />
          </div>
          {/* Title section  */}
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
          <div className="register-content">
            {/* Registration htmlForm  */}
            <form action="#">
              <div className="register-user-details">
                {/* Input htmlFor Full Name  */}
                <div className="register-input-box">
                  <span className="register-details">Họ & Tên</span>
                  <input
                    style={{ backgroundColor: "#fff" }}
                    type="text"
                    placeholder="Nhập Họ & Tên"
                    required
                  />
                </div>
                {/* Input htmlFor Username  */}
                <div className="register-input-box">
                  <span className="register-details">Tài khoản</span>
                  <input
                    style={{ backgroundColor: "#fff" }}
                    type="text"
                    placeholder="Nhập tài khoản"
                    required
                  />
                </div>
                {/* Input htmlFor Email  */}
                <div className="register-input-box">
                  <span className="register-details">Email</span>
                  <input
                    style={{ backgroundColor: "#fff" }}
                    type="email"
                    placeholder="Nhập email"
                    required
                  />
                </div>
                {/* Input htmlFor Phone Number  */}
                <div className="register-input-box">
                  <span className="register-details">Số điện thoại</span>
                  <input
                    style={{ backgroundColor: "#fff" }}
                    type="text"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
                {/* Input htmlFor Password  */}
                <div className="register-input-box">
                  <span className="register-details">Mật khẩu</span>
                  <input
                    style={{ backgroundColor: "#fff" }}
                    type="password"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>
                {/* Input htmlFor Confirm Password  */}
                <div className="register-input-box">
                  <span className="register-details">Địa chỉ</span>
                  <input
                    style={{ backgroundColor: "#fff" }}
                    type="text"
                    placeholder="Nhập địa chỉ"
                    required
                  />
                </div>

                {/* Select role */}
                <div
                  className="mt-4"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: "1",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      marginBottom: "11px",
                    }}
                  >
                    <label
                      className="register-details me-3"
                      style={{
                        color: "#ccc",
                        flexShrink: "0",
                        fontWeight: "500",
                      }}
                    >
                      Chọn vai trò
                    </label>
                    <select
                      className="register-select-role"
                      style={{
                        background: "#fff",
                        borderRadius: "6px",
                        padding: "6px 28px",
                        width: "100%",
                        minHeight: "42px",
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
              </div>
              {/* Submit button  */}
              <div className="register-button">
                <input className="font-Nunito" type="submit" value="Đăng Ký" />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RegisterForm;
