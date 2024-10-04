// components/TestimonialsCarousel.tsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Avt1 from "@/assets/images/comment/testimonial-1.jpg";
import Avt2 from "@/assets/images/comment/testimonial-2.jpg";
import Avt3 from "@/assets/images/comment/testimonial-3.jpg";
import Avt4 from "@/assets/images/comment/testimonial-4.jpg";
import { avatar } from "@nextui-org/react";

const TestimonialsCarousel: React.FC = () => {
  const testimonials = [
    {
      avatar: Avt1.src,
      name: "Nguyễn Hồng Thắm",
      location: "Hà Nội, Việt Nam",
      feedback:
        "Tôi đã tìm thấy phòng trọ tuyệt vời thông qua trang web này. Dịch vụ tốt và dễ dàng sử dụng.",
    },
    {
      avatar: Avt2.src,
      name: "Đào Hải Yến",
      location: "Đà Nẵng, Việt Nam",
      feedback:
        "Trang web này giúp tôi tìm được chỗ ở phù hợp với giá cả hợp lý. Rất hài lòng với trải nghiệm!",
    },
    {
      avatar: Avt3.src,
      name: "Trịnh Yến Như",
      location: "TP. Hồ Chí Minh, Việt Nam",
      feedback:
        "Dễ dàng đăng ký và quản lý thông tin phòng trọ. Tôi đã thu hút được nhiều khách thuê nhờ trang web này.",
    },
    {
      avatar: Avt4.src,
      name: "Tăng Trung Lộc",
      location: "Cần Thơ, Việt Nam",
      feedback:
        "Rất thích cách mà trang web hoạt động. Dễ dàng tìm kiếm phòng và có nhiều lựa chọn đa dạng.",
    },
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    centerMode: true,
    centerPadding: "24px",
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <Slider
          {...settings}
          className="testimonial-carousel position-relative"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-item bg-white text-center border p-4 mb-4"
            >
              <img
                className="bg-white rounded-circle shadow p-1 mx-auto mb-4"
                src={testimonial.avatar}
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
              <h5
                className="mb-1 font-Nunito  comment-user-name"
                style={{
                  fontSize: "25px",
                  fontWeight: "800",
                }}
              >
                {testimonial.name}
              </h5>
              <p
                className="mb-4"
                style={{
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                {testimonial.location}
              </p>
              <p className="mt-2 mb-0">{testimonial.feedback}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
