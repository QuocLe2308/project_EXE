import React, { useEffect } from "react";
import {
  FaArrowRight,
  FaComments,
  FaDollarSign,
  FaFacebookF,
  FaGlobe,
  FaHouse,
  FaInstagram,
  FaMapLocationDot,
  FaNewspaper,
  FaStar,
  FaTwitter,
  FaUserGear,
  FaWarehouse,
} from "react-icons/fa6";
import { RiAdvertisementFill } from "react-icons/ri";
import { MdPayments } from "react-icons/md";
import {
  FaLongArrowAltUp,
  FaSearch,
  FaShippingFast,
  FaUserFriends,
} from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import Link from "next/link";

import TestimonialsCarousel from "@/components/Carousel";
import AboutImage from "@/assets/images/about/about.jpg";
import FeatureImage1 from "@/assets/images/feature/1.jpg";
import FeatureImage2 from "@/assets/images/feature/2.jpg";
import FeatureImage3 from "@/assets/images/feature/3.jpg";
import FeatureImage4 from "@/assets/images/feature/4.jpg";
import PackageImage1 from "@/assets/images/package/1.jpg";
import PackageImage2 from "@/assets/images/package/2.jpg";
import PackageImage3 from "@/assets/images/package/3.jpg";
import TeamImage1 from "@/assets/images/team/team-1.jpg";
import TeamImage2 from "@/assets/images/team/team-2.jpg";
import TeamImage3 from "@/assets/images/team/team-3.jpg";
import TeamImage4 from "@/assets/images/team/team-4.jpg";

const Index: React.FC = () => {
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

  // Dropdown on mouse hover
  const handleDropdownHover = (e: React.MouseEvent) => {
    const dropdown = e.currentTarget as HTMLElement;
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    if (dropdownMenu) {
      dropdown.classList.add("show");
      dropdown.setAttribute("aria-expanded", "true");
      dropdownMenu.classList.add("show");
    }
  };

  const handleDropdownLeave = (e: React.MouseEvent) => {
    const dropdown = e.currentTarget as HTMLElement;
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    if (dropdownMenu) {
      dropdown.classList.remove("show");
      dropdown.setAttribute("aria-expanded", "false");
      dropdownMenu.classList.remove("show");
    }
  };

  //Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
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

      {/* About Start  */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{
                minHeight: "400px",
              }}
            >
              <div className="position-relative h-100">
                <img
                  className="img-fluid position-absolute w-100 h-100"
                  src={AboutImage.src}
                  alt=""
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <h6
                className="section-title bg-white text-start pe-3 font-Nunito"
                style={{
                  fontSize: "20px",
                  color: "#86b817",
                  fontWeight: "800",
                }}
              >
                Thông tin
              </h6>
              <h1
                className="mb-4 font-Nunito"
                style={{
                  color: "#2C3E50",
                  fontSize: "38px",
                  fontWeight: "800",
                }}
              >
                Chào mừng đến với{" "}
                <span
                  style={{
                    color: "#86b817",
                  }}
                >
                  RETstay
                </span>
              </h1>
              <h1 className="mb-4">
                Chúng tôi tự hào mang đến một nền tảng trực tuyến tiện lợi, nơi
                các chủ trọ có thể dễ dàng đăng ký và quản lý thông tin phòng
                trọ của mình. Đồng thời, người thuê trọ có thể tìm kiếm và đặt
                phòng một cách nhanh chóng và hiệu quả.
              </h1>
              <h1 className="mb-4">Dịch Vụ Của Chúng Tôi:</h1>
              <div className="row gy-2 gx-4 mb-4">
                <div className="col-sm-6 about-us-item">
                  <FaArrowRight className="me-3" size={80} color="#86b817" />
                  <h1 className="mb-0">
                    Đăng Ký Trọ Dễ Dàng: Các chủ trọ có thể đăng tải thông tin
                    phòng trọ chỉ với vài bước đơn giản.
                  </h1>
                </div>

                <div className="col-sm-6 about-us-item">
                  <FaArrowRight className="me-3" size={80} color="#86b817" />
                  <h1 className="mb-0">
                    Tìm Kiếm Phòng Trọ: Người dùng có thể tìm kiếm phòng trọ dựa
                    trên vị trí, giá cả và nhiều tiêu chí khác.
                  </h1>
                </div>

                <div className="col-sm-6 about-us-item">
                  <FaArrowRight className="me-3" size={80} color="#86b817" />
                  <h1 className="mb-0">
                    5 Đặt Phòng Nhanh Chóng: Hệ thống giúp bạn đặt phòng chỉ
                    trong vài phút, đảm bảo sự tiện lợi tối đa.
                  </h1>
                </div>

                <div className="col-sm-6 about-us-item">
                  <FaArrowRight className="me-3" size={80} color="#86b817" />
                  <h1 className="mb-0">
                    Hỗ Trợ 24/7: Chúng tôi luôn sẵn sàng hỗ trợ cả chủ trọ và
                    người thuê trọ mọi lúc, mọi nơi.
                  </h1>
                </div>

                <div className="mt-4">
                  <h1 className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>Tại{" "}
                    {""}
                    <span
                      style={{
                        color: "#86b817",
                        fontWeight: 600,
                      }}
                    >
                      RETstay
                    </span>
                    , chúng tôi cam kết tạo ra một môi trường đáng tin cậy và dễ
                    dàng cho cả người cho thuê và người thuê. Hãy bắt đầu hành
                    trình tìm kiếm nơi ở lý tưởng của bạn ngay hôm nay!
                  </h1>
                </div>
              </div>
              <Link
                className="btn btn-primary py-3 px-5 mt-2"
                href="/"
                style={{ fontSize: "18px" }}
              >
                Chi tiết
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* Service Start  */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <div className="d-flex justify-content-center">
              <div className="section-title-before"></div>
              <h6
                className="  bg-white text-center text-uppercase px-3 font-Nunito"
                style={{
                  fontSize: "20px",
                  color: "#86b817",
                  fontWeight: "800",
                }}
              >
                Dịch vụ
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
              Các dịch vụ của chúng tôi
            </h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <FaUserGear size={60} color="#86b817" className="mb-3" />
                  <h5
                    className="mb-2"
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#2C3E50",
                    }}
                  >
                    Đăng Ký
                  </h5>
                  <p>
                    Chủ trọ đăng tin dễ dàng và quản lý, chỉnh sửa, xóa tin đăng
                    một cách linh hoạt.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <FaSearch size={60} color="#86b817" className="mb-3" />
                  <h5
                    className="mb-2"
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#2C3E50",
                    }}
                  >
                    Tìm Kiếm
                  </h5>
                  <p>
                    Tìm kiếm phòng trọ theo vị trí, giá cả, tiện nghi một cách
                    nhanh chóng và chính xác.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <FaMapLocationDot
                    size={60}
                    color="#86b817"
                    className="mb-3"
                  />
                  <h5
                    className="mb-2"
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#2C3E50",
                    }}
                  >
                    Vị trí
                  </h5>
                  <p>
                    Hiển thị các phòng trọ gần vị trí hiện tại của người dùng để
                    lựa chọn dễ dàng.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <FaComments size={60} color="#86b817" className="mb-3" />
                  <h5
                    className="mb-2"
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#2C3E50",
                    }}
                  >
                    Đánh Giá
                  </h5>
                  <p>
                    Người thuê và chủ trọ có thể đánh giá, nhận xét để tăng độ
                    tin cậy.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <FaNewspaper size={60} color="#86b817" className="mb-3" />
                  <h5
                    className="mb-2"
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#2C3E50",
                    }}
                  >
                    Thông Báo Tin
                  </h5>
                  <p>
                    Bạn sẽ nhận thông báo khi có phòng trọ mới được đăng ngay
                    lập tức.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <MdPayments size={60} color="#86b817" className="mb-3" />
                  <h5
                    className="mb-2"
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#2C3E50",
                    }}
                  >
                    Thanh Toán
                  </h5>
                  <p>
                    Hỗ trợ thanh toán tiền cọc, tiền thuê trọ an toàn qua MoMo,
                    ZaloPay, thẻ tín dụng.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <RiAdvertisementFill
                    size={60}
                    color="#86b817"
                    className="mb-3"
                  />
                  <h5
                    className="mb-2"
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#2C3E50",
                    }}
                  >
                    Quảng Cáo
                  </h5>
                  <p>
                    Nâng cấp tin đăng thành "tin nổi bật" để thu hút nhiều người
                    thuê hơn.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <IoMdHelpCircle size={60} color="#86b817" className="mb-3" />
                  <h5
                    className="mb-2"
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#2C3E50",
                    }}
                  >
                    Hỗ Trợ 24/7
                  </h5>
                  <p>
                    Cung cấp hỗ trợ liên tục cho người dùng trong mọi khâu của
                    quá trình thuê trọ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Service End  */}

      {/* Feature Start  */}
      <div className="container-xxl py-5 destination">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <div className="d-flex justify-content-center">
              <div className="section-title-before"></div>
              <h6
                className="section-title-both bg-white px-3 font-Nunito"
                style={{
                  fontSize: "20px",
                  color: "#86b817",
                  fontWeight: "800",
                }}
              >
                Đặc trưng
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
              Trọ đặc trưng
            </h1>
          </div>
          <div className="row g-3">
            <div className="col-lg-7 col-md-6">
              <div className="row g-3">
                <div
                  className="col-lg-12 col-md-12 wow zoomIn"
                  data-wow-delay="0.1s"
                >
                  <Link
                    className="position-relative d-block overflow-hidden"
                    href="/"
                  >
                    <img className="img-fluid" src={FeatureImage1.src} alt="" />
                    <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                      Giảm 30%
                    </div>
                    <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                      Mai Trâm
                    </div>
                  </Link>
                </div>
                <div
                  className="col-lg-6 col-md-12 wow zoomIn"
                  data-wow-delay="0.3s"
                >
                  <Link
                    className="position-relative d-block overflow-hidden"
                    href="/"
                  >
                    <img className="img-fluid" src={FeatureImage2.src} alt="" />
                    <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                      Giảm 25%
                    </div>
                    <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                      Minh Thư
                    </div>
                  </Link>
                </div>
                <div
                  className="col-lg-6 col-md-12 wow zoomIn"
                  data-wow-delay="0.5s"
                >
                  <Link
                    className="position-relative d-block overflow-hidden"
                    href="/"
                  >
                    <img className="img-fluid" src={FeatureImage3.src} alt="" />
                    <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                      Giảm 35%
                    </div>
                    <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                      Như Quỳnh
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-5 col-md-6 wow zoomIn"
              data-wow-delay="0.7s"
              style={{ minHeight: "350px" }}
            >
              <Link
                className="position-relative d-block h-100 overflow-hidden"
                href="/"
              >
                <img
                  className="img-fluid position-absolute w-100 h-100"
                  src={FeatureImage4.src}
                  alt=""
                  style={{
                    objectFit: "cover",
                  }}
                />
                <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                  Giảm 20%
                </div>
                <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                  Kim Như
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Feature Start */}

      {/* Package Start */}
      <div className="container-xxl py-5">
        <div className="container">
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
                Gói
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
              Những Gói Đặc Biệt
            </h1>
          </div>
          <div className="row g-4 justify-content-center">
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
                    Phòng trọ mới xây, đầy đủ tiện nghi, an ninh tốt, gần trung
                    tâm, phù hợp cho sinh viên.
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
                      href="/"
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
                    Phòng trọ thoáng mát, wifi miễn phí, nội thất cơ bản, vị trí
                    thuận tiện.
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
                      href="/"
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
                      href="/"
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

      {/* Booking Start */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="booking p-5">
            <div
              className="row g-5 align-items-center"
              style={{ marginTop: "-12px", marginBottom: "10px" }}
            >
              <div className="col-md-6 text-white">
                <h6
                  className="text-white text-uppercase font-Nunito"
                  style={{
                    marginTop: 0,
                    marginBottom: "1rem",
                    fontWeight: 800,
                    lineHeight: 1.2,
                  }}
                >
                  Đặt Phòng Trọ
                </h6>
                <h1
                  className="text-white mb-4 font-Nunito"
                  style={{
                    fontSize: "38px",
                    marginTop: 0,
                    marginBottom: "0.5rem",
                    fontWeight: 800,
                    lineHeight: 1.2,
                  }}
                >
                  Đặt Phòng Trực Tuyến
                </h1>
                <p className="mb-5">
                  Bạn có thể dễ dàng tìm kiếm và đặt phòng trọ một cách nhanh
                  chóng trên hệ thống của chúng tôi. Mọi thông tin về phòng trọ
                  sẽ được cập nhật chi tiết để bạn có thể lựa chọn nơi ở phù hợp
                  nhất.
                </p>
                <p className="mb-4">
                  Tìm kiếm phòng trọ theo nhu cầu của bạn và đặt phòng ngay hôm
                  nay để giữ chỗ. Hãy yên tâm vì chúng tôi luôn đảm bảo thông
                  tin chính xác và dịch vụ tốt nhất từ các chủ trọ đáng tin cậy.
                </p>
                <Link
                  className="btn btn-outline-light py-3 px-5 mt-2"
                  href="/"
                  style={{ fontSize: "22px" }}
                >
                  Chi tiết
                </Link>
              </div>
              <div className="col-md-6">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control bg-transparent"
                          id="name"
                          placeholder="Your Name"
                          style={{
                            height: "66px",
                            color: "#ccc",
                            paddingTop: "32px",
                          }}
                        />
                        <label htmlFor="name">Họ & Tên</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control bg-transparent"
                          id="email"
                          placeholder="Your Email"
                          style={{
                            height: "66px",
                            color: "#ccc",
                            paddingTop: "32px",
                          }}
                        />
                        <label htmlFor="email">Email</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="form-floating date"
                        id="date3"
                        data-target-input="nearest"
                      >
                        <input
                          type="datetime-local"
                          className="form-control bg-transparent datetimepicker-input"
                          id="datetime"
                          placeholder=""
                          style={{
                            height: "66px",
                            color: "#ccc",
                            paddingTop: "32px",
                          }}
                        />
                        <label htmlFor="datetime">Ngày & Giờ</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          className="form-select bg-transparent"
                          id="select1"
                          style={{
                            height: "66px",
                            color: "#ccc",
                            paddingTop: "32px",
                          }}
                        >
                          <option value="" disabled selected hidden>
                            Chọn Thông Tin Trọ
                          </option>
                          <option value="2">Minh Thư</option>
                          <option value="3">Kim Như</option>
                          <option value="4">Như Quỳnh</option>
                        </select>
                        <label htmlFor="select1">Tên Trọ</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control bg-transparent"
                          placeholder="Special Request"
                          id="message"
                          style={{
                            height: "160px",
                            color: "#ccc",
                            paddingTop: "32px",
                          }}
                        ></textarea>
                        <label htmlFor="message">Lời Nhắn</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-outline-light w-100 py-3"
                        type="submit"
                        style={{ fontSize: "20px" }}
                      >
                        Đặt ngay
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Booking Start  */}

      {/* Process Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center pb-4 wow fadeInUp" data-wow-delay="0.1s">
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
                Quy Trình
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
              Dễ Dàng Trong 3 Bước
            </h1>
          </div>
          <div className="row gy-5 gx-4 justify-content-center">
            <div
              className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div
                className="position-relative pt-5 pb-4 px-4 "
                style={{
                  minHeight: "310px",
                  borderWidth: "1px",
                  borderColor: "#86B817",
                }}
              >
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{
                    width: "120px",
                    height: "120px",
                    backgroundColor: "#86B817",
                  }}
                >
                  <FaGlobe fontSize={56} color="#fff" />
                </div>
                <h5
                  className="font-Nunito"
                  style={{
                    marginTop: "36px",
                    color: "#2C3E50",
                    fontSize: "26px",
                    fontWeight: "800",
                    marginBottom: "16px",
                  }}
                >
                  Chọn Phòng Trọ
                </h5>
                <hr
                  className="w-25 mx-auto mb-1"
                  style={{ backgroundColor: "#86b817", height: "1.8px" }}
                />
                <hr
                  className="w-50 mx-auto mt-0"
                  style={{
                    backgroundColor: "#86b817",
                    height: "1.8px",
                    marginBottom: "16px",
                  }}
                />
                <p className="mb-0">
                  Tìm kiếm phòng trọ phù hợp với nhu cầu từ danh sách các phòng
                  có sẵn. Xem chi tiết thông tin và hình ảnh của từng phòng để
                  đưa ra quyết định chính xác.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div
                className="position-relative pt-5 pb-4 px-4"
                style={{
                  minHeight: "310px",
                  borderWidth: "1px",
                  borderColor: "#86B817",
                }}
              >
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{
                    width: "120px",
                    height: "120px",
                    backgroundColor: "#86B817",
                  }}
                >
                  <FaDollarSign fontSize={56} color="#fff" />
                </div>
                <h5
                  className="font-Nunito"
                  style={{
                    marginTop: "36px",
                    color: "#2C3E50",
                    fontSize: "26px",
                    fontWeight: "800",
                    marginBottom: "16px",
                  }}
                >
                  Thanh Toán Online
                </h5>
                <hr
                  className="w-25 mx-auto mb-1"
                  style={{ backgroundColor: "#86b817", height: "1.8px" }}
                />
                <hr
                  className="w-50 mx-auto  mt-0"
                  style={{
                    backgroundColor: "#86b817",
                    height: "1.8px",
                    marginBottom: "16px",
                  }}
                />
                <p className="mb-0">
                  Tiến hành thanh toán tiền đặt cọc hoặc tiền thuê tháng đầu
                  tiên một cách an toàn và tiện lợi thông qua hệ thống thanh
                  toán trực tuyến.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div
                className="position-relative pt-5 pb-4 px-4"
                style={{
                  minHeight: "310px",
                  borderWidth: "1px",
                  borderColor: "#86B817",
                }}
              >
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{
                    width: "120px",
                    height: "120px",
                    backgroundColor: "#86B817",
                  }}
                >
                  <FaShippingFast fontSize={56} color="#fff" />
                </div>
                <h5
                  className="font-Nunito"
                  style={{
                    marginTop: "36px",
                    color: "#2C3E50",
                    fontSize: "26px",
                    fontWeight: "800",
                    marginBottom: "16px",
                  }}
                >
                  Dọn Vào Ở Ngay
                </h5>
                <hr
                  className="w-25 mx-auto  mb-1"
                  style={{ backgroundColor: "#86b817", height: "1.8px" }}
                />
                <hr
                  className="w-50 mx-auto  mt-0"
                  style={{
                    backgroundColor: "#86b817",
                    height: "1.8px",
                    marginBottom: "16px",
                  }}
                />
                <p className="mb-0">
                  Sau khi thanh toán thành công, bạn có thể chuyển đến phòng trọ
                  đã chọn ngay và tận hưởng không gian sống mới.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Process Start  */}

      {/* Team Start */}
      <div className="container-xxl py-5">
        <div className="container">
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
                Nhân Viên Hỗ Trợ
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
              Thông Tin Nhân Viên Hỗ Trợ
            </h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="team-item pb-2">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={TeamImage1.src} alt="" />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a className="btn btn-square mx-1" href="">
                    <FaFacebookF />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <FaTwitter />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <FaInstagram />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5
                    className="mb-1 font-Nunito"
                    style={{
                      color: "#2C3E50",
                      fontSize: "22px",
                      fontWeight: "800",
                    }}
                  >
                    Tạ Quang Khôi
                  </h5>
                  <p>Bộ phận Kĩ Thuật</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="team-item pb-2">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={TeamImage2.src} alt="" />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a className="btn btn-square mx-1" href="">
                    <FaFacebookF />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <FaTwitter />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <FaInstagram />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5
                    className="mb-1 font-Nunito"
                    style={{
                      color: "#2C3E50",
                      fontSize: "22px",
                      fontWeight: "800",
                    }}
                  >
                    Nguyễn Mai Trâm
                  </h5>
                  <p>Bộ phận Marketing</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="team-item pb-2">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={TeamImage3.src} alt="" />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a className="btn btn-square mx-1" href="">
                    <FaFacebookF />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <FaTwitter />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <FaInstagram />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5
                    className="mb-1 font-Nunito"
                    style={{
                      color: "#2C3E50",
                      fontSize: "22px",
                      fontWeight: "800",
                    }}
                  >
                    Nguyễn Quốc Khánh
                  </h5>
                  <p>Bộ phận CSKH</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="team-item pb-2">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={TeamImage4.src} alt="" />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a className="btn btn-square mx-1" href="">
                    <FaFacebookF />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <FaTwitter />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <FaInstagram />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5
                    className="mb-1 font-Nunito"
                    style={{
                      color: "#2C3E50",
                      fontSize: "22px",
                      fontWeight: "800",
                    }}
                  >
                    Nguyễn Phương Thảo
                  </h5>
                  <p>Giám Đốc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End  */}

      {/* Testimonial Start  */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="text-center">
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
                Nhận Xét Và Đánh Giá
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
              Nhận Xét Của Người Dùng!!!
            </h1>
          </div>

          <TestimonialsCarousel />
        </div>
      </div>
      {/* Testimonial End  */}

      {/* Back to Top  */}
      <button
        className="btn btn-lg btn-primary btn-lg-square back-to-top"
        onClick={scrollToTop}
      >
        <FaLongArrowAltUp />
      </button>
    </div>
  );
};

export default Index;
