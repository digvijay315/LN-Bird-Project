import React, { useEffect, useState,useRef } from "react";
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
import { Navbar, Nav, NavDropdown, Offcanvas, Container, } from "react-bootstrap";
function Header() {
const [utocken, setutocken] = useState('')
const [validation1, setValidation1] = useState({});




const token=localStorage.getItem('usertoken')
useEffect(()=>
{
console.log(token);

},[])


// console.log(paymentoptions);

const[paymentoptions,setpaymentoptions]=useState()
  const getpaymentoptions = async () => {
    try {
      const resp = await api.get('getpaymenttype');
      setpaymentoptions(resp.data[0]);
    } catch (error) {
      console.log("Error fetching payment types:", error);
    }
  };

  useEffect(() => {
    getpaymentoptions();
  }, []);
console.log(paymentoptions);



const {cart,setcart}=useCart()
const [formData, setFormData] = useState({
apartmentNumber: "",
apartmentName: "",
area: "",
landmark: "",
firstName: "",
lastName: "",
mobileNumber: "",
email:"",
addressType: "Home",
selectstate: "",
selectcity: "",
pincode: "",
setDefault: false,
cartItems: [],
totalPrice:0,
payment_status:"",
payment_mode:""
});


const[length,setlength]=useState(0)
useEffect(()=>
{
const clength=cart.length
setlength(clength)
setFormData({...formData,cartItems:cart})
},[cart])

// console.log(cart);


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

const gstPercentage = 0; // Example: 18% GST (you can change this value)
const gstAmount = (subtotal * gstPercentage) / 100; // Calculate GST

const total = subtotal + gstAmount; // Final total price including GST

return { subtotal, gstAmount, total };
};

useEffect(() => {
const { subtotal, gstAmount, total } = calculateTotalPrice(); // Get values

setFormData(prevData => ({
...prevData,
totalPrice: total, // The final price after adding GST
subtotal: subtotal, // Subtotal without GST
gstAmount: gstAmount, // GST amount
}));
}, [formData.cartItems]); // Dependency array includes cartItems to recalculate on cart update



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
handleCancel()
}

 const [show5, setShow5] = useState(false);
                const [isClosing, setIsClosing] = useState(false);
                const toastRef = useRef(null);

                    const toggleToast = () => {
                   
                      setShow5(true);
                      // document.getElementById('unitlistview').style.filter = 'blur(5px)';
                    };


              const handleCancel = () => {
                //  document.getElementById('unitlistview').style.filter = 'none';
                setIsClosing(true); // trigger slide-out
                setTimeout(() => {
                  setShow5(false);     // hide the toast completely
                  setIsClosing(false); // reset for next open
                }, 500); // duration should match animation time
              };






const[indianCities,setIndianCities]=useState([])
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData((prevData) => {
    let newData = {
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    };

    // If the selected field is state, update cities
    if (name === "selectstate") {
      const cities = statesAndCities[value] || [];
      setIndianCities(cities);
      newData.selectcity = ""; // Reset city when state changes
    }

    validateField(name, newData[name]); // ✅ Validate field on change
    return newData;
  });
};

const validateField = (name, value) => {
setValidation1((prevValidation) => {
let newValidation = { ...prevValidation };

// Trim value for proper validation
const trimmedValue = value?.toString().trim();

// Required Fields
if (["firstName", "lastName", "mobileNumber", "apartmentNumber", "selectstate", "landmark", "area", "pincode", "apartmentName"].includes(name) && !trimmedValue) {
newValidation[name] = `${name.replace(/([A-Z])/g, " $1")} is required!`;
} else {
delete newValidation[name];
}

// Mobile Number Validation
if (name === "mobileNumber" && trimmedValue && !/^\d{10}$/.test(trimmedValue)) {
newValidation.mobileNumber = "Enter a valid 10-digit Mobile Number!";
}

// Pincode Validation
if (name === "pincode" && trimmedValue && !/^\d{6}$/.test(trimmedValue)) {
newValidation.pincode = "Enter a valid 6-digit Pincode!";
}

return newValidation;
});
};

const validateForm1 = () => {
let newValidation = {};

if (!formData.firstName?.trim()) newValidation.firstName = "First Name is required!";
if (!formData.lastName?.trim()) newValidation.lastName = "Last Name is required!";
if (!formData.mobileNumber?.trim() || !/^\d{10}$/.test(formData.mobileNumber))
newValidation.mobileNumber = "Enter a valid 10-digit Mobile Number!";
if (!formData.apartmentNumber?.trim()) newValidation.apartmentNumber = "Apartment Number is required!";
if (!formData.apartmentName?.trim()) newValidation.apartmentName = "Apartment Name is required!";
if (!formData.landmark?.trim()) newValidation.landmark = "Landmark is required!";
if (!formData.selectstate.trim()) newValidation.selectstate = "State is required!";
if (!formData.selectcity.trim()) newValidation.selectcity = "city is required!";
if (!formData.area?.trim()) newValidation.area = "Area is required!";
if (!formData.pincode?.trim() || !/^\d{6}$/.test(formData.pincode))
newValidation.pincode = "Enter a valid 6-digit Pincode!";

setValidation1(newValidation);

return Object.keys(newValidation).length === 0; // ✅ Return true if no errors
};


const handleAddressType = (type) => {
setFormData({ ...formData, addressType: type });
};

const handleSubmit = (e) => {
e.preventDefault();
console.log("Form Data Submitted:", formData);
};




const handlePayment = async () => {
  setFormData({...formData,cartItems:cart})
  if (!validateForm1()) {
    Swal.fire({
      title: 'Validation Error!',
      text: 'Please fill all required fields correctly.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }

  try {
    // Step 1: Create Order on Backend
    const { data: order } = await api.post('payment', { formData });

    // Step 2: Razorpay Checkout Options
    const options = {
      // key: 'rzp_test_kh59VKLP3zCcop', 
      key:'rzp_live_YBXf8NJT3Al7Qc',
      amount: order.amount,
      currency: order.currency,
      name: 'Sky Cosmetics',
      description: 'Test Transaction',
      order_id: order.razorpayOrderId,
      handler: function (response) {
        console.log('Payment Success Response:', response);

        if (response && response.razorpay_payment_id) {
          Swal.fire({
            title: 'Payment Successful!',
            text: 'Thank You for Shopping with Kiona! Keep shopping like this 🛍️😊',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            handleClose4(); // Close modal
            setcart([]); // Clear cart
            setFormData({ ...formData, payment_status: 'success' });

            // Step 3: Send payment details to backend for verification
            verifyPayment(response);
          });

        } else {
          Swal.fire({
            title: 'Payment Error!',
            text: 'Payment Response Invalid',
            icon: 'error',
            confirmButtonText: 'Try Again',
          });
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

    // Step 3: Initialize Razorpay Checkout
    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error('Error during payment:', error);

    Swal.fire({
      title: 'Payment Failed',
      text: 'Something went wrong. Please try again!',
      icon: 'error',
      confirmButtonText: 'OK',
    });

    setFormData({ ...formData, payment_status: 'failed' });
  }
};

// Function to verify payment after success
const verifyPayment = async (paymentResponse) => {
  try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = paymentResponse;

      const paymentVerificationResponse = await api.post('verifyPayment', {
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          signature: razorpay_signature,
      });

      if (paymentVerificationResponse.data.message === "Payment successful, order updated!") {
          Swal.fire({
            title: 'Order Confirmed!',
            text: 'Your order is confirmed and payment is successful.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            navigate("/"); // Redirect to home or any other page
          });

          generateInvoice(paymentVerificationResponse,formData,companyDetails)
      } else {
          Swal.fire({
            title: 'Payment Failed!',
            text: 'There was an issue verifying your payment. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
      }
  } catch (error) {
      console.error('Error verifying payment:', error);
      Swal.fire({
          title: 'Verification Error!',
          text: 'There was an issue verifying your payment.',
          icon: 'error',
          confirmButtonText: 'OK',
      });
  }
};


const handlecodpayment = async () => {
  setFormData({...formData,cartItems:cart})
  if (!validateForm1()) {
    Swal.fire({
      title: 'Validation Error!',
      text: 'Please fill all required fields correctly.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }

  try {
    // Step 1: Create Order on Backend
    const resp = await api.post('codpayment', { formData });
    if(resp.status===200)
    {
      Swal.fire({
        title: 'Order Saved',
        text: 'Products Order Successfully Complete!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

    }

  } catch (error) {
    console.error('Error during payment:', error);

    Swal.fire({
      title: 'Payment Failed',
      text: 'Something went wrong. Please try again!',
      icon: 'error',
      confirmButtonText: 'OK',
    });

    setFormData({ ...formData, payment_status: 'failed' });
  }
};
  


const companyDetails = [
{
name: 'KIONA',
logo: 'E:/niket2/Ecommerce/eco/src/Components/Assets/Logo (2).png', // Ensure this path is accessible
address: 'Office no 326, Kashi Plaza, Kamrej, Surat - 394185',
contact: 'support@kiona.com',
},
];

const generateInvoice = (paymentResponse, formData, companyDetails) => {


const doc = new jsPDF();
const company = companyDetails?.[0] || {}; // Ensure company is defined

const marginLeft = 20;
const marginRight = 140;
let cursorY = 20;
const lineSpacing = 7;

// Function to add page header
const addPageHeader = (pageNumber) => {
doc.setFontSize(18);
doc.setFont("helvetica", "bold");
doc.text("INVOICE", 105, 20, { align: "center" });

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
doc.text(company.address, marginLeft, 60 + lineSpacing);
doc.text(`Contact: ${company.contact}`, marginLeft, 60 + 2 * lineSpacing);

const firstName = formData?.firstName || "";
const lastName = formData?.lastName || "";
const email = formData?.email || "";
const mobileNumber = formData?.mobileNumber || "";

doc.text(`Name: ${firstName} ${lastName}`, marginRight, 60);
doc.text(`Email: ${email}`, marginRight, 60 + lineSpacing);
doc.text(`Phone: ${mobileNumber}`, marginRight, 60 + 2 * lineSpacing);

const addressParts = [
formData?.apartmentNumber || "",
formData?.area || "",
formData?.landmark || "",
formData?.selectstate || "",
formData?.pincode || "",
].filter(part => part.trim() !== "");

const address = `Address: ${addressParts.join(", ")} India`;
const wrappedAddress = doc.splitTextToSize(address, 60);
doc.text(wrappedAddress, marginRight, 80 + 2 * lineSpacing);

doc.setFont("helvetica", "bold");
doc.text(`Invoice Number: ${paymentResponse?.razorpay_payment_id || "N/A"}`, marginLeft, 100);
doc.text(`Order ID: ${paymentResponse?.razorpay_order_id || "N/A"}`, marginLeft, 100 + lineSpacing);
doc.text(`Transaction Date: ${new Date().toLocaleDateString()}`, marginLeft, 100 + 2 * lineSpacing);

doc.setFontSize(10);
doc.text(`Page ${pageNumber}`, 105, 285, { align: "center" });
};

addPageHeader(1);
cursorY = 140;

doc.setFont("helvetica", "bold");
doc.text("Product Details", marginLeft, cursorY);
cursorY += 10;

doc.autoTable({
startY: cursorY,
head: [["S.No", "Product Name", "Quantity", "Unit Price", "Total"]],
body: formData?.cartItems?.map((product, index) => [
index + 1,
product.product_name,
product.product_quantity1,
product.product_price,
(product.product_quantity1 * product.product_price),
]) || [],
theme: "grid",
headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
styles: { fontSize: 10, cellPadding: 3 },
columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 60 }, 2: { cellWidth: 25 }, 3: { cellWidth: 35 }, 4: { cellWidth: 35 } },
margin: { top: 10 },
didDrawPage: function (data) {
if (data.pageNumber > 1) {
doc.setPage(data.pageNumber);
addPageHeader(data.pageNumber);
}
},
});

const totalPages = doc.internal.getNumberOfPages();
doc.setPage(totalPages);

let finalY = doc.lastAutoTable.finalY + 10;
const summaryX = marginRight - 20;
const summaryWidth = 70;
const summaryHeight = 40;

doc.setLineWidth(0.5);
doc.rect(summaryX, finalY, summaryWidth, summaryHeight);

doc.setFont("helvetica", "bold");
doc.text("Summary", summaryX + 5, finalY + 7);
doc.setFont("helvetica", "normal");

const subtotal = formData?.subtotal || 0;
const gstAmount = formData?.gstAmount || 18;
const totalPrice = formData?.totalPrice || 0;
doc.text(`Subtotal: ${subtotal}`, summaryX + 5, finalY + 17);
doc.text(`GST (${gstAmount}%): ${(subtotal * (gstAmount / 100)).toFixed(2)}`, summaryX + 5, finalY + 27);
doc.text(`Grand Total: ${totalPrice}`, summaryX + 5, finalY + 37);

finalY += summaryHeight + 10;

doc.setFont("helvetica", "italic");
doc.text("Thank you for your purchase!", marginLeft, finalY);
doc.text(`For queries, contact us at: ${company.contact}`, marginLeft, finalY + 10);

doc.save(`Invoice_${paymentResponse?.razorpay_payment_id || "N/A"}.pdf`);
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


// ===================================login with otp start=======================================================================
 const [isLoading, setIsLoading] = useState(false);
      const loginwithotp = async (e) => {
        setIsLoading(true)
      e.preventDefault();

      try {
      const response = await api.post("otplogin",{email:loginDetails.email});


      if (response.status === 200) {
      Swal.fire({
      title: "Successful!",
      text: `otp send plz check your email id`,
      icon: "success",
      confirmButtonText: "OK",
      });

      handleClose();
      handleShow8()
      } else {
      Swal.fire({
      title: " Failed",
      text: "plz enter valid email id",
      icon: "error",
      confirmButtonText: "Try Again",
      });
      }
      } catch (error) {
      Swal.fire({
      title: "Error",
      text: "plz enter valid email id",
      icon: "error",
      confirmButtonText: "OK",
      });
      }finally
      {
        setIsLoading(false)
      }
      };


// ================================================login with otp end==============================================================

// ============================================verify otp start===========================================================


const [show8, setShow8] = useState(false);

const handleClose8 = () => setShow8(false);
const handleShow8 = () =>setShow8(true);

const[otp,setotp]=useState()

const verifyotpandlogin = async (e) => {
e.preventDefault();

try {
const response = await api.post("verifyotpforlogin", {email:loginDetails.email,otp:otp});


if (response.status === 200) {
Swal.fire({
title: "Login Successful!",
text: `Welcome back, ${response.data.user}!`,
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

// ========================================================verify otp end=====================================================





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



const [sidebarOpen, setSidebarOpen] = useState(false);
const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

// Function to check if device is mobile based on screen width
useEffect(() => {
const checkIfMobile = () => {
setIsMobile(window.innerWidth < 992);
};

// Check initially
checkIfMobile();

// Add event listener for window resize
window.addEventListener('resize', checkIfMobile);

// Clean up event listener on component unmount
return () => {
window.removeEventListener('resize', checkIfMobile);
};
}, []);

// Function to toggle sidebar
const toggleSidebar = () => {
setSidebarOpen(!sidebarOpen);
// Prevent body scrolling when sidebar is open
document.body.style.overflow = !sidebarOpen ? 'hidden' : '';
};

// Function to handle navigation click and close sidebar
const handleNavClick = (callback) => {
setSidebarOpen(false);
document.body.style.overflow = '';
if (callback) {
callback();
}
};


const statesAndCities = {
  AndhraPradesh: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  ArunachalPradesh: ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"],
  Assam: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
  Bihar: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  Delhi: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  Goa: ["North Goa", "South Goa"],
  Gujarat: ["Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang", "Gir Somnath", "Jamnagar", "Junagadh", "Kachchh", "Kheda", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  Haryana: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Narnaul", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  HimachalPradesh: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kullu", "Kullu", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  Jharkhand: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
  Karnataka: ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
  Kerala: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kottayam", "Kollam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  MadhyaPradesh: ["Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhindwara", "Datia","Damoh" "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Rewa", "Rajgarh", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  Maharashtra: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  Manipur: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
  Meghalaya: ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Ri Bhoi", "West Garo Hills", "West Khasi Hills"],
  Mizoram: ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],
  Nagaland: ["Dimapur", "Kohima", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
  Odisha: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Ganjam", "Gajapati", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
  Punjab: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawan Shehar", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar", "Sri Muktsar Sahib"],
  Rajasthan: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bhilwara", "Bikaner", "Bundi", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Tonk", "Udaipur"],
  Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  TamilNadu: ["Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kancheepuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "The Nilgiris", "Thoothukudi", "Tiruvallur", "Tirunelveli", "Tirupur", "Vellore", "Viluppuram", "Virudhunagar"],
  Telangana: ["Adilabad", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba", "Kamareddy", "Karimnagar", "Khammam", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal", "Nalgonda", "Nagarkurnool", "Nirmal", "Nizamabad", "Peddapalli", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Warangal", "Khammam", "Kothagudem"],
  Tripura: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  UttarPradesh: ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lucknow", "Mathura", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar","Noida", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shrawasti", "Siddharth Nagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
  WestBengal: ["Alipurduar", "Bankura", "Birbhum", "Burdwan", "Cooch Behar", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "North Dinajpur", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "South Dinajpur", "Uttar Dinajpur"],
  Uttrakhand:["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun","Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh","Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  AndamanAndNicobarIslands: ["Nicobar", "North and Middle Andaman", "South Andaman"],
  Chandigarh: ["Chandigarh"],
  DadraAndNagarHaveliAndDamanAndDiu: ["Dadra and Nagar Haveli", "Daman", "Diu"],
  JammuAndKashmir: ["Anantnag", "Bandipore", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
  Ladakh: ["Kargil", "Leh"],
  Lakshadweep: ["Agatti", "Amini", "Andrott", "Bitra", "Chetlat", "Kavaratti", "Kadmat", "Kalpeni", "Kiltan", "Minicoy"],
  Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  Chhattisgarh: ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg",
  "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba",
  "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"
],

};



  // =========================================track your order start=============================================================

const [show2, setShow2] = useState(false);
  
    const handleClose2 = () => 
      {
        setShow2(false);
        settrackingdata(null)
      }
    const handleShow2 = (item) => 
      {
        setShow2(true);
      }

      const[trackingid,settrackingid]=useState("")
      const[trackingdata,settrackingdata]=useState(null)
      const trackOrder = async () => {
        try {

          const res = await api.post(`track-order/${trackingid}`);
          settrackingdata(res.data.data)
        } catch (error) {
          console.log(error);
          
        }
      };
      
   
// =================================================track your order end=============================================================


return (

<>





<div style={{position:"fixed",left:"0",right:"0",zIndex:"1000",top:"0"}}>

{/* ---------------------------------------------------------------- */}

{["lg"].map((expand) => (
<Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" style={{ backgroundColor: "#f8f9f3", height: "112px" }}>
<Container fluid style={{ display: "flex", justifyContent: "space-between", alignItems: "center",marginTop:"75px" }}>
{/* Mobile Toggle Button */}
<Navbar.Toggle className="troggle-navbar-button" aria-controls={`offcanvasNavbar-expand-${expand}`} style={{ width:"50px",backgroundColor:"black",marginBottom:"10px" }} />

{/* Brand Name Centered */}
<Navbar.Brand
className="position-absolute"
style={{
left: "50%",
transform: "translateX(-50%)",
fontSize: "40px",
fontWeight: "400",
fontFamily: '"ITC Modern No 216", serif',
top: "10px",
color:"black",
cursor:"pointer"
}}
onClick={() => navigate("/")}
>
KIONA
</Navbar.Brand>

{/* Cart & User Icons */}
<div
className="d-flex justify-content-end align-items-center"
style={{
position: "absolute",
top: "40px",
right: "20px",
gap: "20px",
}}
>
{/* Cart Icon */}
<div style={{ position: "relative", cursor: "pointer" }} onClick={toggleToast}>
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
<i onClick={handleShow} className="fa-regular fa-user" style={{ fontSize: "25px", color: "#333", cursor: "pointer" }}></i>
</div>

{/* Offcanvas Menu */}
<Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
<Offcanvas.Header closeButton>
<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>KIONA</Offcanvas.Title>
</Offcanvas.Header>
<Offcanvas.Body>
<Nav className="justify-content-center flex-grow-1 pe-3" style={{gap:"20px"}}>
<Nav.Link as={Link} to="/">Home</Nav.Link>
<Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>

{/* Product Dropdown */}
<NavDropdown title="Products" id="offcanvasNavbarDropdown">
<NavDropdown.Item onClick={() => navigatecategory("shampoo")}>Shampoo</NavDropdown.Item>
<NavDropdown.Item onClick={() => navigatecategory("face wash")}>Face Wash</NavDropdown.Item>
<NavDropdown.Item onClick={() => navigatecategory("hair oil")}>Hair Oil</NavDropdown.Item>
</NavDropdown>

<Nav.Link as={Link} to="/blog1">Blogs</Nav.Link>
<Nav.Link as={Link} onClick={handleShow2}>Track Your Order</Nav.Link>
<Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
<Nav.Link as={Link} to="/combo">Combo</Nav.Link>

{/* Terms & Policies Dropdown */}
<NavDropdown title="Terms & Policies" id="termsDropdown">
<NavDropdown.Item as={Link} to="/privacypolicy">Privacy Policy</NavDropdown.Item>
<NavDropdown.Item as={Link} to="/ewaste">E-Waste Policy</NavDropdown.Item>
<NavDropdown.Item as={Link} to="/cancelpolicy">Cancellation & Return</NavDropdown.Item>
<NavDropdown.Item as={Link} to="/deliverycancel">Shipping & Delivery</NavDropdown.Item>
<NavDropdown.Item as={Link} to="/faq">FAQ</NavDropdown.Item>
<NavDropdown.Item as={Link} to="/term&condition">Terms & Conditions</NavDropdown.Item>
</NavDropdown>
</Nav>
</Offcanvas.Body>
</Navbar.Offcanvas>
</Container>
</Navbar>
))}



{/* ------------------------------------------------------------------ */}

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
color: "red",
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
Login
</button>
<button
onClick={loginwithotp}
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
Login With Otp
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

<>
    {isLoading && (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}>
        <div style={{
          background: "rgba(9, 101, 52, 0.8)",
          padding: "20px 40px",
          borderRadius: "10px",
          textAlign: "center",
          color: "white",
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: "5px solid white",
            borderTop: "5px solid transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 10px",
          }}></div>
          <p>Sending otp...</p>
        </div>
      </div>
    )}
  </>


</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
Close
</Button>
</Modal.Footer>
</Modal>




{/* modal login end----------------------- */}


{/* modal----------------------------------------------------------------- */}

{/* <Modal show={show1} onHide={handleClose1}>
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
Total Price: <span >
₹{formData.subtotal ? formData.subtotal.toFixed(2) : '0.00'}
</span>
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
</Modal> */}

<div
  ref={toastRef}
  className={`feedback-toast ${show5 ? (isClosing ? 'hide' : 'show') : ''}`}
  style={{ zIndex: 9999 }}
>
  <div className="toast show">
    <div className="toast-header">
            <div>
            <img
            className="img-fluid"
            src={logo}
            alt="Product"
            style={{height:"40px"}}
            />
            </div>
            <div>
               <span style={{fontWeight:"bold",fontSize:"16px"}}>Your Cart Details</span>
            </div>
           
         
    </div>
    <div className="toast-body"  style={{maxHeight: '90vh',overflowY: 'auto',paddingRight: '10px',}}>
        {cart.map((item, index) => (
        <div key={index} className="cart-item">
        <img src={item.product_image} alt={item.product} />
        <div className="cart-item-info">
        <div className="cart-item-title">{item.product_name}</div>

        <div className="cart-item-price">
        ₹{((parseFloat(item.product_price) || 0) * 1).toFixed(2)}
        <span style={{marginLeft:"4rem"}}>Quantity {item.product_quantity1}</span>

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
        Total Price: <span >
        ₹{formData.subtotal ? formData.subtotal.toFixed(2) : '0.00'}
        </span>
        </h3>
        </div>

      <button className="btn btn-danger w-30" onClick={handleCancel}>Cancel</button>
      <button className="btn btn-success w-60" style={{ marginLeft: "10%" }} onClick={handleShow4}>CheckOut</button>
    </div>
  </div>
</div>

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
<form>
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
{validation1.apartmentNumber && <span style={{ color: "red", fontSize: "12px" }}>{validation1.apartmentNumber}</span>}
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
{validation1.apartmentName && <span style={{ color: "red", fontSize: "12px" }}>{validation1.apartmentName}</span>}
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
{validation1.area && <span style={{ color: "red", fontSize: "12px" }}>{validation1.area}</span>}
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
{validation1.landmark && <span style={{ color: "red", fontSize: "12px" }}>{validation1.landmark}</span>}
</div>
</div>
<div className="d-flex justify-content-between" style={{ gap: "20px" }}>
  {/* State Dropdown */}
  <div className="col-md-6">
    <label htmlFor="state" className="form-label">
      *Select State
    </label>
    <select
      className="form-control" id="state" name="selectstate"  value={formData.selectstate} onChange={handleChange}
      style={{
        borderRadius: "5px",
        padding: "10px",
        fontSize: "14px",
      }}
    >
      <option value="" disabled>
        Select a state
      </option>
      {Object.keys(statesAndCities).map((state, index) => (
    <option key={index} value={state}>
      {state}
    </option>
  ))}
    </select>
    {validation1.selectstate && <span style={{ color: "red", fontSize: "12px" }}>{validation1.selectstate}</span>}
  </div>

  {/* City Dropdown */}
  <div className="col-md-6">
    <label htmlFor="city" className="form-label">
      *Select City
    </label>
    <select
      className="form-control"
      id="city"
      name="selectcity"
      value={formData.selectcity}
      onChange={handleChange}
      style={{
        borderRadius: "5px",
        padding: "10px",
        fontSize: "14px",
      }}
    >
      <option value="" disabled>
        Select a city
      </option>
      {indianCities.map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </select>
    {validation1.selectcity && <span style={{ color: "red", fontSize: "12px" }}>{validation1.selectcity}</span>}
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
required
onChange={handleChange}
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
{validation1.pincode && <span style={{ color: "red", fontSize: "12px" }}>{validation1.pincode}</span>}
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
{validation1.firstName && <span style={{ color: "red", fontSize: "12px" }}>{validation1.firstName}</span>}
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
required
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
{validation1.lastName && <span style={{ color: "red", fontSize: "12px" }}>{validation1.lastName}</span>}
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
{validation1.mobileNumber && <span style={{ color: "red", fontSize: "12px" }}>{validation1.mobileNumber}</span>}
</div>

<div className="col-md-6">
<label htmlFor="email" className="form-label">
Email Id
</label>
<input
type="text"
className="form-control"
id="email"
name="email"
value={formData.email }
onChange={handleChange}
placeholder="e.g. Doe"
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
</div>

<div className="col-md-6">
    <label htmlFor="city" className="form-label">
      *Select payment Type
    </label>
    <select
      className="form-control"
      id="payment_mode"
      name="payment_mode"
      onChange={handleChange}
      style={{
        borderRadius: "5px",
        padding: "10px",
        fontSize: "14px",
      }}
    >
      {
        paymentoptions?.payment_type === "Only ONLINE" ? (
      <>
      <option>---select---</option>
      <option value="online">online</option>
      </>
    ) :  paymentoptions?.payment_type  === "Only COD" ? (
      <>
      <option>---select---</option>
      <option value="cod">cod</option>
      </>
    ) : (
      <>
        <option>---select---</option>
        <option value="online">online</option>
        <option value="cod">cod</option>
      </>
    )
  }
     
    </select>
  </div>

{/* <div className="mb-3">
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
</div> */}
{/* <h5 style={{ marginTop: "20px", fontWeight: "600" }}>Address Type</h5> */}
{/* <div className="mb-3 address-type" style={{ marginBottom: "20px" }}>
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
</div> */}
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
₹{formData.subtotal ? formData.subtotal.toFixed(2) : '0.00'}
</span>
<span style={{fontSize:"12px"}}>(Including gst)</span>
</div>

{/* <div style={{
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
₹{formData.gstAmount ? formData.gstAmount.toFixed(2) : '0.00'}
</span>
</div> */}

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
₹{formData.totalPrice ? formData.totalPrice.toFixed(2) : '0.00'}
</span>
</div>
</div>
</div>

</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose4}>
Close
</Button>
<Button variant="primary" onClick={handlePayment} style={{display:formData.payment_mode==="online"?"flex":"none"}}>
Go to Payment
</Button>
<Button variant="primary" onClick={handlecodpayment} style={{display:formData.payment_mode==="cod"?"flex":"none"}}>
Order Now
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


{/* =============================verify otp modal start================================================================ */}

<Modal show={show8} onHide={handleClose8} centered>
<Modal.Header>
<Modal.Title>
Verify Otp
</Modal.Title>
</Modal.Header>
<Modal.Body
style={{
padding: "20px",
fontFamily: "'Arial', sans-serif",
}}
>

<input
type="number"
placeholder="Enter your otp "
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
onChange={(e)=>setotp(e.target.value)}
/>


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
onClick={handleClose8}
>
Close
</Button>
<Button
variant="primary"
onClick={verifyotpandlogin}
>
Verify Otp
</Button>
</Modal.Footer>
</Modal>


{/* ======================================verify otp end==================================================== */}


  <Modal  show={show2} onHide={handleClose2} size='lg' style={{transition:"0.5s ease-in"}}>
            <Modal.Header>
              <Modal.Title>Start Tracking<br></br>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
       
       <div className="row">

       <div className="col-md-6" style={{fontSize:"12px",marginTop:"10px"}}><label className="labels" style={{fontSize:"14px"}}>Enter Your AWB No.</label>
                 <input type="text" required="true" className="form-control form-control-sm"  style={{fontSize:"12px"}} onChange={(e)=>settrackingid(e.target.value)}/>
                 </div>
                

                 {trackingdata && (
      <div style={{ marginTop: '20px', fontSize: '13px', lineHeight: '1.8' }}>
        <h6 style={{ fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Shipment Details</h6>

        <div className="row">

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>AWB Number</div>
  <div>{trackingdata.awb_number}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Courier ID</div>
  <div>{trackingdata.courier_id}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Courier Name</div>
  <div>{trackingdata.courier_name}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Order ID</div>
  <div>{trackingdata.order_id}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Order Number</div>
  <div>{trackingdata.order_number}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Order Type</div>
  <div>{trackingdata.order_type}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Payment Type</div>
  <div>{trackingdata.payment_type}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Status</div>
  <div style={{ color: "red", fontWeight: "500" }}>{trackingdata.status}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Created</div>
  <div>{trackingdata.created}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Event Time</div>
  <div>{trackingdata.event_time}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Expected Delivery</div>
  <div>{trackingdata.edd || 'N/A'}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Delivered Date</div>
  <div>{trackingdata.delivered_date || 'N/A'}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Pickup Date</div>
  <div>{trackingdata.pickup_date || 'N/A'}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Shipped Date</div>
  <div>{trackingdata.shipped_date || 'N/A'}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>RTO AWB</div>
  <div>{trackingdata.rto_awb || 'N/A'}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>RTO Initiate Date</div>
  <div>{trackingdata.rto_initiate_date || 'N/A'}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>RTO Status</div>
  <div>{trackingdata.rto_status || 'N/A'}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>RTO Warehouse ID</div>
  <div>{trackingdata.rto_warehouse_id}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Warehouse ID</div>
  <div>{trackingdata.warehouse_id}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Shipment Info</div>
  <div>{trackingdata.shipment_info || 'N/A'}</div>
</div>

</div>
       

        <h6 className="mt-4" style={{ fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Tracking History</h6>
        {trackingdata.history && trackingdata.history.length > 0 ? (
          <div>
            {trackingdata.history.map((item, index) => (
              <div key={index} style={{
                backgroundColor: "#f1f3f5",
                border: "1px solid #ced4da",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px"
              }}>
                <div><strong>Status Code:</strong> {item.status_code}</div>
                <div><strong>Message:</strong> {item.message || 'No message'}</div>
                <div><strong>Event Time:</strong> {item.event_time}</div>
                <div><strong>Location:</strong> {item.location || 'N/A'}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No history available.</p>
        )}
      </div>
    )}
             
      </div>
      
        

  

            </Modal.Body>
            <Modal.Footer>
         
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
              <Button variant="secondary" onClick={trackOrder}>
                Show Details
              </Button>
            </Modal.Footer>
          </Modal>




</div>
</>
)
}

export default Header