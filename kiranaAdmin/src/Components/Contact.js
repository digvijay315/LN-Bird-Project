import React from 'react'
import './Contact.css';
import Header from './Header';
import Footer from './footer';

function Contact() {
  return (
    <div>

        <div>
            <Header/>
        </div>
 {/*star contaus page------------------------------------------------------------------------------  */}
 <div className='container' style={{textAlign:"center", marginTop:"30px"}}>
    <div className='row'>
        <div className='col'>
          <span style={{fontSize:"40px", fontWeight:"bold"}}>Get In Touch</span>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita quaerat unde quam dolor culpa veritatis inventore, aut commodi eum veniam vel.</p>
        </div>
    </div>
</div>

<div className="container" style={{marginTop:"30px"}}>
  <div className="row" style={{display:"flex",gap:"10px", justifyContent:"center"}}>
    <div className="col-md-4" style={{ textAlign: "center", backgroundColor: "#f3f3f6", height: "13rem",width:"20rem", borderRadius:"10px"}}>
      <div style={{marginTop:"40px"}}>
        <i className="fa-solid fa-location-dot" style={{ fontSize: "40px" }}></i><br />
        <span>102 Street 2714 Donovan</span>
        <p>Lorem ipsum dolor sit amet consectetur</p>
      </div>
    </div>
    <div className="col-md-4" style={{ textAlign: "center", backgroundColor: "#f3f3f6",height: "13rem",width:"20rem",borderRadius:"10px" }}>
      <div style={{marginTop:"40px"}}>
        <i className="fa-solid fa-phone-volume" style={{ fontSize: "40px" }}></i><br />
        <span>+02 1234 567 88</span>
        <p>Lorem ipsum dolor sit amet consectetur</p>
      </div>
    </div>
    <div className="col-md-4" style={{ textAlign: "center", backgroundColor: "#f3f3f6",height: "13rem",width:"20rem",borderRadius:"10px" }}>
      <div style={{marginTop:"40px"}}>
        <i className="fa-solid fa-envelope" style={{ fontSize: "40px" }}></i><br />
        <span>info@example.com</span>
        <p>Lorem ipsum dolor sit amet consectetur</p>
      </div>
    </div>
  </div>
</div>

{/* contactus form start------------------------------------------------------------------------ */}

<div className="container contact" style={{ marginTop: "70px" }}>
  {/* Centered Header Section */}
  <div className="row" style={{ textAlign: "center" }}>
    <div className="col" style={{ marginTop: "80px" }}>
      <span style={{ fontSize: "35px", fontWeight: "bold" }}>Send Us</span>
      <p style={{ fontSize: "15px" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quaerat unde quam dolor culpa veritatis
        <br /> inventore, aut commodi eum veniam vel.
      </p>
    </div>
  </div>
  <hr />

  {/* Centered Form Section */}
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="form-group" style={{ textAlign: "left", marginBottom: "20px" }}>
          <label>Your Name *</label>
          <input type="text" className="form-control" style={{ backgroundColor: "lightgray" }} />
        </div>
      </div>

      <div className="col-md-5">
        <div className="form-group" style={{ textAlign: "left", marginBottom: "20px" }}>
          <label>Your Email *</label>
          <input type="email" className="form-control" style={{ backgroundColor: "lightgray" }} />
        </div>
      </div>
    </div>

    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="form-group" style={{ textAlign: "left", marginBottom: "20px" }}>
          <label>Subject *</label>
          <input type="text" className="form-control" style={{ backgroundColor: "lightgray" }} />
        </div>
      </div>
    </div>

    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="form-group" style={{ textAlign: "left", marginBottom: "20px" }}>
          <label>Message *</label>
          <textarea className="form-control" style={{ backgroundColor: "lightgray", height: "100px" }} />
        </div>
      </div>
    </div>

    <div className="row justify-content-center">
      <div className="col-md-10" style={{ textAlign: "center" }}>
        <button type="button" className="btn btn-primary" style={{ width: "100px" }}>Submit</button>
      </div>
    </div>
  </div>
</div>


<Footer/>




    </div>
  )
}

export default Contact