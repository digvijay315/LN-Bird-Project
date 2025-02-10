import React from 'react';
// import '../css/login1.css';
import myImage from '../images/37023.jpg';
import  { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is imported

function Login1() {


  const [show1, setshow1] = useState(false);

const handleClose1 = () =>{
    setshow1(false);
    document.getElementById("main").style.filter = "none";  
    }
const handleShow1=()=>
{
      setshow1(true);
      document.getElementById("main").style.filter = "blur(5px)";
}

const [show2, setshow2] = useState(false);

const handleClose2 = () =>{
    setshow2(false);
    document.getElementById("main").style.filter = "none";  
    }
const handleShow2=()=>
{
      setshow2(true);
      document.getElementById("main").style.filter = "blur(5px)";
}


  return (
    <div>

<div class="form-body without-side" id='main' style={{backgroundImage: `url(${myImage})`, height:"100vh",backgroundRepeat:"no-repeat",backgroundSize:"cover",}}>
        <div class="iofrm-layout" style={{marginLeft:"60%"}}>
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <div class="website-logo-inside logo-normal">
                            <a href="index.html">
                                <div >
                                    <img class="logo-size" src="https://webapp.friska.ai/static/media/logo_lg.7a15c556eacfc46586a9a097255a16f3.svg" alt=""/>
                                </div>
                            </a>
                        </div>
                        <h3 class="font-md">Login to account</h3>
                        <p>Access to the most powerfull tool in the entire design and web industry.</p>
                        <form>
                            <input class="form-control" type="text" name="username" placeholder="E-mail Address" required/>
                            <input class="form-control" type="password" name="password" placeholder="Password" required/>
                            <div class="form-button d-flex align-items-center">
                                <button id="submit" type="submit" class="btn btn-primary">Login</button><a  onClick={handleShow1} style={{cursor:"pointer"}}>Forget password?</a>
                            </div>
                        </form>
                        {/* <div class="other-links social-with-title">
                            <div class="text">Or login with</div>
                            <a href="#"><i class="fab fa-facebook-f"></i>Facebook</a><a href="#"><i class="fab fa-google"></i>Google</a><a href="#"><i class="fab fa-linkedin-in"></i>Linkedin</a>
                        </div> */}
                        <div class="page-links">
                            <a onClick={handleShow2} style={{cursor:"pointer"}}>Register new account</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Modal show={show1} onHide={handleClose1} size='lg'>
          
            <Modal.Body >
            <div class="form-body without-side" style={{backgroundImage: `url(${myImage})`, height:"100vh",backgroundRepeat:"no-repeat",backgroundSize:"cover",}}>
        <div class="iofrm-layout">
            <div class="form-holder">
                <div class="form-content" >
                    <div class="form-items" style={{backgroundColor:"white"}}>
                        <div class="website-logo-inside logo-normal">
                            <a href="index.html">
                                <div>
                                    <img  src="https://webapp.friska.ai/static/media/logo_lg.7a15c556eacfc46586a9a097255a16f3.svg" alt=""/>
                                </div>
                            </a>
                        </div>
                        <h3 class="font-md">Password Reset</h3>
                        <p>To reset your password, enter the email address you use to sign in to iofrm</p>
                        <form>
                            <input class="form-control" type="text" name="username" placeholder="E-mail Address" required/>
                            <div class="form-button d-flex">
                                <button id="submit" type="submit" class="btn btn-primary">Send Reset Link</button>
                            </div>
                        </form>
                    </div>
                    <div class="form-sent">
                        <div class="tick-holder">
                            <div class="tick-icon"></div>
                        </div>
                        <h3>Password link sent</h3>
                        <p>Please check your inbox iofrm@iofrmtemplate.io</p>
                        <div class="info-holder">
                            <span>Unsure if that email address was correct?</span> <a href="#">We can help</a>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            </Modal.Body>
           
      </Modal>


      <Modal show={show2} onHide={handleClose2} size='lg'>
          
            <Modal.Body >
      
            <div class="form-body without-side" style={{backgroundImage: `url(${myImage})`, height:"100vh",backgroundRepeat:"no-repeat",backgroundSize:"cover",}}>
        <div class="iofrm-layout">
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items" style={{backgroundColor:"white"}}>
                        <div class="website-logo-inside logo-normal">
                            <a href="index.html">
                                <div>
                                    <img class="logo-size" src="https://webapp.friska.ai/static/media/logo_lg.7a15c556eacfc46586a9a097255a16f3.svg" alt=""/>
                                </div>
                            </a>
                        </div>
                        <h3 class="font-md">Register new account</h3>
                        <p>Access to the most powerfull tool in the entire design and web industry.</p>
                        <form>
                            <input class="form-control" type="text" name="name" placeholder="Full Name" required/>
                            <input class="form-control" type="email" name="email" placeholder="E-mail Address" required/>
                            <input class="form-control" type="password" name="password" placeholder="Password" required/>
                            <input class="form-control" type="number" name="age" placeholder="Age" required/>
                            <input class="form-control" type="number" name="height" placeholder="Height" required/>
                            <div class="form-button  d-flex">
                                <button id="submit" type="submit" class="btn btn-primary">Register</button>
                            </div>
                        </form>
                        {/* <div class="other-links social-with-title">
                            <div class="text">Or register with</div>
                            <a href="#"><i class="fab fa-facebook-f"></i>Facebook</a><a href="#"><i class="fab fa-google"></i>Google</a><a href="#"><i class="fab fa-linkedin-in"></i>Linkedin</a>
                        </div> */}
                        <div class="page-links">
                            <a href="login34.html">Login to account</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

            </Modal.Body>
           
      </Modal>

        
    </div>
  )
}

export default Login1
