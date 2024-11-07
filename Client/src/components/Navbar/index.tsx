import React, { use, useEffect, useState, useContext } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/router";

import logo from "@/assets/images/logo.jpg";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import { UserContext } from "../UserAuth/UserContext";

const Navbar = () => {
  const router = useRouter();
  const [routeActive, setRouteActive] = useState<any>(undefined);
  const context = useContext(UserContext);
  const {user, logout} = context;
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

   console.log("nav bar check >>>>" + user);
  useEffect(() => {
    const value: any = routeChange.find((i) => i.route === router.pathname);
    setRouteActive(value);
  }, [router.pathname]);

  const isActive = (href: string) => {
    return router.pathname === href ? "active" : "";
  };

  // Login-----------------------------------------------------
  const [isCloseLogin, setIsCloseLogin] = useState(false);

  // Register--------------------------------------------------
  const [isCloseRegister, setIsCloseRegister] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        if (window.scrollY > 45) {
          navbar.classList.add("sticky-top", "shadow-sm");
        } else {
          navbar.classList.remove("sticky-top", "shadow-sm");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {routeActive !== undefined && (
        <div>
          {/* TopBar Start  */}
          <div className="container-fluid bg-dark px-5 d-none d-lg-block">
            <div className="row gx-0">
              <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
                <div
                  className="d-inline-flex align-items-center"
                  style={{
                    height: "45px",
                  }}
                >
                  <p className="me-3 text-light icon-text-wrapper">
                    <FaLocationDot className="me-1" />
                    112 Nguyễn Văn Cừ, An Hòa, Ninh Kiều, Tp.Cần Thơ
                  </p>
                  <p className="me-3 text-light icon-text-wrapper">
                    <FaPhoneAlt className="me-2" />
                    0909 68 68 68
                  </p>
                  <p className="text-light icon-text-wrapper">
                    <IoIosMail className="me-2" size={26} />
                    retstay@gmail.com
                  </p>
                </div>
              </div>
              <div className="col-lg-4 text-center text-lg-end">
                <div
                  className="d-inline-flex align-items-center"
                  style={{
                    height: "45px",
                  }}
                >
                  <Link
                    className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                    href=""
                  >
                    <FaTwitter />
                  </Link>
                  <Link
                    className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                    href=""
                  >
                    <FaFacebookF />
                  </Link>
                  <Link
                    className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                    href=""
                  >
                    <FaLinkedinIn />
                  </Link>
                  <Link
                    className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                    href=""
                  >
                    <FaInstagram />
                  </Link>
                  <Link
                    className="btn btn-sm btn-outline-light btn-sm-square rounded-circle"
                    href=""
                  >
                    <FaYoutube />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* TopBar End  */}

          {/* Navbar & Hero Start  */}
          <div className="container-fluid position-relative p-0">
            <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
              <Link href="/" className="navbar-brand p-0">
                <img src={logo.src} alt="Logo" width={80} height={80} />
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="fa fa-bars"></span>
              </button>

              <div className="navbar-link-wrapper" id="navbarCollapse">
                <div className="navbar-nav ms-auto py-0">
                <Link
                    href="/profile"
                    className={`nav-item nav-link ${isActive("/profile")}`}
                  >
                    Thông tin cá nhân
                  </Link>
                <Link
                    href="/list_account"
                    className={`nav-item nav-link ${isActive("/list_account")}`}
                  >
                    Quản lý tài khoản
                  </Link>
                  <Link
                    href="/"
                    className={`nav-item nav-link ${isActive("/")}`}
                  >
                    Trang chủ
                  </Link>
                  <Link
                    href="/list"
                    className={`nav-item nav-link ${isActive("/list")}`}
                  >
                    Danh sách
                  </Link>
                  <Link
                    href="/service"
                    className={`nav-item nav-link ${isActive("/service")}`}
                  >
                    Dịch vụ
                  </Link>
                  <Link
                    href="/contact"
                    className={`nav-item nav-link ${isActive("/contact")}`}
                  >
                    Liên hệ
                  </Link>
                </div>
                <div>
                  {user?.auth ? (
                    <button
                      className="btn btn-primary rounded-pill py-2 px-4"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Đăng xuất
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary rounded-pill py-2 px-4 me-4"
                        onClick={() => {
                          setIsCloseLogin(true);
                        }}
                      >
                        Đăng nhập
                      </button>

                      {isCloseLogin && (
                        <LoginForm
                          isCloseLogin={isCloseLogin}
                          setIsCloseLogin={setIsCloseLogin}
                        />
                      )}

                      <button
                        className="btn btn-primary rounded-pill py-2 px-4"
                        onClick={() => {
                          setIsCloseRegister(true);
                        }}
                      >
                        Đăng ký
                      </button>

                      {isCloseRegister && (
                        <RegisterForm
                          isCloseRegister={isCloseRegister}
                          setIsCloseRegister={setIsCloseRegister}
                        />
                      )}
                    </>
                  )}
                </div>             
              </div>
            </nav>

            <div className="container-fluid bg-primary py-5 mb-5 hero-header">
              <div className="container py-5">
                <div className="row justify-content-center py-5">
                  <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                    <h1 className="bg-hero-title display-3 text-white mb-3 animated slideInDown font-Nunito">
                      {router.pathname === "/"
                        ? "Tận hưởng không gian sống tiện nghi cùng chúng tôi"
                        : routeActive?.title}
                    </h1>

                    {router.pathname !== "/" && (
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-center">
                          <li className="breadcrumb-item">
                            <p
                              style={{
                                color: "#86B817",
                                fontSize: "20px",
                              }}
                            >
                              Trang chủ
                            </p>
                          </li>
                          <li
                            className="breadcrumb-item text-white active"
                            aria-current="page"
                            style={{
                              fontSize: "20px",
                            }}
                          >
                            {routeActive?.urlDescription}
                          </li>
                        </ol>
                      </nav>
                    )}

                    {router.pathname === "/" && (
                      <p className="fs-4 text-white mb-4 animated slideInDown">
                        Phòng trọ rộng rãi, thoáng mát, đảm bảo an ninh và tiện
                        ích đầy đủ cho cuộc sống hàng ngày
                      </p>
                    )}

                    {router.pathname === "/" && (
                      <div className="position-relative w-75 mx-auto animated slideInDown">
                        <input
                          className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                          type="text"
                          placeholder="Ví dụ: Quận Ninh Kiều, Tp.Cần Thơ"
                        />
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2"
                          style={{
                            marginTop: "7px",
                          }}
                        >
                          Tìm kiếm
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Navbar & Hero End  */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
