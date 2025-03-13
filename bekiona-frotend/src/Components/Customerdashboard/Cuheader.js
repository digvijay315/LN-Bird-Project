import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../cartcontext'
import logo from '../Assets/Logo (2).png'
import payment from '../Assets/payment.jpg'
import upi from '../Assets/upi.avif'
import Visa from '../Assets/visa.png'
import rupay from '../Assets/rupay.avif'
import api from '../api';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';



function Cuheader() {

  const useremail = localStorage.getItem('email')

  const [validation, setValidation] = useState({});


  



    const {cart,setcart}=useCart()
    useEffect(()=>
    {
      console.log(cart);
    },[])
   
    
    const [orderdata, setorderdata] = useState({
      apartmentNumber: "",
      selectstate: "",
      area: "",
      email: "",
      landmark: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      addressType: "Home",
      pincode: "",
      setDefault: false,
      cartItems: [],
      totalPrice:0,
      payment_status:"",
      product_image:[]
    });

   
    
    
  
    
    const[length,setlength]=useState(0)
    useEffect(()=>
    {
      const clength=cart.length
      setlength(clength)
      setorderdata({...orderdata,cartItems:cart})
    })
  
    
    
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  const navigate=useNavigate()
  
  
  // const [quantity, setQuantity] = useState(1);    
  
  
  
  
  const incrementQuantity = (index) => {
    setcart((prevCart) =>
      prevCart.map((item, i) =>
        i === index
          ? { ...item, product_quantity1: parseFloat(item.product_quantity1) + 1 }
          : item
      )
    );
  };
  
  
  
  // Decrement quantity and remove if quantity <= 1
  const decrementQuantity = (index) => {
    setcart((prevCart) =>
      prevCart
        .map((item, i) =>
          i === index && item.product_quantity1 > 1
            ? { ...item, product_quantity1: item.product_quantity1 - 1 }
            : item
        )
        .filter((item, i) => !(i === index && item.product_quantity1 <= 1))
    );
  };
  
  // Calculate total price
  const calculateTotalPrice = () => {
    // Calculate Subtotal (total without GST)
    const subtotal = cart.reduce(
      (total, item) => total + parseFloat(item.product_price) * item.product_quantity1,
      0
    );
  
    const gstPercentage = 18; // Example: 18% GST (you can change this value)
    const gstAmount = (subtotal * gstPercentage) / 100; // Calculate GST
  
    const total = subtotal + gstAmount; // Final total price including GST
  
    return { subtotal, gstAmount, total };
  };
  
  useEffect(() => {
    const { subtotal, gstAmount, total } = calculateTotalPrice(); // Get values
  
    setorderdata(prevData => ({
      ...prevData,
      totalPrice: total, // The final price after adding GST
      subtotal: subtotal, // Subtotal without GST
      gstAmount: gstAmount, // GST amount
    }));
  }, [orderdata.cartItems]); // Dependency array includes cartItems to recalculate on cart update
  
  
  
  const [show1, setShow1] = useState(false);
  
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
  };
  
  
  
  const [show4, setShow4] = useState(false);
  
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => {
    setShow4(true);
    handleClose1()
  }
  
  
  
  
  
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setorderdata((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
    }));

    validateField(name, value);
};

const validateField = (name, value) => {
  let newValidation = { ...validation };

  // Required Fields
  if (["firstName", "lastName","mobileNumber", "apartmentNumber", "selectstate","landmark", "area", "pincode"].includes(name) && !value.trim()) {
      newValidation[name] = `${name.replace(/([A-Z])/g, " $1")} is required!`;
  } else {
      delete newValidation[name];
  }

  // Mobile Number Validation
  if (name === "mobileNumber" && value.trim() && !/^\d{10}$/.test(value)) {
      newValidation.mobileNumber = "Enter a valid 10-digit Mobile Number!";
  }

  // Pincode Validation
  if (name === "pincode" && value.trim() && !/^\d{6}$/.test(value)) {
      newValidation.pincode = "Enter a valid 6-digit Pincode!";
  }

  setValidation(newValidation);
};

const validateForm = () => {
  let newValidation = {};

  if (!orderdata.firstName.trim()) newValidation.firstName = "First Name is required!";
  if (!orderdata.lastName.trim()) newValidation.lastName = "Last Name is required!";
  if (!orderdata.mobileNumber.trim() || !/^\d{10}$/.test(orderdata.mobileNumber)) 
      newValidation.mobileNumber = "Enter a valid 10-digit Mobile Number!";
  if (!orderdata.apartmentNumber.trim()) newValidation.apartmentNumber = "Apartment Number is required!";
  if (!orderdata.selectstate.trim()) newValidation.selectstate = "State is required!";
  if (!orderdata.landmark.trim()) newValidation.landmark = "Landmark is required!";
  if (!orderdata.area.trim()) newValidation.area = "Area is required!";
  if (!orderdata.pincode.trim() || !/^\d{6}$/.test(orderdata.pincode)) 
      newValidation.pincode = "Enter a valid 6-digit Pincode!";

  setValidation(newValidation);
  
  return Object.keys(newValidation).length === 0; // ✅ Return true if no errors
};


  
  
  const handleAddressType = (type) => {
    setorderdata({ ...orderdata, addressType: type });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", orderdata);
  };
  
  
 useEffect(()=>
{      
  setorderdata({...orderdata,email:useremail})
  
  

},[useremail])

useEffect(()=>
  {
    setorderdata({...orderdata,product_image:cart.product_image})
   
    
  
  },[cart])

useEffect(()=>
  {
   
    console.log(cart.product_image);
    
  
  },[cart])
  
  
  const handleSubmit1 = async (e) => {
  
    try {
      const response = await api.post('createOrder', orderdata);
      console.log(response);
      console.log(orderdata.email);
      
      
      console.log('Response:', orderdata);
  
      // Success Alert with "OK" button
      Swal.fire({
        title: 'Success!',
        text: 'Order created successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // Clear form fields and reload the window
        setorderdata({
          firstName: '',
          lastName: '',
          email: '',
          mobileNumber: '',
          apartmentNumber: '',
          selectstate: '',
          area: '',
          landmark: '',
          addressType: 'Home',
          setDefault: false,
          cartItems: [],
          totalPrice: 0,
          payment_status:""
        });
  
        // Reload the window (optional)
        window.location.reload();
      });
    } catch (error) {
      console.error('Error creating order:', error);
  
      // Error Alert
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create order. Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  };

  
  const handlePayment = async () => {

    if (!validateForm()) {
      Swal.fire({
          title: 'Validation Error!',
          text: 'Please correct the errors before submitting.',
          icon: 'warning',
          confirmButtonText: 'OK',
      });
      return;
  }
    try {
      // Step 1: Create Order on Backend
      const { data: order } = await api.post('payment', {
        amount: orderdata.totalPrice, // Amount in INR
      });
  
      console.log('Order Created:', order);  // Debugging: Check if the order was created
  
      // Step 2: Razorpay Checkout Options
      const options = {
        key: 'rzp_test_kh59VKLP3zCcop', // Replace with your Key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: order.id,
        handler: function (response) {
          console.log('Payment Success Response:', response);  // Debugging: Check Razorpay response
  
          // Check if response contains the expected payment info
          if (response && response.razorpay_payment_id) {
            alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
            console.log(orderdata
            );
            console.log(orderdata, cart);
            
            // Step 3: Generate PDF Invoice after Successful Payment
            generateInvoice(response,orderdata,companyDetails);
  
            // Directly update the payment status in frontend
            setorderdata({ ...orderdata, payment_status: 'success' });
  
            // Call your submit function to save data
            handleSubmit1();
          } else {
            alert('Payment Response Invalid');
          }
        },
        prefill: {
          name: orderdata.firstName,
          email: 'narayanniket2@gmail.com',
          contact: orderdata.mobileNumber,
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      // Step 4: Initialize Razorpay Checkout
      const rzp = new window.Razorpay(options);
      rzp.open();
      handleSubmit1();
      
    } catch (error) {
      console.error('Error during payment:', error);
  
      // Handle any error (e.g., network issues)
      alert('Payment Failed');
      
      // Set status to failed if payment fails
      setorderdata({ ...orderdata, payment_status: 'failed' });
    
    }
  };
  
  const companyDetails = [
    {
      name: 'KIONA',
      logo: 'E:\niket2\Ecommerce\eco\src\Components\Assets\Logo (2).png', // Relative URL to the public folder
      address: 'office no 326, Kashi plaza, kamrej, Surat pincode - 394185',
      contact: 'support@kiona.com',
    },
  ];
    
  

  
  
  const generateInvoice = (paymentResponse, orderdata, companyDetails) => {
    console.log("Order Data:", orderdata); // Debugging: Log the order data

    const doc = new jsPDF();
    const company = companyDetails[0]; // Extract company details
    const marginLeft = 20;
    const marginRight = 140;
    let cursorY = 20; // Track Y position

    // Function to add page header (Logo + Company & Customer Details + Invoice Details)
    const addPageHeader = (pageNumber) => {
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("INVOICE", 105, 20, { align: "center" });

        // --- Add Company Logo ---
        if (company.logo) {
            doc.addImage(company.logo, "JPEG", marginLeft, 25, 50, 20);
        }

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Company Details", marginLeft, 50);
        doc.text("Customer Details", marginRight, 50);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.text(company.name, marginLeft, 60);
        doc.text(company.address, marginLeft, 70);
        doc.text(`Contact: ${company.contact}`, marginLeft, 80);

        doc.text(`Name: ${orderdata.firstName} ${orderdata.lastName}`, marginRight, 60);
        doc.text(`Email: ${orderdata.email}`, marginRight, 70);
        doc.text(`Phone: ${orderdata.mobileNumber}`, marginRight, 80);
        doc.text(`Address: ${orderdata.apartmentNumber} ${orderdata.area} ${orderdata.landmark} ${orderdata.selectstate} ${orderdata.pincode} India`, marginRight, 90);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(`Invoice Number: ${paymentResponse.razorpay_payment_id}`, marginLeft, 100);
        doc.text(`Order ID: ${paymentResponse.razorpay_order_id}`, marginLeft, 110);
        doc.text(`Transaction Date: ${new Date().toLocaleDateString()}`, marginLeft, 120);

        // Show Page Number at the bottom of every page
        doc.setFontSize(10);
        doc.text(`Page ${pageNumber}`, 105, 285, { align: "center" });
    };

    // --- First Page Header ---
    addPageHeader(1);
    cursorY = 130; // Move cursor after header

    // --- Product Table ---
    doc.setFont("helvetica", "bold");
    doc.text("Product Details", marginLeft, cursorY);
    cursorY += 10;

    doc.autoTable({
        startY: cursorY,
        head: [["S.No", "Product Name", "Quantity", "Unit Price", "Total"]],
        body: orderdata.cartItems.map((product, index) => [
            index + 1,
            product.product_name,
            product.product_quantity1,
            product.product_price,
            (product.product_quantity1 * product.product_price),
        ]),
        theme: "grid",
        headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 60 }, 2: { cellWidth: 25 }, 3: { cellWidth: 35 }, 4: { cellWidth: 35 } },
        margin: { top: 10 },

        // Ensure that company details and logo are re-added on new pages
        didDrawPage: function (data) {
            if (data.pageNumber > 1) {
                doc.setPage(data.pageNumber);
                addPageHeader(data.pageNumber);
            }
        },
    });

    // Move to the last page before adding the summary
    const totalPages = doc.internal.getNumberOfPages();
    doc.setPage(totalPages);

    let finalY = doc.lastAutoTable.finalY + 10;

    // --- Summary Section (With Border) ---
    const summaryX = marginRight - 20;
    const summaryWidth = 70;
    const summaryHeight = 40;

    doc.setLineWidth(0.5);
    doc.rect(summaryX, finalY, summaryWidth, summaryHeight);

    doc.setFont("helvetica", "bold");
    doc.text("Summary", summaryX + 5, finalY + 7);
    doc.setFont("helvetica", "normal");

    doc.text(`Subtotal:  ${orderdata.subtotal}`, summaryX + 5, finalY + 17);
    doc.text(`GST (${18}%):  ${(orderdata.subtotal * (orderdata.gstAmount / 100))}`, summaryX + 5, finalY + 27);
    doc.text(`Grand Total:  ${orderdata.totalPrice}`, summaryX + 5, finalY + 37);

    finalY += summaryHeight + 10;

    // --- Footer ---
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for your purchase!", marginLeft, finalY);
    doc.text(`For queries, contact us at: ${company.contact}`, marginLeft, finalY + 10);

    // --- Save the PDF ---
    doc.save(`Invoice_${paymentResponse.razorpay_payment_id}.pdf`);
};

  
  
  const [show6, setShow6] = useState(false);
  
    const handleClose6 = () => setShow6(false);
    const handleShow6 = () =>{setShow6(true);
      handleClose()
    } 
  
  
  
    const [show7, setShow7] = useState(false);
  
    const handleClose7 = () => setShow7(false);
    const handleShow7 = () =>{setShow7(true);
      handleClose()
    } 
  
  
    
  const navigatecategory=(data)=>
  {
    navigate('/categoryproduct',{state:data})
  }
  
  
  
  
  const [user, setuser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  };
  
  // Handle form submission
  const handleSubmit6 = async (e) => {
    e.preventDefault();
  
    try {
      // Send POST request to backend for user registration
      const response = await api.post("register", user);
  
      // Handle successful response
      setSuccessMessage(response.data.message);
      setError(null); // Clear any previous errors
  
      // Optionally, reset the form fields
      setuser({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (err) {
      // Handle error response
      setError(err.response?.data?.message || "Server error");
      setSuccessMessage(null); // Clear any previous success messages
    }
  };
  
  
  
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  
  // Handle input changes
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };



 
  
  // Handle form submission
  const handleSubmit2 = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post("logins", loginDetails);
  
      if (response.status === 200) {
        Swal.fire({
          title: "Login Successful!",
          text: `Welcome back, ${response.data.user.name}!`,
          icon: "success",
          confirmButtonText: "OK",
        });
        localStorage.setItem('email',loginDetails.email)
        // navigate('/cudasboard',{ state: loginDetails })
  
        // Clear the form and close the modal
        setLoginDetails({ email: "", password: "" });
        handleClose();
      } else {
        Swal.fire({
          title: "Login Failed",
          text: response.data.message || "Invalid email or password.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Server error. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };



  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];



const removeFromCart = (index) => {
  const updatedCart = cart.filter((_, i) => i !== index);
  setcart(updatedCart); 

  // Show success message using SweetAlert
  Swal.fire({
    title: "Removed!",
    text: "Your product has been removed from the cart.",
    icon: "success",
    confirmButtonText: "OK",
  });
};



const [selectedPayment, setSelectedPayment] = useState("cod");

  return (
    <div>
 <div style={{position:"absolute",left:"0",right:"0",zIndex:"1000",top:"0"}}>

<nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#f8f9f3",
        height: "120px",
        position: "relative",
      }}
    >
      <div className="container-fluid">
        {/* Brand Name Centered */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "40px",
            fontWeight: "400",
            fontFamily: '"ITC Modern No 216", serif',
          }}
        >
          Kiona
        </div>

        {/* Mobile Toggle Button */}
        <button
          style={{ width: "fit-content", color: "#000" }}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Navigation Links */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
          style={{ marginTop: "80px" }}
        >
          <ul
            className="navbar-nav"
            style={{
              gap: "20px",
              display: "flex",
              alignItems: "center",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            <li className="nav-item">
              <Link className="nav-link no-hover" to="/cudasboard">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link no-hover" to="/aboutus">
                About Us
              </Link>
            </li>
            {/* Product Range Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle no-hover"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Product 
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{cursor:"pointer"}}>
                <li className="dropdown-item" onClick={() => navigatecategory("shampoo")} style={{cursor:"pointer"}}>
                  Shampoo
                </li>
                {/* <li className="dropdown-item" onClick={() => navigatecategory("soap")} style={{cursor:"pointer"}}>
                  Soap
                </li> */}
                <li className="dropdown-item" onClick={() => navigatecategory("face wash")} style={{cursor:"pointer"}}>
                  Face Wash
                </li>
                {/* <li className="dropdown-item" onClick={() => navigatecategory("hair serum")} style={{cursor:"pointer"}}>
                  Hair Serum
                </li> */}
                <li className="dropdown-item" onClick={() => navigatecategory("hair oil")} style={{cursor:"pointer"}}>
                  Hair Oil
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link no-hover" to="/blog1">
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link no-hover" to="/track-order">
                Track Your Order
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link no-hover" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link no-hover" to="/combo">
            Combo
            </Link>
            </li>
            {/* Terms & Conditions Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle no-hover"
                href="#"
                id="termsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Terms & Conditions
              </a>
              <ul className="dropdown-menu" aria-labelledby="termsDropdown">
                <li>
                  <Link className="dropdown-item" to="/privacypolicy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/ewaste">
                    E-Waste Policy
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/cancelpolicy">
                    Cancellation & Return Policy
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/deliverycancel">
                    Shipping & Delivery Policy
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/faq">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/term&condition">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </li>
            {/* customer page  */}
            <li className="nav-item dropdown">
<a
className="nav-link dropdown-toggle text-white"
href="#"
id="navbarDropdown"
role="button"
data-bs-toggle="dropdown"
aria-expanded="false"
>
My Account
</a>
<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
{/* <li className="dropdown-item">Dashboard</li> */}
<li className="dropdown-item">
<Link to="/myorders" style={{textDecoration:"none",color:"black"}}>My Orders</Link>
</li>
<li className="dropdown-item">
<Link to="/personalinfo" style={{textDecoration:"none",color:"black"}}>Personal Info</Link>
</li>
<li className="dropdown-item">
<Link to="/manageadds" style={{textDecoration:"none",color:"black"}}>Manage Address</Link>
</li>
<li className="dropdown-item">
<Link to="/" style={{textDecoration:"none",color:"black"}}>Logout</Link>
</li>
</ul>
</li>
          </ul>
        </div>

        {/* Cart & Login Buttons */}
        <div
  className="d-flex justify-content-end align-items-center"
  style={{
    position: "absolute",
    top: "40px",
    right: "228px",
    gap: "20px",
  }}
>
  {/* Cart Icon with Badge */}
  <div style={{ position: "relative", cursor: "pointer" }} onClick={handleShow1}>
    <i className="fas fa-cart-shopping" style={{ fontSize: "25px", color: "#333" }}></i>
    {length > 0 && (
      <span
        style={{
          position: "absolute",
          top: "-5px",
          right: "-10px",
          background: "red",
          color: "white",
          fontSize: "12px",
          fontWeight: "bold",
          padding: "3px 6px",
          borderRadius: "50%",
          minWidth: "20px",
          textAlign: "center",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        {length}
      </span>
    )}
  </div>

  {/* User Icon */}
</div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .navbar-nav .nav-link,
        .dropdown-item {
          position: relative;
          transition: all 0.3s ease-in-out;
        }

        .navbar-nav .nav-link:hover,
        .dropdown-item:hover {
          border-bottom: 2px solid #000;
        }

        .dropdown-menu {
          list-style: none;
        }

        /* Mobile View */
        @media (max-width: 768px) {
          .navbar-nav {
            flex-direction: column;
            align-items: center;
          }

          .d-flex.justify-content-end {
            position: relative;
            top: 10px;
            right: 0;
            margin-top: 10px;
            gap: 5px;
          }

          .navbar-toggler {
            margin-top: 10px;
          }

          .dropdown-menu {
            width: 100%;
          }
        }
      `}</style>
    </nav>


{/* <div className="category">
<div
className="bg-light p-2"
style={{
  position: "fixed",
  zIndex: "1000",
  right: "0",
  left: "0",
  
}}
>
<div
  className="container-lg d-flex justify-content-between align-items-center"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}
>

</div>
</div>
</div> */}


{/* modal code for login----------- */}

<Modal
  show={show}
  onHide={handleClose}
  centered
  dialogClassName="custom-modal"
>
  <Modal.Header
    style={{
      backgroundColor: "linear-gradient(to right, #fc2779, #ff79b0)",
    }}
    closeButton
  >
    <Modal.Title
      style={{
        fontSize: "24px",
        fontWeight: "600",
        color: "#fff",
        background: "linear-gradient(to right, #fc2779, #ff79b0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      Welcome to Kiona
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div
      style={{
        display: "flex",
        fontFamily: "Arial, sans-serif",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {/* Left Section */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #0078D7, #56CCF2)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ marginBottom: "10px", fontWeight: "bold" }}>
          Welcome!
        </h2>
        <p
          style={{
            fontSize: "16px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Sign in with your email and password to explore our features.
        </p>
        <img
          src="https://c8.alamy.com/comp/2BHAEDT/login-icon-isolated-on-special-blue-round-button-abstract-illustration-2BHAEDT.jpg"
          alt="Sign In Illustration"
          style={{
            width: "150px",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(255, 255, 255, 0.3)",
          }}
        />
      </div>

      {/* Right Section */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#F9F9F9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit2} style={{ maxWidth: "300px", width: "100%" }}>
          <label
            htmlFor="email"
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              color: "#555",
            }}
          >
            Enter Email ID
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email ID"
            // value={loginDetails.email}
            onChange={handleInputChange1}
            
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginBottom: "15px",
              fontSize: "14px",
              outline: "none",
            }}
            required
          />
          <label
            htmlFor="password"
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              color: "#555",
            }}
          >
            Enter Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            // value={loginDetails.password}
            onChange={handleInputChange1}

            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginBottom: "15px",
              fontSize: "14px",
              outline: "none",
            }}
            required
          />
          <p style={{ fontSize: "12px", color: "#777", marginBottom: "15px" }}>
            <button
              style={{
                backgroundColor: "transparent",
                color: "#0078D7",
                border: "none",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "12px",
                padding: "0",
                margin: "0",
              }}
              onClick={handleShow7}
            >
              Forgot Password?
            </button>
          </p>
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#FF5722",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "10px",
              boxShadow: "0 4px 8px rgba(255, 87, 34, 0.2)",
              transition: "all 0.3s ease",
            }}
          >
            CONTINUE
          </button>
          <button
            type="button"
            onClick={handleShow6}
            style={{
              width: "100%",
              backgroundColor: "white",
              color: "#0078D7",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            New User? Signup
          </button>
        </form>
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>




{/* modal login end----------------------- */}


{/* modal----------------------------------------------------------------- */}

<Modal show={show1} onHide={handleClose1}>
      <Modal.Header closeButton>
      <Modal.Title>
<div className="modal-title">
<div>
  <img 
    className="img-fluid" 
  src={logo}
    alt="Product" 
  />
</div>
<span>Product Details</span>
</div>
</Modal.Title>

      </Modal.Header>
      <Modal.Body>
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
             <img src={item.product_image} alt={item.product} />
      <div className="cart-item-info">
        <div className="cart-item-title">{item.product_name}</div>
       
        <div className="cart-item-price">
      ₹{((parseFloat(item.product_price) || 0) * 1).toFixed(2)} 
      <span style={{marginLeft:"12rem"}}>Quantity {item.product_quantity1}</span>
    </div>
    <span onClick={() => removeFromCart(index)} style={{ cursor: "pointer", color: "red" }}>
            <i className="fa-solid fa-trash"></i>
          </span>
      </div>
      <div className="cart-item-actions">
        <button onClick={() => decrementQuantity(index)}>-</button>
        <span className="quantity">{item.product_quantity1}</span>
        <button onClick={() => incrementQuantity(index)}>+</button>
      </div>
          </div>
          
        ))}
               <div className="cart-total">
               <h3>
Total Price:  <span  >
₹{orderdata.subtotal ? orderdata.subtotal.toFixed(2) : '0.00'}
</span>
</h3>
</div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose1}>
          Close
        </Button>
        <Button  variant="primary" onClick={handleShow4}>
          CheckOut
        </Button>
      </Modal.Footer>
    </Modal>

{/* modal---------------------------------------------------------------------- */}


{/* billing form modal------------------------------------------------------------------------- */}


<Modal show={show4} onHide={handleClose4}  size="xl">
    <Modal.Header closeButton>
      <Modal.Title>  <div>
      <h3>Add New Address</h3>
     </div></Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div
  className="container"
  style={{
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  }}
>
  {/* Form Section */}
  <div
    style={{
      flex: "1",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
    }}
  >
    <form onSubmit={handleSubmit1}>

    <h5 style={{ marginTop: "20px", fontWeight: "600" }}>
        Personal Details
      </h5>
      <div className="mb-3 row">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={orderdata.firstName}
            onChange={handleChange}
            placeholder="e.g. John"
            required
            style={{
              borderRadius: "5px",
              padding: "10px",
              fontSize: "14px",
            }}
          />
          {validation.firstName && <span style={{ color: "red", fontSize: "12px" }}>{validation.firstName}</span>}
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={orderdata.lastName}
            onChange={handleChange}
            placeholder="e.g. Doe"
            style={{
              borderRadius: "5px",
              padding: "10px",
              fontSize: "14px",
            }}
          />
            {validation.lastName && <span style={{ color: "red", fontSize: "12px" }}>{validation.lastName}</span>}
        </div>
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="mobileNumber" className="form-label">
          Mobile Number
        </label>
        <input
          type="tel"
          className="form-control"
          id="mobileNumber"
          name="mobileNumber"
          value={orderdata.mobileNumber}
          onChange={handleChange}
          placeholder="e.g. 9876543210"
          required
          style={{
            borderRadius: "5px",
            padding: "10px",
            fontSize: "14px",
          }}
        />
          {validation.mobileNumber && <span style={{ color: "red", fontSize: "12px" }}>{validation.mobileNumber}</span>}
      </div>





      <h5 style={{ marginBottom: "20px", fontWeight: "600" }}>
        *Address Details
      </h5>
      <div className="mb-3 row">
        <div className="col-md-6">
          <label htmlFor="apartmentNumber" className="form-label">
            *Apartment Name / House No.
          </label>
          <input
            type="text"
            className="form-control"
            id="apartmentNumber"
            name="apartmentNumber"
            value={orderdata.apartmentNumber}
            onChange={handleChange}
            placeholder="e.g. 12/228"
            required
            style={{
              borderRadius: "5px",
              padding: "10px",
              fontSize: "14px",
            }}
          />
            {validation.apartmentNumber && <span style={{ color: "red", fontSize: "12px" }}>{validation.apartmentNumber}</span>}
        </div>
        <div className="col-md-6">
  <label htmlFor="state" className="form-label">
    *Select State
  </label>
  <select
    className="form-control"
    id="state"
    name="selectstate"
    value={orderdata.selectstate}
    onChange={handleChange}
    style={{
      borderRadius: "5px",
      padding: "10px",
      fontSize: "14px",
    }}
  >
    <option value="" disabled>
      Select a state
    </option>
    {indianStates.map((state, index) => (
      <option key={index} value={state}>
        {state}
      </option>
    ))}
  </select>
  {validation.selectstate && <span style={{ color: "red", fontSize: "12px" }}>{validation.selectstate}</span>}
</div>
      </div>
      <div className="mb-3 row">
        <div className="col-md-6">
          <label htmlFor="area" className="form-label">
          *Area
          </label>
          <input
            type="text"
            className="form-control"
            id="area"
            name="area"
            onChange={handleChange}
            placeholder="e.g. 12/228"
            required
            style={{
              borderRadius: "5px",
              padding: "10px",
              fontSize: "14px",
            }}
          />
            {validation.area && <span style={{ color: "red", fontSize: "12px" }}>{validation.area}</span>}
        </div>
        <div className="col-md-6">
          <label htmlFor="StreetDetails" className="form-label">
          *Street Details/Landmark
          </label>
          <input
            type="text"
            className="form-control"
            id="landmark"
            name="landmark"
           
            onChange={handleChange}
            placeholder="e.g. Park Avenue"
            style={{
              borderRadius: "5px",
              padding: "10px",
              fontSize: "14px",
            }}
          />
            {validation.landmark && <span style={{ color: "red", fontSize: "12px" }}>{validation.landmark}</span>}
        </div>

        <div className="col-md-6">
          <label htmlFor="StreetDetails" className="form-label">
          *user email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
           value={useremail}
           readOnly
            // onChange={handleChange}
            // placeholder="e.g. Park Avenue"
            style={{
              borderRadius: "5px",
              padding: "10px",
              fontSize: "14px",
            }}
          />
        </div>
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="landmark" className="form-label">
          *Pincode
        </label>
        <input
          type="text"
          className="form-control"
          id="pincode"
          name="pincode"
          
          onChange={handleChange}
          style={{
            borderRadius: "5px",
            padding: "10px",
            fontSize: "14px",
          }}
        />
          {validation.pincode && <span style={{ color: "red", fontSize: "12px" }}>{validation.pincode}</span>}
      </div>
      
      <div className="mb-3">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="setDefault"
            name="setDefault"
            checked={orderdata.setDefault}
            onChange={handleChange}
          />
          <label htmlFor="setDefault" className="form-check-label">
            Set as Default Address
          </label>
        </div>
      </div>
      <h5 style={{ marginTop: "20px", fontWeight: "600" }}>Address Type</h5>
      <div className="mb-3 address-type" style={{ marginBottom: "20px" }}>
        <button
          type="button"
          className={`btn ${
            orderdata.addressType === "Home"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => handleAddressType("Home")}
          style={{
            marginRight: "10px",
            fontSize: "14px",
            padding: "8px 15px",
            borderRadius: "5px",
          }}
        >
          <i
            className="fa-solid fa-house"
            style={{ marginRight: "5px" }}
          ></i>
          Home
        </button>
        <button
          type="button"
          className={`btn ${
            orderdata.addressType === "Office"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => handleAddressType("Office")}
          style={{
            marginRight: "10px",
            fontSize: "14px",
            padding: "8px 15px",
            borderRadius: "5px",
          }}
        >
          <i
            className="fa-solid fa-building"
            style={{ marginRight: "5px" }}
          ></i>
          Office
        </button>
        <button
          type="button"
          className={`btn ${
            orderdata.addressType === "Other"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => handleAddressType("Other")}
          style={{
            marginRight: "10px",
            fontSize: "14px",
            padding: "8px 15px",
            borderRadius: "5px",
          }}
        >
          <i
            className="fa-solid fa-ellipsis"
            style={{ marginRight: "5px" }}
          ></i>
          Other
        </button>
      </div>
    </form>
  </div>

  {/* Cart Section */}
  <div
    style={{
      flex: "1",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
    }}
  >
    <h5 style={{ marginBottom: "20px", fontWeight: "600" }}>Cart Items</h5>
    {cart.map((item, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        
        <div>
          <div style={{ fontWeight: "600", marginBottom: "5px" }}>
            {item.product_name}
          </div>
          <div style={{ fontSize: "14px", color: "#555" }}>
            ₹{((parseFloat(item.product_price) || 0) * 1).toFixed(2)}  <span style={{marginLeft:"13rem"}}>Quantity {item.product_quantity1}</span>
          </div>
        </div>
      </div>
    ))}
<div style={{
  fontWeight: "600", 
  fontSize: "20px", 
  marginTop: "20px", 
  color: "#333", 
  textAlign: "left",
  letterSpacing: "0.5px",
  borderBottom: "2px solid #ddd",
  paddingBottom: "10px"
}}>
  <strong>Subtotal:</strong> 
  <span style={{ color: "#333", fontSize: "18px", fontWeight: "400" }}>
    ₹{orderdata.subtotal ? orderdata.subtotal.toFixed(2) : '0.00'}
  </span>
</div>

<div style={{
  fontWeight: "600", 
  fontSize: "20px", 
  marginTop: "10px", 
  color: "#333", 
  textAlign: "left",
  letterSpacing: "0.5px",
  borderBottom: "2px solid #ddd",
  paddingBottom: "10px"
}}>
  <strong>GST (18%):</strong> 
  <span style={{ color: "#e74c3c", fontSize: "18px", fontWeight: "400" }}>
    ₹{orderdata.gstAmount ? orderdata.gstAmount.toFixed(2) : '0.00'}
  </span>
</div>

<div style={{
  fontWeight: "700", 
  fontSize: "22px", 
  marginTop: "10px", 
  color: "#333", 
  textAlign: "left",
  letterSpacing: "0.5px",
  paddingTop: "10px",
  borderTop: "2px solid #ddd"
}}>
  <strong>Total Price:</strong> 
  <span style={{
    color: "#27ae60", 
    fontSize: "20px", 
    fontWeight: "500"
  }}>
    ₹{orderdata.totalPrice ? orderdata.totalPrice.toFixed(2) : '0.00'}
  </span>
</div>


  </div>
</div>


{/* payment method */}

<div className="fixed inset-0 flex items-center justify-center  px-4">
            <h2 className="text-lg font-semibold">Payment</h2>
            <p className="text-sm text-gray-500">All transactions are secure and encrypted.</p>

            {/* GoKwik Cash on Delivery */}
            <div
              className={`border rounded-lg p-4 mt-4 cursor-pointer ${
                selectedPayment === "cod" ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => setSelectedPayment("cod")}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "cod"}
                  onChange={() => setSelectedPayment("cod")}
                  className="mr-3"
                />
                <span className="font-medium">Cash On Delivery</span>
                <span className="ml-auto">💰</span>
              </div>

              {selectedPayment === "cod" && (
                <div className="mt-3 text-center border-t pt-3">
<img 
  src={payment} 
  alt="Payment process" 
  className="mx-auto w-auto max-w-[80px] sm:max-w-[20px] md:max-w-[120px] h-auto" 
/>



                  <p className="text-sm text-gray-600 mt-2">
                  You will be redirected to complete your Cash on Delivery order securely.
                  </p>
                </div>
              )}
            </div>

            {/* PhonePe Payment Gateway */}
            <div
              className={`border rounded-lg p-4 mt-4 cursor-pointer ${
                selectedPayment === "phonepe" ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => setSelectedPayment("phonepe")}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "phonepe"}
                  onChange={() => setSelectedPayment("phonepe")}
                  className="mr-3"
                />
                <span className="font-medium">PhonePe Payment Gateway (UPI, Cards & NetBanking)</span>
              </div>
              {selectedPayment === "phonepe" && (
                <div className="mt-3 flex space-x-2 border-t pt-3">
                  <img src={upi} alt="UPI" style={{ width: "60px", height: "40px" }} />
                  <img src={Visa} alt="Visa" style={{ width: "60px", height: "40px" }} />
                  <img src={rupay} alt="Rupay" style={{ width: "60px", height: "40px" }} />
                </div>
              )}
            </div>
          </div>





    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose4}>
        Close
      </Button>
      <Button variant="primary" onClick={handlePayment}>
       Go to Payment
      </Button>
    </Modal.Footer>
  </Modal>



{/* billing form modal end------------------------------------------------------------------------- */}

{/* sinup for user--------------------------------------------------------------------- */}

<Modal show={show6} onHide={handleClose6}>
  <Modal.Header closeButton>
    <Modal.Title>Customer Signup</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSubmit6}>
      <Form.Group controlId="formName" className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          name="name"
          // value={setFormData1.name}
          onChange={handleInputChange}
         
        />
      </Form.Group>

      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email ID</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          name="email"
          // value={setFormData1.email}
          onChange={handleInputChange}
        
        />
      </Form.Group>

      <Form.Group controlId="formPhone" className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter your phone number"
          name="phone"
          // value={setFormData1.phone}
          onChange={handleInputChange}
        
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          name="password"
          // value={setFormData1.password}
          onChange={handleInputChange}
         
        />
      </Form.Group>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <Button variant="primary" type="submit">
        Signup
      </Button>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose6}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


  {/* forgot password user code----------------------------------------------------------------- */}

  <Modal show={show7} onHide={handleClose7} centered>
<Modal.Header
closeButton
style={{
  backgroundColor: "#f8f9fa",
  borderBottom: "1px solid #dee2e6",
}}
>
<Modal.Title
  style={{
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
  }}
>
  Forgot Password
</Modal.Title>
</Modal.Header>
<Modal.Body
style={{
  padding: "20px",
  fontFamily: "'Arial', sans-serif",
}}
>
<p
  style={{
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px",
    textAlign: "center",
  }}
>
  Enter your email address below to receive password reset instructions.
</p>
<input
  type="email"
  placeholder="Enter your email address"
  style={{
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "20px",
    outline: "none",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  }}
/>
<p
  style={{
    fontSize: "14px",
    color: "#555",
    marginTop: "10px",
    textAlign: "center",
  }}
>
  After submitting, check your email for a reset link. Follow the instructions to create a new password.
</p>
</Modal.Body>
<Modal.Footer
style={{
  borderTop: "1px solid #dee2e6",
  display: "flex",
  justifyContent: "space-between",
}}
>
<Button
  variant="secondary"
  onClick={handleClose7}
  style={{
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    borderColor: "#6c757d",
    color: "#fff",
    fontWeight: "500",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a6268")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c757d")}
>
  Close
</Button>
<Button
  variant="primary"
  style={{
    padding: "10px 20px",
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    color: "#fff",
    fontWeight: "500",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
>
  Send Reset Link
</Button>
</Modal.Footer>
</Modal>







</div>

        
    </div>
  )
}

export default Cuheader