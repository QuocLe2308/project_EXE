import Link from "next/link";
import { useEffect } from "react";
import {
  FaLongArrowAltUp,
  FaStar,
  FaUserFriends,
  FaWarehouse,
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

import PackageImage1 from "@/assets/images/package/1.jpg";
import PackageImage2 from "@/assets/images/package/2.jpg";
import PackageImage3 from "@/assets/images/package/3.jpg";

const ListPage = () => {
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
            Danh Sách Trọ
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
          Thông Tin Tất Cả Nhà Trọ
        </h1>
      </div>

      <div className="row">
        <div className="col-lg-2 pt-5">
          <h1
            className="mt-5 mb-3 font-Nunito text-center ms-4"
            style={{
              color: "#2C3E50",
              fontSize: "22px",
              fontWeight: "800",
            }}
          >
            Tìm Kiếm Trọ
          </h1>

          <div className="d-flex justify-content-center flex-column ms-4">
            <div className="mb-3" style={{ width: "100%" }}>
              <select
                className="login-select-role"
                style={{
                  background: "#fff",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  width: "100%",
                  height: "50px",
                  fontSize: "16px",
                }}
              >
                <option value="" disabled selected hidden>
                  Sắp xếp theo giá
                </option>
                <option value="0">Giá từ thấp tới cao</option>
                <option value="1">Giá từ cao tới thấp</option>
              </select>
            </div>

            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control bg-transparent"
                id="name"
                placeholder="Your Name"
                style={{
                  height: "50px",
                  color: "#2C3E50",
                  paddingTop: "20px",
                }}
              />
              <label htmlFor="name" style={{ fontSize: "16px" }}>
                Khoảng cách (km)
              </label>
            </div>

            <button className="btn btn-primary rounded-pill py-2 px-4 mb-4">
              Tìm theo vị trí
            </button>
          </div>
        </div>
        {/* Package Start */}
        <div className="container-xxl py-5 col-lg-10">
          <div className="container">
            <div className="row g-4 justify-content-center flex-wrap">
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src={PackageImage1.src} alt="" />
                  </div>
                  <div className="d-flex border-bottom">
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaHouse className="me-2" size={20} />
                      Mai Trâm
                    </p>
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaWarehouse className="me-2" size={20} />2 tầng
                    </p>
                    <p className="flex-fill text-center py-2 d-flex align-items-center justify-content-center">
                      <FaUserFriends className="me-2" size={20} />3 người
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <h3
                      className="mb-1"
                      style={{
                        color: "#2C3E50",
                        fontWeight: "700",
                        fontSize: "28px",
                      }}
                    >
                      3.000.000 VNĐ
                    </h3>
                    <div className="mb-3 d-flex justify-content-center">
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                    </div>
                    <p className="mb-4">
                      Phòng trọ mới xây, đầy đủ tiện nghi, an ninh tốt, gần
                      trung tâm, phù hợp cho sinh viên.
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <Link
                        href="/"
                        className="btn btn-sm btn-primary px-3 btn-package-left"
                        style={{ fontSize: "18px" }}
                      >
                        Chi tiết
                      </Link>
                      <Link
                        href="/payment"
                        className="btn btn-sm btn-primary px-3 btn-package-right"
                        style={{ fontSize: "18px" }}
                      >
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img
                      className="img-fluid"
                      src={PackageImage2.src}
                      alt=""
                      height={283}
                    />
                  </div>
                  <div className="d-flex border-bottom">
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaHouse className="me-2" size={20} />
                      Minh Thư
                    </p>
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaWarehouse className="me-2" size={20} />2 tầng
                    </p>
                    <p className="flex-fill text-center py-2 d-flex align-items-center justify-content-center">
                      <FaUserFriends className="me-2" size={20} />2 người
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <h3
                      className="mb-1"
                      style={{
                        color: "#2C3E50",
                        fontWeight: "700",
                        fontSize: "28px",
                      }}
                    >
                      2.800.000 VNĐ
                    </h3>
                    <div className="mb-3 d-flex justify-content-center">
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                    </div>
                    <p className="mb-4">
                      Phòng trọ thoáng mát, wifi miễn phí, nội thất cơ bản, vị
                      trí thuận tiện.
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <Link
                        href="/"
                        className="btn btn-sm btn-primary px-3 btn-package-left"
                        style={{ fontSize: "18px" }}
                      >
                        Chi tiết
                      </Link>
                      <Link
                        href="/payment"
                        className="btn btn-sm btn-primary px-3 btn-package-right"
                        style={{ fontSize: "18px" }}
                      >
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src={PackageImage3.src} alt="" />
                  </div>
                  <div className="d-flex border-bottom">
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaHouse className="me-2" size={20} />
                      Kim Như
                    </p>
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaWarehouse className="me-2" size={20} />2 tầng
                    </p>
                    <p className="flex-fill text-center py-2 d-flex align-items-center justify-content-center">
                      <FaUserFriends className="me-2" size={20} />2 người
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <h3
                      className="mb-1"
                      style={{
                        color: "#2C3E50",
                        fontWeight: "700",
                        fontSize: "28px",
                      }}
                    >
                      2.500.000 VNĐ
                    </h3>
                    <div className="mb-3 d-flex justify-content-center">
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                    </div>
                    <p className="mb-4">
                      Phòng trọ mới, trang bị điều hòa, nước nóng, bảo vệ 24/7,
                      gần trường và chợ.
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <Link
                        href="/"
                        className="btn btn-sm btn-primary px-3 btn-package-left"
                        style={{ fontSize: "18px" }}
                      >
                        Chi tiết
                      </Link>
                      <Link
                        href="/payment"
                        className="btn btn-sm btn-primary px-3 btn-package-right"
                        style={{ fontSize: "18px" }}
                      >
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src={PackageImage1.src} alt="" />
                  </div>
                  <div className="d-flex border-bottom">
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaHouse className="me-2" size={20} />
                      Mai Trâm
                    </p>
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaWarehouse className="me-2" size={20} />2 tầng
                    </p>
                    <p className="flex-fill text-center py-2 d-flex align-items-center justify-content-center">
                      <FaUserFriends className="me-2" size={20} />3 người
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <h3
                      className="mb-1"
                      style={{
                        color: "#2C3E50",
                        fontWeight: "700",
                        fontSize: "28px",
                      }}
                    >
                      3.000.000 VNĐ
                    </h3>
                    <div className="mb-3 d-flex justify-content-center">
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                    </div>
                    <p className="mb-4">
                      Phòng trọ mới xây, đầy đủ tiện nghi, an ninh tốt, gần
                      trung tâm, phù hợp cho sinh viên.
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <Link
                        href="/"
                        className="btn btn-sm btn-primary px-3 btn-package-left"
                        style={{ fontSize: "18px" }}
                      >
                        Chi tiết
                      </Link>
                      <Link
                        href="/payment"
                        className="btn btn-sm btn-primary px-3 btn-package-right"
                        style={{ fontSize: "18px" }}
                      >
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img
                      className="img-fluid"
                      src={PackageImage2.src}
                      alt=""
                      height={283}
                    />
                  </div>
                  <div className="d-flex border-bottom">
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaHouse className="me-2" size={20} />
                      Minh Thư
                    </p>
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaWarehouse className="me-2" size={20} />2 tầng
                    </p>
                    <p className="flex-fill text-center py-2 d-flex align-items-center justify-content-center">
                      <FaUserFriends className="me-2" size={20} />2 người
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <h3
                      className="mb-1"
                      style={{
                        color: "#2C3E50",
                        fontWeight: "700",
                        fontSize: "28px",
                      }}
                    >
                      2.800.000 VNĐ
                    </h3>
                    <div className="mb-3 d-flex justify-content-center">
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                    </div>
                    <p className="mb-4">
                      Phòng trọ thoáng mát, wifi miễn phí, nội thất cơ bản, vị
                      trí thuận tiện.
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <Link
                        href="/"
                        className="btn btn-sm btn-primary px-3 btn-package-left"
                        style={{ fontSize: "18px" }}
                      >
                        Chi tiết
                      </Link>
                      <Link
                        href="/payment"
                        className="btn btn-sm btn-primary px-3 btn-package-right"
                        style={{ fontSize: "18px" }}
                      >
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src={PackageImage3.src} alt="" />
                  </div>
                  <div className="d-flex border-bottom">
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaHouse className="me-2" size={20} />
                      Kim Như
                    </p>
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaWarehouse className="me-2" size={20} />2 tầng
                    </p>
                    <p className="flex-fill text-center py-2 d-flex align-items-center justify-content-center">
                      <FaUserFriends className="me-2" size={20} />2 người
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <h3
                      className="mb-1"
                      style={{
                        color: "#2C3E50",
                        fontWeight: "700",
                        fontSize: "28px",
                      }}
                    >
                      2.500.000 VNĐ
                    </h3>
                    <div className="mb-3 d-flex justify-content-center">
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                    </div>
                    <p className="mb-4">
                      Phòng trọ mới, trang bị điều hòa, nước nóng, bảo vệ 24/7,
                      gần trường và chợ.
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <Link
                        href="/"
                        className="btn btn-sm btn-primary px-3 btn-package-left"
                        style={{ fontSize: "18px" }}
                      >
                        Chi tiết
                      </Link>
                      <Link
                        href="/payment"
                        className="btn btn-sm btn-primary px-3 btn-package-right"
                        style={{ fontSize: "18px" }}
                      >
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src={PackageImage1.src} alt="" />
                  </div>
                  <div className="d-flex border-bottom">
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaHouse className="me-2" size={20} />
                      Mai Trâm
                    </p>
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaWarehouse className="me-2" size={20} />2 tầng
                    </p>
                    <p className="flex-fill text-center py-2 d-flex align-items-center justify-content-center">
                      <FaUserFriends className="me-2" size={20} />3 người
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <h3
                      className="mb-1"
                      style={{
                        color: "#2C3E50",
                        fontWeight: "700",
                        fontSize: "28px",
                      }}
                    >
                      3.000.000 VNĐ
                    </h3>
                    <div className="mb-3 d-flex justify-content-center">
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                    </div>
                    <p className="mb-4">
                      Phòng trọ mới xây, đầy đủ tiện nghi, an ninh tốt, gần
                      trung tâm, phù hợp cho sinh viên.
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <Link
                        href="/"
                        className="btn btn-sm btn-primary px-3 btn-package-left"
                        style={{ fontSize: "18px" }}
                      >
                        Chi tiết
                      </Link>
                      <Link
                        href="/payment"
                        className="btn btn-sm btn-primary px-3 btn-package-right"
                        style={{ fontSize: "18px" }}
                      >
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img
                      className="img-fluid"
                      src={PackageImage2.src}
                      alt=""
                      height={283}
                    />
                  </div>
                  <div className="d-flex border-bottom">
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaHouse className="me-2" size={20} />
                      Minh Thư
                    </p>
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaWarehouse className="me-2" size={20} />2 tầng
                    </p>
                    <p className="flex-fill text-center py-2 d-flex align-items-center justify-content-center">
                      <FaUserFriends className="me-2" size={20} />2 người
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <h3
                      className="mb-1"
                      style={{
                        color: "#2C3E50",
                        fontWeight: "700",
                        fontSize: "28px",
                      }}
                    >
                      2.800.000 VNĐ
                    </h3>
                    <div className="mb-3 d-flex justify-content-center">
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                    </div>
                    <p className="mb-4">
                      Phòng trọ thoáng mát, wifi miễn phí, nội thất cơ bản, vị
                      trí thuận tiện.
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <Link
                        href="/"
                        className="btn btn-sm btn-primary px-3 btn-package-left"
                        style={{ fontSize: "18px" }}
                      >
                        Chi tiết
                      </Link>
                      <Link
                        href="/payment"
                        className="btn btn-sm btn-primary px-3 btn-package-right"
                        style={{ fontSize: "18px" }}
                      >
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src={PackageImage3.src} alt="" />
                  </div>
                  <div className="d-flex border-bottom">
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaHouse className="me-2" size={20} />
                      Kim Như
                    </p>
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaWarehouse className="me-2" size={20} />2 tầng
                    </p>
                    <p className="flex-fill text-center py-2 d-flex align-items-center justify-content-center">
                      <FaUserFriends className="me-2" size={20} />2 người
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <h3
                      className="mb-1"
                      style={{
                        color: "#2C3E50",
                        fontWeight: "700",
                        fontSize: "28px",
                      }}
                    >
                      2.500.000 VNĐ
                    </h3>
                    <div className="mb-3 d-flex justify-content-center">
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                    </div>
                    <p className="mb-4">
                      Phòng trọ mới, trang bị điều hòa, nước nóng, bảo vệ 24/7,
                      gần trường và chợ.
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <Link
                        href="/"
                        className="btn btn-sm btn-primary px-3 btn-package-left"
                        style={{ fontSize: "18px" }}
                      >
                        Chi tiết
                      </Link>
                      <Link
                        href="/payment"
                        className="btn btn-sm btn-primary px-3 btn-package-right"
                        style={{ fontSize: "18px" }}
                      >
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src={PackageImage1.src} alt="" />
                  </div>
                  <div className="d-flex border-bottom">
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaHouse className="me-2" size={20} />
                      Mai Trâm
                    </p>
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaWarehouse className="me-2" size={20} />2 tầng
                    </p>
                    <p className="flex-fill text-center py-2 d-flex align-items-center justify-content-center">
                      <FaUserFriends className="me-2" size={20} />3 người
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <h3
                      className="mb-1"
                      style={{
                        color: "#2C3E50",
                        fontWeight: "700",
                        fontSize: "28px",
                      }}
                    >
                      3.000.000 VNĐ
                    </h3>
                    <div className="mb-3 d-flex justify-content-center">
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                    </div>
                    <p className="mb-4">
                      Phòng trọ mới xây, đầy đủ tiện nghi, an ninh tốt, gần
                      trung tâm, phù hợp cho sinh viên.
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <Link
                        href="/"
                        className="btn btn-sm btn-primary px-3 btn-package-left"
                        style={{ fontSize: "18px" }}
                      >
                        Chi tiết
                      </Link>
                      <Link
                        href="/payment"
                        className="btn btn-sm btn-primary px-3 btn-package-right"
                        style={{ fontSize: "18px" }}
                      >
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img
                      className="img-fluid"
                      src={PackageImage2.src}
                      alt=""
                      height={283}
                    />
                  </div>
                  <div className="d-flex border-bottom">
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaHouse className="me-2" size={20} />
                      Minh Thư
                    </p>
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaWarehouse className="me-2" size={20} />2 tầng
                    </p>
                    <p className="flex-fill text-center py-2 d-flex align-items-center justify-content-center">
                      <FaUserFriends className="me-2" size={20} />2 người
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <h3
                      className="mb-1"
                      style={{
                        color: "#2C3E50",
                        fontWeight: "700",
                        fontSize: "28px",
                      }}
                    >
                      2.800.000 VNĐ
                    </h3>
                    <div className="mb-3 d-flex justify-content-center">
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                    </div>
                    <p className="mb-4">
                      Phòng trọ thoáng mát, wifi miễn phí, nội thất cơ bản, vị
                      trí thuận tiện.
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <Link
                        href="/"
                        className="btn btn-sm btn-primary px-3 btn-package-left"
                        style={{ fontSize: "18px" }}
                      >
                        Chi tiết
                      </Link>
                      <Link
                        href="/payment"
                        className="btn btn-sm btn-primary px-3 btn-package-right"
                        style={{ fontSize: "18px" }}
                      >
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src={PackageImage3.src} alt="" />
                  </div>
                  <div className="d-flex border-bottom">
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaHouse className="me-2" size={20} />
                      Kim Như
                    </p>
                    <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                      <FaWarehouse className="me-2" size={20} />2 tầng
                    </p>
                    <p className="flex-fill text-center py-2 d-flex align-items-center justify-content-center">
                      <FaUserFriends className="me-2" size={20} />2 người
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <h3
                      className="mb-1"
                      style={{
                        color: "#2C3E50",
                        fontWeight: "700",
                        fontSize: "28px",
                      }}
                    >
                      2.500.000 VNĐ
                    </h3>
                    <div className="mb-3 d-flex justify-content-center">
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                      <FaStar color="#86b817" />
                    </div>
                    <p className="mb-4">
                      Phòng trọ mới, trang bị điều hòa, nước nóng, bảo vệ 24/7,
                      gần trường và chợ.
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <Link
                        href="/"
                        className="btn btn-sm btn-primary px-3 btn-package-left"
                        style={{ fontSize: "18px" }}
                      >
                        Chi tiết
                      </Link>
                      <Link
                        href="/payment"
                        className="btn btn-sm btn-primary px-3 btn-package-right"
                        style={{ fontSize: "18px" }}
                      >
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Package End */}
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

export default ListPage;
