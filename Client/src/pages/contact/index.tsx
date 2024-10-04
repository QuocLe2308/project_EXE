import { useEffect } from "react";
import { FaLongArrowAltUp, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMailOpen } from "react-icons/io";

const ContactPage = () => {
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

      {/* Contact Start  */}
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
                Liên Hệ
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
              Liên Hệ Với Chúng Tôi Để Được Hỗ Trợ
            </h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <h5
                className="mb-3 font-Nunito"
                style={{
                  color: "#2C3E50",
                  fontSize: "26px",
                  fontWeight: "800",
                }}
              >
                Kết Nối Với Chúng Tôi
              </h5>
              <p className="mb-4">
                Nếu bạn có bất kỳ câu hỏi nào về việc thuê phòng, vui lòng liên
                hệ với chúng tôi. Chúng tôi sẽ phản hồi trong thời gian sớm
                nhất.
              </p>
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#86B817",
                  }}
                >
                  <FaLocationDot color="#fff" />
                </div>
                <div className="ms-3">
                  <h5
                    className="font-Nunito"
                    style={{
                      color: "#86B817",
                      fontSize: "26px",
                      fontWeight: "800",
                    }}
                  >
                    Văn phòng
                  </h5>
                  <p className="mb-0">
                    112 Nguyễn Văn Cừ, An Hòa, Ninh Kiều, Tp.Cần Thơ
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#86B817",
                  }}
                >
                  <FaPhoneAlt color={"#fff"} />
                </div>
                <div className="ms-3">
                  <h5
                    className="font-Nunito"
                    style={{
                      color: "#86B817",
                      fontSize: "26px",
                      fontWeight: "800",
                    }}
                  >
                    Số điện thoại
                  </h5>
                  <p className="mb-0">0909 68 68 68</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#86B817",
                  }}
                >
                  <IoIosMailOpen color={"#fff"} size={22} />
                </div>
                <div className="ms-3">
                  <h5
                    className="font-Nunito"
                    style={{
                      color: "#86B817",
                      fontSize: "26px",
                      fontWeight: "800",
                    }}
                  >
                    Email
                  </h5>
                  <p className="mb-0">retstay@gmail.com</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <iframe
                className="position-relative rounded w-100 h-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.9982103029184!2d105.7684261!3d10.0299333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a088276f358fdd%3A0xe3722be8261f6c9d!2zTmfDtGdpYSBWxINuIELDrG5oLCBD4bqnbiBUaOG7pywgVGjhuqFuaCBwaOG7kSBLaMOzIHPhu58!5e0!3m2!1svi!2s!4v1603794290143!5m2!1svi!2s"
                style={{ minHeight: "300px", border: "0" }}
                aria-hidden="false"
              ></iframe>
            </div>
            <div
              className="col-lg-4 col-md-12 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <form>
                <div className="row g-3">
                  <div className="col-md-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Họ & Tên</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="col-12 mb-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                      />
                      <label htmlFor="subject">Nội dung</label>
                    </div>
                  </div>
                  <div className="col-12 mb-4">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: "100px" }}
                      ></textarea>
                      <label htmlFor="message">Tin nhắn</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Gửi tin nhắn
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End  */}

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

export default ContactPage;
