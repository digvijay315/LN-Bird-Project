import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Components/Navbar.css";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './cartcontext'
import logo from '../Components/Assets/Logo (2).png'
import api from '../Components/api';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { useAuth } from './authguard';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function Header() {
const [utocken, setutocken] = useState('')

localStorage.getItem('token')

const {cart,setcart}=useCart()
const [formData, setFormData] = useState({
apartmentNumber: "",
apartmentName: "",
area: "",
landmark: "",
firstName: "",
lastName: "",
mobileNumber: "",
addressType: "Home",
pincode: "",
setDefault: false,
cartItems: [],
totalPrice:0,
payment_status:""
});



const[length,setlength]=useState(0)
useEffect(()=>
{
const clength=cart.length
setlength(clength)
setFormData({...formData,cartItems:cart})
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
return cart.reduce(
(total, item) => total + parseFloat(item.product_price) * item.product_quantity1,
0
);
};

console.log(calculateTotalPrice);


useEffect(() => {
const total = calculateTotalPrice();
setFormData(prevData => ({
...prevData,
totalPrice: total,
}));
}, [formData.cartItems]);


const [show1, setShow1] = useState(false);

const handleClose1 = () => setShow1(false);
const handleShow1 = () => {
setShow1(true);
};



const [show4, setShow4] = useState(false);

const handleClose4 = () => setShow4(false);
const handleShow4 = () => {

if(!utocken){
Swal.fire({
text: `Please Firstly Login`,
icon: "error",
confirmButtonText: "OK",
});

return

}

setShow4(true);
handleClose1()
}






const handleChange = (e) => {
const { name, value, type, checked } = e.target;
setFormData({
...formData,
[name]: type === "checkbox" ? checked : value,
});
};

const handleAddressType = (type) => {
setFormData({ ...formData, addressType: type });
};

const handleSubmit = (e) => {
e.preventDefault();
console.log("Form Data Submitted:", formData);
};




const handleSubmit1 = async (e) => {

try {
const response = await api.post('createOrder', formData);
console.log('Response:', formData);

// Success Alert with "OK" button
Swal.fire({
title: 'Success!',
text: 'Order created successfully!',
icon: 'success',
confirmButtonText: 'OK',
}).then(() => {
// Clear form fields and reload the window
setFormData({
firstName: '',
lastName: '',
mobileNumber: '',
apartmentNumber: '',
apartmentName: '',
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
try {
// Step 1: Create Order on Backend
const { data: order } = await api.post('payment', {
amount: formData.totalPrice, // Amount in INR
});

console.log('Order Created:', order); // Debugging: Check if the order was created

// Step 2: Razorpay Checkout Options
const options = {
key: 'rzp_test_kh59VKLP3zCcop', // Replace with your Key ID
amount: order.amount,
currency: order.currency,
name: 'Your Company Name',
description: 'Test Transaction',
order_id: order.id,
handler: function (response) {
console.log('Payment Success Response:', response); // Debugging: Check Razorpay response

// Check if response contains the expected payment info
if (response && response.razorpay_payment_id) {
alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);

// Step 3: Generate PDF Invoice after Successful Payment
generateInvoice(response);

// Directly update the payment status in frontend
setFormData({ ...formData, payment_status: 'success' });

// Call your submit function to save data
handleSubmit1();
} else {
alert('Payment Response Invalid');
}
},
prefill: {
name: formData.firstName,
email: 'narayanniket2@gmail.com',
contact: formData.mobileNumber,
},
theme: {
color: '#3399cc',
},
};

// Step 4: Initialize Razorpay Checkout
const rzp = new window.Razorpay(options);
rzp.open();

} catch (error) {
console.error('Error during payment:', error);

// Handle any error (e.g., network issues)
alert('Payment Failed');

// Set status to failed if payment fails
setFormData({ ...formData, payment_status: 'failed' });
handleSubmit1();
}
};

const companyDetails = [
{
name: 'My Company',
logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Horned_logo.jpeg', // Relative URL to the public folder
address: '456 Business Rd, City, State, 789101',
contact: 'support@mycompany.com',
},
];




const generateInvoice = (paymentResponse) => {
const doc = new jsPDF();

// --- Add Company Details ---
// doc.setFontSize(12);
// doc.text(companyDetails.name, 20, 30);
// doc.text(companyDetails.address, 20, 40);
// doc.text(`Contact: ${companyDetails.contact}`, 20, 50);

// // --- Invoice Header ---
// doc.setFontSize(16);
// doc.text('Invoice', 20, 70);

doc.setFontSize(12);
doc.text(`Invoice Number: ${paymentResponse.razorpay_payment_id}`, 20, 80);
doc.text(`Order ID: ${paymentResponse.razorpay_order_id}`, 20, 90);
doc.text(`Transaction Date: ${new Date().toLocaleDateString()}`, 20, 100);

// --- Product Details ---
doc.text('Product Details:', 20, 110);

// --- Footer ---
// doc.text('Thank you for your purchase!', 20, 150);
// doc.text(`For queries, contact us at: ${companyDetails.contact}`, 20, 160);

// --- Save the PDF ---
doc.save('invoice.pdf');
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




const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  
  // Validation function
  const validateForm = () => {
    let newErrors = {};
    if (!user.firstName.trim()) newErrors.firstName = "First name is required";
    if (!user.lastName.trim()) newErrors.lastName = "Last name is required";
  
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(user.email)) {
      newErrors.email = "Enter a valid email address";
    }
  
    // Phone number validation (Assuming 10-digit number for India)
    const phonePattern = /^[6-9]\d{9}$/;
    if (!user.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phonePattern.test(user.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
  
    // Password validation (at least 8 characters, uppercase, lowercase, number, special char)
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!user.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordPattern.test(user.password)) {
      newErrors.password =
        "Password must be at least 8 characters, including uppercase, lowercase, number, and special character";
    }
  
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };
  
  const handleSubmit6 = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
  
    try {
      const response = await api.post("register", user);
  
      setSuccessMessage(response.data.message);
      setFormErrors({});
      
      // Reset form fields
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (err) {
      setFormErrors({ general: err.response?.data?.message || "Server error" });
      setSuccessMessage(null);
    }
  };



const { login } = useAuth();


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

const token=response.data.token
login(token);
navigate('/cudasboard')
localStorage.setItem('email',loginDetails.email)
localStorage.setItem('usertoken',token)
setutocken(response.data.token)

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







const [isOpen, setIsOpen] = useState(false);





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





return (

<>





<div style={{position:"fixed",left:"0",right:"0",zIndex:"1000",top:"0"}}>
<nav
className="navbar navbar-expand-lg" id="navbar1"
style={{
backgroundColor: "#f8f9f3",
height: "120px",
position: "relative",
}}
>
<div className="container-fluid">
{/* Mobile Toggle Button on the Left */}
<button
className="navbar-toggler"
type="button"
data-bs-toggle="collapse"
data-bs-target="#navbarNav"
aria-controls="navbarNav"
aria-expanded="false"
aria-label="Toggle navigation"
style={{ width: "fit-content", color: "#000", marginLeft: "10px" }}
>
<i className="fa-solid fa-bars"></i>
</button>

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
KIONA
</div>

{/* Cart and User Icons on the Right */}
<div
className="d-flex justify-content-end align-items-center"
style={{
position: "absolute",
top: "40px",
right: "20px",
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
<i
onClick={handleShow}
className="fa-regular fa-user"
style={{
fontSize: "25px",
color: "#333",
cursor: "pointer",
}}
></i>
</div>

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
<Link className="nav-link no-hover" to="/">
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
<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
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
</ul>
</div>
</div>
</nav>

<nav
className="navbar navbar-expand-lg" id="navbar2"
style={{
backgroundColor: "#f8f9f3",
height: "120px",
position: "relative",
display:"none",
}}
>
<div className="container-fluid">
{/* Mobile Toggle Button on the Left */}
<button
className="navbar-toggler"
type="button"
data-bs-toggle="collapse"
data-bs-target="#navbarNav"
aria-controls="navbarNav"
aria-expanded="false"
aria-label="Toggle navigation"
style={{ width: "fit-content", color: "#000", marginLeft: "10px" }}
>
<i className="fa-solid fa-bars"></i>
</button>

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
KIONA
</div>

{/* Cart and User Icons on the Right */}
<div
className="d-flex justify-content-end align-items-center"
style={{
position: "absolute",
top: "40px",
right: "20px",
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
<i
onClick={handleShow}
className="fa-regular fa-user"
style={{
fontSize: "25px",
color: "#333",
cursor: "pointer",
}}
></i>
</div>

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
<Link className="nav-link no-hover" to="/">
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
<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
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
</ul>
</div>
</div>
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
Total Price: <span>₹{parseFloat(calculateTotalPrice()).toFixed(2)}</span>
</h3>
</div>

</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose1}>
Close
</Button>
<Button variant="primary" onClick={handleShow4}>
CheckOut
</Button>
</Modal.Footer>
</Modal>

{/* modal---------------------------------------------------------------------- */}


{/* billing form modal------------------------------------------------------------------------- */}


<Modal show={show4} onHide={handleClose4} size="xl">
<Modal.Header closeButton>
<Modal.Title> <div>
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
<h5 style={{ marginBottom: "20px", fontWeight: "600" }}>
*Area Details
</h5>
<div className="mb-3 row">
<div className="col-md-6">
<label htmlFor="apartmentNumber" className="form-label">
*Apartment / House No.
</label>
<input
type="text"
className="form-control"
id="apartmentNumber"
name="apartmentNumber"
value={formData.apartmentNumber}
onChange={handleChange}
placeholder="e.g. 12/228"
required
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
</div>
{/* <div className="col-md-6">
<label htmlFor="apartmentNumber" className="form-label">
*user email
</label>
<input
type="text"
className="form-control"
id="apartmentNumber"
name="apartmentNumber"
value={useremail}
// onChange={handleChange}
// placeholder="e.g. 12/228"
// required
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
</div> */}
<div className="col-md-6">
<label htmlFor="apartmentName" className="form-label">
*Apartment Name
</label>
<input
type="text"
className="form-control"
id="apartmentName"
name="apartmentName"
value={formData.apartmentName}
onChange={handleChange}
placeholder="e.g. Park Avenue"
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
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
</div>
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
value={formData.firstName}
onChange={handleChange}
placeholder="e.g. John"
required
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
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
value={formData.lastName}
onChange={handleChange}
placeholder="e.g. Doe"
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
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
value={formData.mobileNumber}
onChange={handleChange}
placeholder="e.g. 9876543210"
required
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
</div>
<div className="mb-3">
<div className="form-check">
<input
type="checkbox"
className="form-check-input"
id="setDefault"
name="setDefault"
checked={formData.setDefault}
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
formData.addressType === "Home"
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
formData.addressType === "Office"
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
formData.addressType === "Other"
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
₹{((parseFloat(item.product_price) || 0) * 1).toFixed(2)} <span style={{marginLeft:"13rem"}}>Quantity {item.product_quantity1}</span>
</div>
</div>
</div>
))}
<div style={{ fontWeight: "600", fontSize: "18px", marginTop: "20px" }}>
Total Price: <span>₹{parseFloat(calculateTotalPrice()).toFixed(2)}</span>
</div>
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
    <Modal.Title>
<div className="modal-title">
<div>
<img
className="img-fluid"
src={logo}
alt="Product"
/>
</div>
<span>Create Your Account</span>
</div>
</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit6}>
        <Form.Group controlId="formFirstName" className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your First name"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            isInvalid={!!formErrors.firstName}
          />
          <Form.Control.Feedback type="invalid">{formErrors.firstName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formLastName" className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Last name"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            isInvalid={!!formErrors.lastName}
          />
          <Form.Control.Feedback type="invalid">{formErrors.lastName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email ID</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            isInvalid={!!formErrors.email}
          />
          <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPhone" className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            isInvalid={!!formErrors.phone}
          />
          <Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            isInvalid={!!formErrors.password}
          />
          <Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>
        </Form.Group>

        {formErrors.general && <div className="alert alert-danger">{formErrors.general}</div>}
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
</>
)
}

export default Header