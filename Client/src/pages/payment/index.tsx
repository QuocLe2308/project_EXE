import { useEffect } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";

import QrCodeImage from "@/assets/images/qr.jpg";

const PaymentPage = () => {
  // Spinner
  useEffect(() => {
    const spinner = setTimeout(() => {
      const spinnerElement = document.getElementById("spinner");
      if (spinnerElement) {
        spinnerElement.classList.remove("show");
      }
    }, 1);
    return () => clearTimeout(spinner);
  }, []);

  //Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Spinner Start  */}
      <div
        id="spinner"
        className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-border"
          style={{
            width: "3rem",
            height: "3rem",
            color: "#86B817",
          }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      {/* Spinner End  */}

      <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        <div className="d-flex justify-content-center">
          <div className="section-title-before"></div>
          <h6
            className="section-title-both bg-white text-center px-3 font-Nunito"
            style={{
              fontSize: "20px",
              color: "#86b817",
              fontWeight: "800",
            }}
          >
            Thanh Toán
          </h6>
          <div className="section-title-after"></div>
        </div>
        <h1
          className="mb-5 font-Nunito"
          style={{
            color: "#2C3E50",
            fontSize: "38px",
            fontWeight: "800",
          }}
        >
          Chi Tiết Thanh Toán
        </h1>
      </div>

      <div className="row">
        <div
          className="col-lg-6 pt-5"
          style={{ borderRight: "3px solid #ccc" }}
        >
          <h1
            className="mb-4 font-Nunito text-center ms-4"
            style={{
              color: "#2C3E50",
              fontSize: "22px",
              fontWeight: "800",
            }}
          >
            Chi Tiết Thanh Toán
          </h1>

          <div style={{ paddingLeft: "200px" }}>
            <p className="mb-2">Số tiền: 2.000.000 VNĐ</p>
            <p className="mb-2">
              Phương thức thanh toán: Online payment by Qr code
            </p>
            <p className="mb-2">Tài khoản: thanh@gmail.com</p>
            <p className="mb-2">Nội dung: Thánh toán phòng trọ Mai Anh</p>
            <p className="mb-2">Trạng thái: Đang chờ</p>
            <p className="mb-2">Ngày tạo: 10/3/2024, 6:26:26 PM</p>
            <p className="mb-2">Ngày cập nhật: 10/3/2024, 6:26:26 PM</p>
          </div>
        </div>
        <div className="container-xxl py-6 col-lg-6">
          <img
            className="img-fluid"
            src={QrCodeImage.src}
            alt=""
            style={{
              objectFit: "contain",
              width: "320px",
            }}
          />
        </div>
      </div>

      {/* Back to Top  */}
      <button
        className="btn btn-lg btn-primary btn-lg-square back-to-top"
        onClick={scrollToTop}
      >
        <FaLongArrowAltUp />
      </button>
    </>
  );
};

export default PaymentPage;
