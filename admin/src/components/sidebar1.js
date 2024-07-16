import { Link } from 'react-router-dom';
import '../css/mystyle.css';
import 'react-router-dom';
import Icon from '@mdi/react';
import { mdiNetworkStrength4 } from '@mdi/js';
import { mdiStickerCheckOutline } from '@mdi/js';
import { mdiAccountBox } from '@mdi/js';
import { mdiCurrencyUsd } from '@mdi/js';
import { mdiMessageOutline } from '@mdi/js';
import { mdiCalendarCheck } from '@mdi/js';
import { mdiApplication } from '@mdi/js';
function Sidebar1() {
	
	  
	
    
    return ( 
        <div>

<div class="left-side-bar">
		<div class="brand-logo">
			<Link to={'/dashboard'}>
				<img src="vendors/images/deskapp-logo.svg" alt="" class="dark-logo"/>
				<img src="https://bharatsproperties.com/logo-4-copy.png" alt="" class="light-logo" style={{height:"80px",width:"80px",marginLeft:"60px"}}/>
			</Link>
			<div class="close-sidebar" data-toggle="left-sidebar-close">
				<i class="ion-close-round"></i>
			</div>
		</div>
		<div class="menu-block customscroll">
			<div class="sidebar-menu">
				<ul id="accordion-menu">
					<li class="dropdown">
						<a href="javascript:;" class="dropdown-toggle">
							<span class="micon dw dw-house-1"></span><span class="mtext">Dashboard</span>
						</a>
						<ul class="submenu">
							<li><Link to={'/dashboard'}>Dashboard</Link></li>
							
						</ul>
					</li>
					<li class="dropdown">
						<a href="javascript:;" class="dropdown-toggle">
						<Icon style={{position:"absolute",marginLeft:"-50px"}} path={mdiAccountBox} size={1} /><span class="mtext">Contacts</span>
						</a>
						<ul class="submenu">
							<li><Link to={'/addcontact'}>Add Contacts</Link></li>
						</ul>
					</li>
					<li class="dropdown">
						<a href="javascript:;" class="dropdown-toggle">
						<Icon style={{position:"absolute",marginLeft:"-50px"}} path={mdiCurrencyUsd} size={1} /><span class="mtext">Leads</span>
						</a>
						<ul class="submenu">
							<li><Link to={'/leadinfo'}>Add Leads</Link></li>
						</ul>
						<ul class="submenu">
							<li><Link to={'/leadinfo-personal'}>Add Leads(Personal info)</Link></li>
						</ul>
						<ul class="submenu">
							<li><Link to={'/leadinfo-requirment'}>Add Leads(Requirment)</Link></li>
						</ul>
					</li>
				
					<li class="dropdown">
						<a href="javascript:;" class="dropdown-toggle">
						<Icon style={{position:"absolute",marginLeft:"-50px"}}path={mdiApplication} size={1} /><span class="mtext"> Properties/Inventory </span>
						</a>
						<ul class="submenu">
							<li><Link to={'/addproject'}>Manage Property/Inventory</Link></li>
						
						</ul>
					</li>
					<li class="dropdown">
						<a href="javascript:;" class="dropdown-toggle">
						<Icon style={{position:"absolute",marginLeft:"-50px"}}path={mdiCalendarCheck} size={1} /><span class="mtext">Tasks</span>
						</a>
						<ul class="submenu">
							<li><a href="font-awesome.html">Manage All Tasks</a></li>
							<li><Link to={'/calltaskform'}>Add Call Task</Link></li>
							<li><Link to={'/mailtaskform'}>Add Mail Task</Link></li>
							<li><Link to={'/meetingtaskform'}>Add Meeting Task</Link></li>
							<li><Link to={'/sitevisitform'}>Add Site Visit Task</Link></li>
						</ul>
					</li>
				
					<li class="dropdown">
						<a href="javascript:;" class="dropdown-toggle">
						<Icon style={{position:"absolute",marginLeft:"-50px"}} path={mdiStickerCheckOutline} size={1}/><span class="mtext">Post Sales</span>
						</a>
						<ul class="submenu">
							<li><a href="video-player.html">Manage Booking</a></li>
							<li><Link to={'/bookingdetails'}>Add Booking Details</Link></li>
							<li><a href="forgot-password.html">Manage Payment</a></li>
							<li><Link to={'/paymentdetails'}>Add Payment Details</Link></li>
						</ul>
					</li>
					<li class="dropdown">
						<a href="javascript:;" class="dropdown-toggle">
						<Icon style={{position:"absolute",marginLeft:"-50px"}} path={mdiMessageOutline} size={1} /><span class="mtext">Marketing</span>
						</a>
						<ul class="submenu">
						
						</ul>
					</li>

					<li class="dropdown">
						<a href="javascript:;" class="dropdown-toggle">
						<Icon style={{position:"absolute",marginLeft:"-50px"}} path={mdiNetworkStrength4} size={1}/><span class="mtext">Report</span>
						</a>
						<ul class="submenu">
							
						</ul>
					</li>
					<li class="dropdown">
						<a href="javascript:;" class="dropdown-toggle">
							<span class="micon dw dw-settings"></span><span class="mtext">Settings</span>
						</a>
						<ul class="submenu">
							
						</ul>
					</li>
					<li>
						<a href="sitemap.html" class="dropdown-toggle no-arrow">
							<span class="micon dw dw-diagram"></span><span class="mtext">LogOut</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="mobile-menu-overlay"></div>
        </div>
     );
}

export default Sidebar1;