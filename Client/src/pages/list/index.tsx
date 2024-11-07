import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaLongArrowAltUp,
  FaStar,
  FaUserFriends,
  FaWarehouse,
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";


import { fetchAllProperties, fetchPropertiesByLocation, fetchPropertiesByPrice } from "@/pages/api/properties";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
interface Owner {
  landlordID: number;
  userName: string;
  email: string;
  fullName: string;
  phoneNumber: string;
}

interface Property {
  propertyId: number;
  propertyName: string;
  address: string;
  monthlyRent: number;
  owner: Owner;
}

interface PropertyResponse {
  images: string[];
  property: Property;
}

const ListPage = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [distance, setDistance] = useState<number>(50); // Khoảng cách mặc định là 50 km
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>(''); // Sắp xếp giá
  const [activeFilter, setActiveFilter] = useState<string>('all'); // Theo dõi filter đang hoạt động
  const router = useRouter();


  const handleBookNow = async (propertyId: number) => {
    const token = localStorage.getItem("token") || Cookies.get("token");
  
    if (!token) {
      setError('You need to be logged in to make a payment.');
      return; // Dừng nếu không có token
    }
  
    try {
      const response = await fetch('http://localhost:8080/api/payment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ property: { propertyId } }),
      });
  
      const data = await response.json();
      console.log("API response data:", data);  // In ra để kiểm tra cấu trúc
  
      if (data.status === "success") {
        // Giả sử data.data là chuỗi đối tượng Payment
        const paymentString = data.data;
  
        // Phân tích chuỗi để lấy paymentID
        const regex = /paymentID=(\d+)/;
        const match = paymentString.match(regex);
  
        if (match && match[1]) {
          const paymentId = Number(match[1]);  // Lấy paymentID
          console.log("Redirecting to payment page with paymentId:", paymentId);
          router.push(`/payment?id=${paymentId}`);
        } else {
          console.log("Invalid paymentId format", paymentString);
          setError("Invalid paymentId format");
        }
      } else {
        setError('Payment creation failed');
      }
    } catch (err) {
      setError('Error processing payment');
      console.error('Error creating payment:', err);
    }
  };
  


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

  useEffect(() => {
    if (distance === 0) {
      fetchAllProperties();
    }
    const loadProperties = async () => {
      try {
        setLoading(true);
        let response;

        if (latitude && longitude && activeFilter === 'location') {
          response = await fetchPropertiesByLocation(latitude, longitude, distance);
          setProperties(response.data);
        } else if (sortBy === '0') {
          response = await fetchPropertiesByPrice('/property/asc');
          setProperties(response.data);
        } else if (sortBy === '1') {
          response = await fetchPropertiesByPrice('/property/desc')
          setProperties(response.data);
        } else {
          response = await fetchAllProperties();
          setProperties(response.data.data);

        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [sortBy, latitude, longitude, distance, activeFilter]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setActiveFilter('location');
        },
        (error) => {
          setError('Error getting location: ' + error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(Number(event.target.value));
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
                onChange={handleSortChange}
                value={sortBy}
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
                type="number"
                className="form-control bg-transparent"
                id="distance"
                placeholder="Distance"
                value={distance}
                onChange={handleDistanceChange}
                style={{
                  height: "50px",
                  color: "#2C3E50",
                  paddingTop: "20px",
                }}
              />
              <label htmlFor="distance" style={{ fontSize: "16px" }}>
                Khoảng cách (km)
              </label>
            </div>

            <button
              className="btn btn-primary rounded-pill py-2 px-4 mb-4"
              onClick={handleLocationSearch}
            >
              Tìm theo vị trí
            </button>
          </div>
        </div>
        {/* Package Start */}
        <div className="container-xxl py-5 col-lg-10">
          <div className="container">
            <div className="row g-4 justify-content-center flex-wrap">
              {properties.map((property, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay={`0.${index % 3 + 1}s`}
                >
                  <div className="package-item">
                    <div className="overflow-hidden">
                      <img className="img-fluid" src={property.images[0]} alt="" />
                    </div>
                    <div className="d-flex border-bottom">
                      <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                        <FaHouse className="me-2" size={20} />
                        {property.property.propertyName}
                      </p>
                      <p className="flex-fill text-center border-end py-2 d-flex align-items-center justify-content-center">
                        <FaWarehouse className="me-2" size={20} />
                        {property.property.address}
                      </p>
                      <p className="flex-fill text-center py-2 d-flex align-items-center justify-content-center">
                        <FaUserFriends className="me-2" size={20} />
                        {property.property.owner.fullName}
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
                        {property.property.monthlyRent.toLocaleString()} VNĐ
                      </h3>
                      <div className="mb-3 d-flex justify-content-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} color="#86b817" />
                        ))}
                      </div>
                      <div className="d-flex justify-content-center mb-2">
                        <Link
                          href="/"
                          className="btn btn-sm btn-primary px-3 btn-package-left"
                          style={{ fontSize: "18px" }}
                        >
                          Chi tiết
                        </Link>
                        <button
                          onClick={() => handleBookNow(property.property.propertyId)}
                          className="btn btn-warning"
                        >
                          Đặt Ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
