import React from 'react'
import  { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is imported

function Login() {

    const styles = {
        body: {
          fontFamily: "'Arial', sans-serif",
          backgroundColor: "#f4f4f9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          margin: 0,
        },
        loginContainer: {
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "30px",
          width: "350px",
          textAlign: "center",
        },
        loginHeader: {
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "20px",
        },
        inputContainer: {
          marginBottom: "15px",
          position: "relative",
          
        },
        inputField: {
          width: "80%",
          padding: "12px",
          border: "2px solid #ccc",
          borderRadius: "5px",
          fontSize: "14px",
          transition: "border-color 0.3s",
        },
        inputFieldFocus: {
          borderColor: "#6c63ff",
          outline: "none",
        },
        passwordContainer: {
          display: "flex",
          alignItems: "center",
        },
        eyeIcon: {
          position: "absolute",
          right: "150px",
          cursor: "pointer",
          fontSize: "20px",
          color: "#6c63ff",
          transition: "color 0.3s",
        },
        eyeIconHover: {
          color: "#5a55d7",
        },
        submitBtn: {
          marginTop:"20px",
          marginLeft:"50px",
          width: "70%",
          padding: "12px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#6c63ff",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        },
        submitBtnHover: {
          backgroundColor: "#5a55d7",
        },
        forgotPassword: {
            fontWeight:"bold",
            display: "block",
            marginTop: "10px",
            fontSize: "14px",
            color: "#6c63ff",
            textDecoration: "none",
            cursor: "pointer",
          },
          forgotPasswordHover: {
            textDecoration: "underline",
          },
      };

      const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the login submission logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };


  const [show1, setshow1] = useState(false);

const handleClose1 = () => setshow1(false);
const handleShow1=async()=>
{
      setshow1(true);

}



  return (
    <div>
     <div style={{display:"flex"}}>
        <div  
        style={{height:"100vh",
        width:"60%",
        backgroundImage: "url('https://webapp.friska.ai/static/media/loginBg.95b0a1e583540f879c4e.svg')",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        // padding: "44px 54px",
        backgroundPosition:"bottom"
        
        }}>
        </div>
        <div  style={{height:"100vh",width:"40%",backgroundColor:"white"}}>

<div style={{marginLeft:"20%",marginTop:"10%"}}>
<img src='	https://webapp.friska.ai/static/media/logo_lg.7a15c556eacfc46586a9a097255a16f3.svg'></img>
        <button
              style={{
                marginTop: "15px",
                width: "50%",
                padding: "12px",
                border: "1px solid blue",
                borderRadius: "5px",
                backgroundColor: "white",
                color: "black",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
             Sign in with Google
            </button>

            <button
              style={{
                marginTop: "15px",
                width: "50%",
                padding: "12px",
                border: "1px solid blue",
                borderRadius: "5px",
                backgroundColor: "white",
                color: "black",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
             Sign in with Apple
            </button>

            <button
              style={{
                marginTop: "15px",
                width: "50%",
                padding: "12px",
                border: "1px solid blue",
                borderRadius: "5px",
                backgroundColor: "white",
                color: "black",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
             Sign in with Microsoft
            </button>

            <button
            onClick={handleShow1}
              style={{
                marginTop: "15px",
                width: "50%",
                padding: "12px",
                border: "1px solid blue",
                borderRadius: "5px",
                backgroundColor: "white",
                color: "black",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
             Sign in with Email
            </button>
            </div>

        
        </div>

     </div>

     <Modal show={show1} onHide={handleClose1} size='lg'>
            <Modal.Header>
              <Modal.Title>
                Sign in 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

             <div style={{marginLeft:"20%"}}>
            <img src='	https://webapp.friska.ai/static/media/logo_lg.7a15c556eacfc46586a9a097255a16f3.svg'></img>
            <h1 class="login_title">Welcome back</h1>
            <p class="login_content" style={{marginTop:"0px"}}>Login to your Friska AI account</p>
            <div className="input-container">
            <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.inputField}
            />
          </div>
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.inputField}
              onFocus={(e) => (e.target.style.borderColor = styles.inputFieldFocus.borderColor)}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
            <span
              style={styles.eyeIcon}
              onClick={togglePasswordVisibility}
              role="button"
              aria-label="Toggle password visibility"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <a
            href="#"
            style={styles.forgotPassword}
            onMouseEnter={(e) => (e.target.style.textDecoration = styles.forgotPasswordHover.textDecoration)}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Forgot Password?
          </a>

          <button
            type="submit"
            style={styles.submitBtn}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.submitBtnHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c63ff")}
          >
            Login
          </button>

        </div>
            
            </div> 

            </Modal.Body>
            <Modal.Footer style={{marginTop:"20px"}} onClick={handleClose1}>
            <Button variant="secondary">
              Close
              </Button>
              <Button variant="secondary">
                Login
              </Button>
            </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Login
