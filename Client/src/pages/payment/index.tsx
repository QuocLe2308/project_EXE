import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaLongArrowAltUp, FaMoneyBillWave } from "react-icons/fa";
import {
  MdAccountCircle,
  MdBrowserUpdated,
  MdContentPaste,
  MdDateRange,
} from "react-icons/md";
import { IoQrCode } from "react-icons/io5";
import { GrStatusUnknown } from "react-icons/gr";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

const PaymentPage = () => {
  const [paymentDetails, setPaymentDetails] = useState<any>(null); // Store payment details
  const [qrCode, setQrCode] = useState<string | null>(null); // Store QR code URL
  const [paymentStatus, setPaymentStatus] = useState<string>('Đang chờ'); // Default status
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error handling
  const [paymentFetched, setPaymentFetched] = useState<boolean>(false); // Flag to track if payment info is fetched
  const router = useRouter();
  const { id } = router.query; // Get payment ID from query parameters

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem("token") || Cookies.get("token");
      if (!token) {
        setError('You need to be logged in to view payment details.');
        return;
      }

      fetchPaymentDetails(id as string, token);
      fetchQrCode(id as string, token);
    }
  }, [id]);

  // Fetch payment details with token
  const fetchPaymentDetails = async (paymentId: string, token: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/payment/${paymentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        setPaymentDetails(data.data); // Set the payment details
        setPaymentFetched(true); // Mark payment info as fetched
      } else {
        setError("Không thể tải thông tin thanh toán.");
      }
    } catch (err) {
      setError("Lỗi khi tải thông tin thanh toán.");
      console.error(err);
    }
  };

  // Fetch QR Code image with token
  const fetchQrCode = async (paymentId: string, token: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/payment/getQrBank/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Assuming response.data contains the Base64 QR code string
      if (response.data) {
        setQrCode(response.data); // Set the Base64 string as the qrCode
      } else {
        setError("Không thể tải QR code.");
      }
    } catch (err) {
      setError("Lỗi khi tải QR code.");
      console.error(err);
    }
  };

  // Check payment status continuously with token
  const checkPaymentStatus = async (paymentId: string, token: string) => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/payment/check/${paymentId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        
        console.log("Payment check response: ", data); // Log the response for inspection
  
        // Check if the message contains "Bill <paymentId> Paid"
        if (data.message && data.message.includes(`Bill ${paymentId} Paid`)) {
          setPaymentStatus("Đã thanh toán");
          clearInterval(intervalId); // Stop checking when payment is completed
          console.log("Payment completed, showing Swal.");
  
          // Delay Swal to ensure state is updated
          setTimeout(() => {
            Swal.fire({
              title: 'Thanh toán đã được xác nhận!',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          }, 100); // Delay for 100ms
        } else {
          setError("Không thể kiểm tra trạng thái thanh toán.");
        }
      } catch (err) {
        setError("Lỗi khi kiểm tra trạng thái thanh toán.");
        console.error(err);
      }
    }, 1000); // Check every 5 seconds
  
    // Clear interval when component is unmounted
    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    // Only start checking the payment status once payment details and QR code are loaded
    if (paymentFetched && qrCode) {
      const token = localStorage.getItem("token") || Cookies.get("token");
      if (token) {
        checkPaymentStatus(id as string, token);
      }
    }
  }, [paymentFetched, qrCode, id]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Spinner Start */}
      <div
        id="spinner"
        className={`show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center ${loading ? "show" : ""}`}
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
      {/* Spinner End */}

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
            <p className="mb-2 d-flex align-items-center">
              <FaMoneyBillWave className="me-2" size={22} color="#86b817" />
              Số tiền: {paymentDetails ? paymentDetails.amount.toLocaleString() : "Loading..."} VNĐ
            </p>
            <p className="mb-2 d-flex align-items-center">
              <IoQrCode className="me-2" size={22} color="#86b817" /> Phương
              thức thanh toán: Online payment by Qr code
            </p>
            <p className="mb-2 d-flex align-items-center">
              <MdAccountCircle className="me-2" size={22} color="#86b817" /> Tài
              khoản: {paymentDetails ? paymentDetails.accountEmail : "Loading..."}
            </p>
            <p className="mb-2 d-flex align-items-center">
              <MdContentPaste className="me-2" size={22} color="#86b817" />
              Nội dung: {paymentDetails ? paymentDetails.content : "Loading..."}
            </p>
            <p className="mb-2 d-flex align-items-center">
              <GrStatusUnknown className="me-2" size={22} color="#86b817" />
              Trạng thái: {paymentStatus}
            </p>
            <p className="mb-2 d-flex align-items-center">
              <MdDateRange className="me-2" size={22} color="#86b817" />
              Ngày tạo: {paymentDetails ? new Date(paymentDetails.createdAt).toLocaleString() : "Loading..."}
            </p>
            <p className="mb-2 d-flex align-items-center">
              <MdBrowserUpdated className="me-2" size={22} color="#86b817" />
              Ngày cập nhật: {paymentDetails ? new Date(paymentDetails.updatedAt).toLocaleString() : "Loading..."}
            </p>
          </div>
        </div>
        <div className="container-xxl py-6 col-lg-6">
          {qrCode ? (
            <img
              className="img-fluid"
              src={`${qrCode}`} // Display the Base64 string directly
              alt="QR Code"
              style={{
                objectFit: "contain",
                width: "320px",
              }}
            />
          ) : (
            <p>Loading QR Code...</p>
          )}
        </div>
      </div>

      {/* Back to Top */}
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
