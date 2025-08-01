import React from 'react';
// import '../css/login1.css';
import myImage from '../images/37023.jpg';
import friska from '../images/FriskaNutriAI_Logo 1.png'
import  { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is imported
import axios from 'axios';
import { Icon } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function Login1() {

    const navigate=useNavigate()

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


const[login,setlogin]=useState({email:"",password:""})
const userlogin=async()=>
{
    try {
        const resp= await axios.post('https://friskaaiapi.azurewebsites.net/login',login)
        console.log(resp);
        
        if(resp.status===200)
        {
            localStorage.setItem('id',resp.data.UserID)
            localStorage.setItem('username',resp.data.UserName)

            const resp1=await axios.get(`https://friskaaiapi.azurewebsites.net/get-diet-info/${resp.data.UserID}`)
            console.log(resp1);
            
            
            Swal.fire({
                        title: 'Login!',
                        text: 'Welcome to Friska NutriAi!',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                      })  

                      if(resp1.data.message==="User dietary info retrieved successfully")
                      {
                        navigate('/chatai')

                      }
                      else
                      {
                        navigate('/dietform')
                      }
        }

     
    } catch (error) {
        Swal.fire({
            title: 'Login!',
            text: 'Please check username and password!',
            icon: 'error',
            confirmButtonText: 'Ok',
          })
        
    }
}


const[user,setuser]=useState({email:"",username:"",password:""})
const signup=async()=>
{
    try {
        const resp= await axios.post('https://friskaaiapi.azurewebsites.net/signup',user)
        console.log(resp);
        console.log(user);
        
        if(resp.status===200)
        {
            Swal.fire({
                        title: 'Registration!',
                        text: 'User Registration Successfull!',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                      })
        
                      setTimeout(() => {
                        window.location.reload() 
                    }, 2000);

        }
     
    } catch (error) {
        Swal.fire({
            title: 'Login!',
            text: 'Please check username and password!',
            icon: 'error',
            confirmButtonText: 'Ok',
          })
        
    }
}


  return (
    <div>

<div class="form-body without-side" id='main' style={{ backgroundColor:"#783894",height:"104vh"}}>
        <div class="iofrm-layout" style={{marginLeft:"0%",marginTop:"-2%"}}>
            <div class="form-holder">
                <div class="form-content" >
                    <div class="form-items" style={{backgroundColor:"white"}}>
                        <div class="website-logo-inside logo-normal">
                            <a href="index.html">
                                <div >
                                    <img class="logo-size" src={friska} style={{height:"40px",width:"250px",paddingRight:"20px"}} alt=""/>
                                </div>
                            </a>
                        </div>
                        <h3 class="font-md">Login to account</h3>
                        <p style={{fontWeight:"bold",fontSize:"14px"}}>AI Powered nutrition that adapts to you because one size doesn't fit all.</p>
                        
                            <input class="form-control" style={{backgroundColor:"white",color:"black",fontWeight:"bold",border:"1px solid black"}} type="text" name="username" placeholder="E-mail Address" required onChange={(e)=>setlogin({...login,email:e.target.value})}/>
                            <input class="form-control" style={{backgroundColor:"white",color:"black",fontWeight:"bold",border:"1px solid black"}} type="password" name="password" placeholder="Password" required onChange={(e)=>setlogin({...login,password:e.target.value})}/>
                            <div class="form-button d-flex align-items-center">
                                <button id="submit"  class="btn btn-primary" onClick={userlogin}>Login</button><a  onClick={handleShow1} style={{cursor:"pointer",fontWeight:"bold"}}>Forget password?</a>
                            </div>
                     
                        {/* <div class="other-links social-with-title">
                            <div class="text">Or login with</div>
                            <a href="#"><i class="fab fa-facebook-f"></i>Facebook</a><a href="#"><i class="fab fa-google"></i>Google</a><a href="#"><i class="fab fa-linkedin-in"></i>Linkedin</a>
                        </div> */}
                        <div class="page-links" style={{paddingTop:"20px"}}>
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
                                    <img  src={friska} style={{height:"30px",width:"200px",paddingRight:"20px"}} alt=""/>
                                </div>
                            </a>
                        </div>
                        <h3 class="font-md">Password Reset</h3>
                        <p style={{fontWeight:"bold",fontSize:"12px"}}>To reset your password, enter the email address you use to sign in to friska</p>
                        <form>
                            <input class="form-control" style={{backgroundColor:"white",color:"black",fontWeight:"bold",border:"1px solid black"}} type="text" name="username" placeholder="E-mail Address" required/>
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
                                    <img class="logo-size" src={friska} style={{height:"40px",width:"250px",paddingRight:"20px"}} alt=""/>
                                </div>
                            </a>
                        </div>
                        <h3 class="font-md">Register new account</h3>
                        <p style={{fontWeight:"bold",fontSize:"14px"}}>AI Powered nutrition that adapts to you because one size doesn't fit all.</p>
                        
                            <input class="form-control" style={{backgroundColor:"white",color:"black",fontWeight:"bold",border:"1px solid black"}} type="text" name="username" placeholder="Full Name" required onChange={(e)=>setuser({...user,username:e.target.value})}/>
                            <input class="form-control" style={{backgroundColor:"white",color:"black",fontWeight:"bold",border:"1px solid black"}} type="email" name="email" placeholder="E-mail Address" required onChange={(e)=>setuser({...user,email:e.target.value})}/>
                            <input class="form-control" style={{backgroundColor:"white",color:"black",fontWeight:"bold",border:"1px solid black"}} type="password" name="password" placeholder="Password" required onChange={(e)=>setuser({...user,password:e.target.value})}/>
                         
                            <div class="form-button  d-flex">
                                <button id="submit"  class="btn btn-primary" onClick={signup}>Register</button>
                            </div>
                       
                        {/* <div class="other-links social-with-title">
                            <div class="text">Or register with</div>
                            <a href="#"><i class="fab fa-facebook-f"></i>Facebook</a><a href="#"><i class="fab fa-google"></i>Google</a><a href="#"><i class="fab fa-linkedin-in"></i>Linkedin</a>
                        </div> */}
                        <div class="page-links">
                            <a onClick={()=>window.location.reload()} style={{cursor:"pointer",paddingTop:"10px"}}>Login to account</a>
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
