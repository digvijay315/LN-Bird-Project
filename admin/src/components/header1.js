import { Link } from 'react-router-dom';
import '../css/mystyle.css';
import 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function Header1() {
    function myFunction() {
		var x = document.getElementById("myLinks");
		if (x.style.display === "block") {
		  x.style.display = "none";
		} else {
		  x.style.display = "block";
		}
	  }
	  document.addEventListener('DOMContentLoaded', function() {
		// Ensure elements are available
		var x = document.getElementById("myLinks");
		var b = document.getElementById("btn");
	
		// Check if elements exist before adding the event listener
		if (x && b) {
			document.addEventListener('click', function(event) {
				// Hide the menu if the click is outside the button
				if (!b.contains(event.target) && !x.contains(event.target)) {
					x.style.display = "none";
				}
			});
		}
	});
	
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	  
    return ( 
        <div>
            <div class="header" style={{width:"100%",borderRadius:"5px",height:"50px",padding:"10px"}}>
		<div class="header-left" >
		<button id='btn' onClick={myFunction} class="dropdown-toggle" style={{marginLeft:"10%",border:"none",backgroundColor:"transparent",position:"absolute"}}>Add</button>
		<div class="topnav">
  		<div id="myLinks">
			<ul>
				<li><Link to={'/addcontact'} class="dropdown-item">Contact</Link></li>
				<li><Link to={'/addcompany'} class="dropdown-item">Add Company</Link></li>
				<li><Link to={'/leadinfo'} class="dropdown-item">Lead</Link></li>
				<li><Link to={'/project'} class="dropdown-item">Project</Link></li>
				<li><Link to={'/deal'} class="dropdown-item">Deal</Link></li>
				<li><Link to={'/tasksform'} class="dropdown-item">Add Tasks</Link></li>
				
			</ul>
  		</div>
		</div>
			<div class="menu-icon dw dw-menu"></div>
			<div class="search-toggle-icon dw dw-search2" data-toggle="header_search"></div>
			<div class="header-search">
				<form>
					<div class="form-group mb-0" style={{width:"320px",marginLeft:"220%",position:"relative"}}>
						<i class="dw dw-search2 search-icon"></i>
						<input  type="text" className="form-control search-input" placeholder="Search Here" style={{height:"35px"}}/>
					</div>
					{/* //<img src="https://static-00.iconduck.com/assets.00/phone-call-icon-2048x2048-jzb4bret.png"style={{height:"45px",position:"absolute",marginLeft:"110%", border:"1px solid #D3D3D3",padding:"8px"}}/> */}
					<img src="https://cdn-icons-png.flaticon.com/512/5035/5035563.png"style={{height:"35px",position:"absolute",marginLeft:"118%", border:"1px solid #D3D3D3",padding:"8px"}}/>
					
				</form>
			</div>
		</div>
		<div class="header-right" style={{marginTop:"-10px"}}>
			<div class="user-info-dropdown">
				<div class="dropdown">
					<a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" style={{paddingRight:"40px"}}>
					
						<span class="user-name">Admin</span>
					</a>
					<div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
						<a class="dropdown-item" href="profile.html"><i class="dw dw-user1"></i> Profile</a>
						<a class="dropdown-item" href="profile.html"><i class="dw dw-settings2"></i> Setting</a>
						<a class="dropdown-item" href="faq.html"><i class="dw dw-help"></i> Help</a>
						<a class="dropdown-item" href="login.html"><i class="dw dw-logout"></i> Log Out</a>
					</div>
				</div>
			</div>
			
		</div>
	</div>

	<div class="right-sidebar">
		<div class="sidebar-title">
			<h3 class="weight-600 font-16 text-blue">
				Layout Settings
				<span class="btn-block font-weight-400 font-12">User Interface Settings</span>
			</h3>
			<div class="close-sidebar" data-toggle="right-sidebar-close">
				<i class="icon-copy ion-close-round"></i>
			</div>
		</div>
		<div class="right-sidebar-body customscroll">
			<div class="right-sidebar-body-content">
				<h4 class="weight-600 font-18 pb-10">Header Background</h4>
				<div class="sidebar-btn-group pb-30 mb-10">
					<a href="javascript:void(0);" class="btn btn-outline-primary header-white active">White</a>
					<a href="javascript:void(0);" class="btn btn-outline-primary header-dark">Dark</a>
				</div>

				<h4 class="weight-600 font-18 pb-10">Sidebar Background</h4>
				<div class="sidebar-btn-group pb-30 mb-10">
					<a href="javascript:void(0);" class="btn btn-outline-primary sidebar-light ">White</a>
					<a href="javascript:void(0);" class="btn btn-outline-primary sidebar-dark active">Dark</a>
				</div>

				<h4 class="weight-600 font-18 pb-10">Menu Dropdown Icon</h4>
				<div class="sidebar-radio-group pb-10 mb-10">
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebaricon-1" name="menu-dropdown-icon" class="custom-control-input" value="icon-style-1" checked=""/>
						<label class="custom-control-label" for="sidebaricon-1"><i class="fa fa-angle-down"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebaricon-2" name="menu-dropdown-icon" class="custom-control-input" value="icon-style-2"/>
						<label class="custom-control-label" for="sidebaricon-2"><i class="ion-plus-round"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebaricon-3" name="menu-dropdown-icon" class="custom-control-input" value="icon-style-3"/>
						<label class="custom-control-label" for="sidebaricon-3"><i class="fa fa-angle-double-right"></i></label>
					</div>
				</div>

				<h4 class="weight-600 font-18 pb-10">Menu List Icon</h4>
				<div class="sidebar-radio-group pb-30 mb-10">
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-1" name="menu-list-icon" class="custom-control-input" value="icon-list-style-1" checked=""/>
						<label class="custom-control-label" for="sidebariconlist-1"><i class="ion-minus-round"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-2" name="menu-list-icon" class="custom-control-input" value="icon-list-style-2"/>
						<label class="custom-control-label" for="sidebariconlist-2"><i class="fa fa-circle-o" aria-hidden="true"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-3" name="menu-list-icon" class="custom-control-input" value="icon-list-style-3"/>
						<label class="custom-control-label" for="sidebariconlist-3"><i class="dw dw-check"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-4" name="menu-list-icon" class="custom-control-input" value="icon-list-style-4" checked=""/>
						<label class="custom-control-label" for="sidebariconlist-4"><i class="icon-copy dw dw-next-2"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-5" name="menu-list-icon" class="custom-control-input" value="icon-list-style-5"/>
						<label class="custom-control-label" for="sidebariconlist-5"><i class="dw dw-fast-forward-1"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-6" name="menu-list-icon" class="custom-control-input" value="icon-list-style-6"/>
						<label class="custom-control-label" for="sidebariconlist-6"><i class="dw dw-next"></i></label>
					</div>
				</div>

				<div class="reset-options pt-30 text-center">
					<button class="btn btn-danger" id="reset-settings">Reset Settings</button>
				</div>
			</div>
		</div>
	</div>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!
			<h2>hello world</h2>
		</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    
        </div>
     );
}

export default Header1;