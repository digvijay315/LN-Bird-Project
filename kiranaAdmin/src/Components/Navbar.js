import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './cartcontext'
import logo from '../Components/Assets/Logo (2).png'
import api from '../Components/api';
import Swal from 'sweetalert2';

function Navbar() {

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
    e.preventDefault();
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
  
  





  return (
    <div style={{position:"fixed",left:"0",right:"0",zIndex:"1000",top:"0"}}>

<nav className="navbar navbar-expand-lg" style={{background:"linear-gradient(to right, #fc2779, #ff79b0)"}} >
  <div className="container">
    {/* Brand Logo */}
    <a style={{cursor:"pointer"}} className="navbar-brand text-white d-flex align-items-center" onClick={()=>navigate('/')}>
      <span className="logo-icon me-1">Ⓚ</span><img className="image-fluid" src={logo} style={{width:"175px",height:"50px"}}></img>
    </a>
    {/* Toggler for mobile view */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    {/* Navbar links */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
      <li className="nav-item">
  <Link className="nav-link text-white" to="/">
    Home
  </Link>
</li>
<li className="nav-item">
          <Link className="nav-link text-white" to="/products">
            Product
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/combo">
            Combo
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/blog">
            Blog
          </Link>
        </li>
        <li className="nav-item">
  <Link className="nav-link text-white" to="/contact">
    Contact Us
  </Link>
  
</li>
      </ul>
      {/* <div className="button-header">
      <button className="buttons-header" onClick={handleShow1 }>
      <i className="fa-solid fa-cart-shopping"></i> Cart{length}
      </button>
      <button className="buttons-header" onClick={handleShow }>
      <i className="fa-solid fa-arrow-right-to-bracket"></i>Login
      </button>
      </div> */}
    </div>
  </div>
  </nav>
  <div className="category">
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
   
    

      {/* Search Bar */}
      <div
  className="input-group"
  style={{
    maxWidth: "400px",
    flexGrow: 1,
    display: "flex", // Enables flexbox for child alignment
    justifyContent: "center", // Centers children horizontally
    alignItems: "center", // Centers children vertically
    margin: "auto", // Centers the div itself within the parent
  }}
>
        <input
          className="form-control"
          type="search"
          placeholder="Search your products here"
          aria-label="Search"
        />
        <button className="btn" style={{width:"3rem"}}>
          <i className="fa-solid fa-magnifying-glass"  ></i>
        </button>
      </div>





    </div>
  </div>
</div>


{/* modal code for login----------- */}

<Modal
  show={show}
  onHide={handleClose}
  centered
  dialogClassName="custom-modal"
>
  <Modal.Header style={{backgroundColor:"linear-gradient(to right, #fc2779, #ff79b0)"}} closeButton >
  <Modal.Title
  style={{
    fontSize: '24px',
    fontWeight: '600',
    color: '#fff', // Ensure text is visible on the gradient
    background: 'linear-gradient(to right, #fc2779, #ff79b0)',
    WebkitBackgroundClip: 'text', // Optional: Makes the text itself take the gradient color
    WebkitTextFillColor: 'transparent', // Optional: Fills the text with the gradient
    padding: '10px', // Add padding for better appearance
    borderRadius: '8px', // Round the corners
  }}
>
  Welcome to LNBird
</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div
      style={{
        display: 'flex',
        fontFamily: 'Arial, sans-serif',
        gap: '20px',
        flexWrap: 'wrap', // Makes it responsive
      }}
    >
      {/* Left Section */}
      <div
        style={{
          flex: 1,
          background: 'linear-gradient(135deg, #0078D7, #56CCF2)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2 style={{ marginBottom: '10px', fontWeight: 'bold' }}>Welcome!</h2>
        <p style={{ fontSize: '16px', marginBottom: '20px', textAlign: 'center' }}>
          Sign up with your mobile number to explore our features.
        </p>
        <img
          src="https://c8.alamy.com/comp/2BHAEDT/login-icon-isolated-on-special-blue-round-button-abstract-illustration-2BHAEDT.jpg"
          alt="Sign Up Illustration"
          style={{
            width: '150px',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(255, 255, 255, 0.3)',
          }}
        />
      </div>

      {/* Right Section */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#F9F9F9',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ maxWidth: '300px', width: '100%' }}>
          <label
            htmlFor="mobileNumber"
            style={{
              fontSize: '14px',
              marginBottom: '8px',
              display: 'block',
              color: '#555',
            }}
          >
            Enter Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            placeholder="Enter Your Mobile No."
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              marginBottom: '15px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <p style={{ fontSize: '12px', marginBottom: '20px', color: '#777' }}>
            By continuing, you agree to LNBird's{' '}
            <a href="#" style={{ color: '#0078D7', textDecoration: 'none' }}>
              Terms of Use
            </a>{' '}
            and{' '}
            <a href="#" style={{ color: '#0078D7', textDecoration: 'none' }}>
              Privacy Policy
            </a>.
          </p>
          <button
            style={{
              width: '100%',
              backgroundColor: '#FF5722',
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              marginBottom: '10px',
              boxShadow: '0 4px 8px rgba(255, 87, 34, 0.2)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.boxShadow = '0 6px 12px rgba(255, 87, 34, 0.4)')}
            onMouseLeave={(e) => (e.target.style.boxShadow = '0 4px 8px rgba(255, 87, 34, 0.2)')}
          >
            CONTINUE
          </button>
          <button
            style={{
              width: '100%',
              backgroundColor: 'white',
              color: '#0078D7',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.border = '1px solid #0078D7')}
            onMouseLeave={(e) => (e.target.style.border = '1px solid #ddd')}
          >
            Existing User? Log in
          </button>
        </div>
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
          <span style={{marginLeft:"14rem"}}>Quantity {item.product_quantity1}</span>
        </div>
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
    Total Price: <span>₹{calculateTotalPrice().toFixed(2)}</span>
  </h3>
</div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Closeh
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
                ₹{((parseFloat(item.product_price) || 0) * 1).toFixed(2)}  <span style={{marginLeft:"13rem"}}>Quantity {item.product_quantity1}</span>
              </div>
            </div>
          </div>
        ))}
        <div  style={{ fontWeight: "600", fontSize: "18px", marginTop: "20px" }}>
          Total Price: ₹{calculateTotalPrice().toFixed(2)}
        </div>
      </div>
    </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose4}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit1}>
           Go to Payment
          </Button>
        </Modal.Footer>
      </Modal>



{/* billing form modal end------------------------------------------------------------------------- */}





    </div>
  )
}

export default Navbar