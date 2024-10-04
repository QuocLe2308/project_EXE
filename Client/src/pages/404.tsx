import Link from "next/link";
import { CiWarning } from "react-icons/ci";

const NotFoundPage = () => {
  return (
    <>
      {/* 404 Start  */}
      <div
        className="container-xxl fadeInUp"
        data-wow-delay="0.1s"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="row col-lg-8">
              <CiWarning size={90} color="#86B817" />
              <h1
                className="display-1 font-Nunito"
                style={{
                  color: "#2C3E50",
                  fontWeight: "800",
                  fontSize: "120px",
                }}
              >
                404
              </h1>
              <h1
                className="mb-4 font-Nunito"
                style={{
                  color: "#2C3E50",
                  fontWeight: "800",
                  fontSize: "42px",
                }}
              >
                Không Tìm Thấy Trang
              </h1>
              <p className="mb-4" style={{ fontSize: "20px" }}>
                Chúng tôi xin lỗi, trang bạn đang tìm kiếm không tồn tại trên
                website của chúng tôi! Có thể quay lại trang chủ hoặc thử sử
                dụng chức năng tìm kiếm?
              </p>
              <div>
                <Link
                  className="btn btn-primary rounded-pill py-3 px-5"
                  href="/"
                  style={{
                    fontSize: "18px",
                  }}
                >
                  Trở về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 404 End  */}
    </>
  );
};

export default NotFoundPage;
