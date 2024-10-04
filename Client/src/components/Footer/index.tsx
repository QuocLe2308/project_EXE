import Link from "next/link";
import {
  FaGreaterThan,
  FaPhoneAlt,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import GalleryImage1 from "@/assets/images/gallery/1.jpg";
import GalleryImage2 from "@/assets/images/gallery/2.jpg";
import GalleryImage3 from "@/assets/images/gallery/3.jpg";
import GalleryImage4 from "@/assets/images/gallery/4.jpg";
import GalleryImage5 from "@/assets/images/gallery/5.jpg";
import GalleryImage6 from "@/assets/images/gallery/6.jpg";

const Footer = () => {
  const router = useRouter();
  const [routeActive, setRouteActive] = useState<any>(undefined);

  const routeChange = [
    {
      route: "/",
    },
    {
      route: "/contact",
      title: "Liên hệ",
      urlDescription: "Liên hệ",
    },
    {
      route: "/list",
      title: "Danh sách trọ",
      urlDescription: "Danh sách",
    },
    {
      route: "/payment",
      title: "Thanh toán",
      urlDescription: "Thanh toán",
    },
  ];

  useEffect(() => {
    const value: any = routeChange.find((i) => i.route === router.pathname);
    setRouteActive(value);
  }, [router.pathname]);

  return (
    <>
      {routeActive !== undefined && (
        <div>
          {/* Footer Start */}
          <div
            className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
            data-wow-delay="0.1s"
          >
            <div className="container py-5">
              <div className="row g-5">
                <div className="col-lg-3 col-md-6">
                  <h4
                    className="text-white mb-3 font-Nunito"
                    style={{
                      fontSize: "28px",
                      fontWeight: "800",
                    }}
                  >
                    RETstay
                  </h4>
                  <a
                    className="btn btn-link"
                    href=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "18px",
                    }}
                  >
                    <FaGreaterThan
                      style={{
                        fontSize: "12px",
                        marginRight: "10px",
                        width: "10px",
                      }}
                    />
                    Thông Tin
                  </a>
                  <a
                    className="btn btn-link"
                    href=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "18px",
                    }}
                  >
                    <FaGreaterThan
                      style={{
                        fontSize: "12px",
                        marginRight: "10px",
                        width: "10px",
                      }}
                    />
                    Liên Hệ
                  </a>
                  <a
                    className="btn btn-link"
                    href=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "18px",
                    }}
                  >
                    <FaGreaterThan
                      style={{
                        fontSize: "12px",
                        marginRight: "10px",
                        width: "10px",
                      }}
                    />
                    Chính Sách Bảo Mật
                  </a>
                  <a
                    className="btn btn-link"
                    href=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "18px",
                    }}
                  >
                    <FaGreaterThan
                      style={{
                        fontSize: "12px",
                        marginRight: "10px",
                        width: "10px",
                      }}
                    />
                    Điều Khoản & Điều Kiện
                  </a>
                  <a
                    className="btn btn-link"
                    href=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "18px",
                    }}
                  >
                    <FaGreaterThan
                      style={{
                        fontSize: "12px",
                        marginRight: "10px",
                        width: "10px",
                      }}
                    />
                    Câu Hỏi Thường Gặp & Hỗ Trợ
                  </a>
                </div>
                <div className="col-lg-3 col-md-6">
                  <h4
                    className="text-white mb-3 font-Nunito"
                    style={{
                      fontSize: "28px",
                      fontWeight: "800",
                    }}
                  >
                    Liên Hệ
                  </h4>
                  <p
                    className="mb-2"
                    style={{
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaLocationDot size={26} style={{ marginRight: "20px" }} />
                    112 Nguyễn Văn Cừ, An Hòa, Ninh Kiều, Tp.Cần Thơ
                  </p>
                  <p
                    className="mb-2"
                    style={{
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaPhoneAlt size={20} style={{ marginRight: "16px" }} />
                    0909 68 68 68
                  </p>
                  <p
                    className="mb-2"
                    style={{
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IoIosMail size={26} style={{ marginRight: "11px" }} />
                    retstay@gmail.com
                  </p>
                  <div className="d-flex pt-2">
                    <Link
                      className="btn btn-outline-light btn-social"
                      href=""
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      className="btn btn-outline-light btn-social"
                      href=""
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      <FaFacebookF />
                    </Link>
                    <Link
                      className="btn btn-outline-light btn-social"
                      href=""
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      <FaYoutube />
                    </Link>
                    <Link
                      className="btn btn-outline-light btn-social"
                      href=""
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      <FaLinkedinIn />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <h4
                    className="text-white mb-3 font-Nunito"
                    style={{
                      fontSize: "28px",
                      fontWeight: "800",
                    }}
                  >
                    Bộ Sưu Tập
                  </h4>
                  <div className="row g-2 pt-2">
                    <div className="col-4">
                      <img
                        className="img-fluid bg-light p-1"
                        src={GalleryImage1.src}
                        alt=""
                        style={{
                          width: "100px",
                          height: "60px",
                        }}
                      />
                    </div>
                    <div className="col-4">
                      <img
                        className="img-fluid bg-light p-1"
                        src={GalleryImage2.src}
                        alt=""
                        style={{
                          width: "100px",
                          height: "60px",
                        }}
                      />
                    </div>
                    <div className="col-4">
                      <img
                        className="img-fluid bg-light p-1"
                        src={GalleryImage3.src}
                        alt=""
                        style={{
                          width: "100px",
                          height: "60px",
                        }}
                      />
                    </div>
                    <div className="col-4">
                      <img
                        className="img-fluid bg-light p-1"
                        src={GalleryImage4.src}
                        alt=""
                        style={{
                          width: "100px",
                          height: "60px",
                        }}
                      />
                    </div>
                    <div className="col-4">
                      <img
                        className="img-fluid bg-light p-1"
                        src={GalleryImage5.src}
                        alt=""
                        style={{
                          width: "100px",
                          height: "60px",
                        }}
                      />
                    </div>
                    <div className="col-4">
                      <img
                        className="img-fluid bg-light p-1"
                        src={GalleryImage6.src}
                        alt=""
                        style={{
                          width: "100px",
                          height: "60px",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <h4
                    className="text-white mb-3 font-Nunito"
                    style={{
                      fontSize: "28px",
                      fontWeight: "800",
                    }}
                  >
                    Đăng Ký Nhận Thông Tin
                  </h4>
                  <p
                    style={{
                      fontSize: "18px",
                      marginBottom: "20px",
                    }}
                  >
                    Nhận thông báo khi có phòng trọ mới hoặc ưu đãi hấp dẫn mới.
                  </p>
                  <div
                    className="position-relative mx-auto"
                    style={{ maxWidth: "400px" }}
                  >
                    <input
                      className="form-control border-primary w-100 py-3 ps-4 pe-5"
                      type="text"
                      placeholder="Nhập email của bạn"
                    />
                    <button
                      type="button"
                      className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                    >
                      Đăng ký
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="copyright">
                <div className="row">
                  <div
                    className="col-md-6 text-center text-md-start mb-3 mb-md-0"
                    style={{ fontSize: "18px" }}
                  >
                    &copy;{" "}
                    <Link className="border-bottom" href="/">
                      RETstay
                    </Link>
                    , Bản quyền thuộc về.
                    {/* This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. */}
                    Thiết kế bởi{" "}
                    <Link className="border-bottom" href="/">
                      Công Ty cổ phần RETstay.
                    </Link>
                  </div>
                  <div className="col-md-6 text-center text-md-end">
                    <div className="footer-menu">
                      <Link
                        href=""
                        style={{
                          fontSize: "18px",
                        }}
                      >
                        Trang chủ
                      </Link>
                      <Link
                        href=""
                        style={{
                          fontSize: "18px",
                        }}
                      >
                        Chính sách Cookies
                      </Link>
                      <Link
                        href=""
                        style={{
                          fontSize: "18px",
                        }}
                      >
                        Trợ giúp
                      </Link>
                      <Link
                        href=""
                        style={{
                          fontSize: "18px",
                        }}
                      >
                        Câu hỏi thường gặp
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer End  */}
        </div>
      )}
    </>
  );
};

export default Footer;
