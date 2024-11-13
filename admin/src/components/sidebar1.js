import { Link } from 'react-router-dom';
import '../css/mystyle.css';
import 'react-router-dom';
import Icon from '@mdi/react';
import { mdiNetworkStrength4, mdiPhone } from '@mdi/js';
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
				<img src="./WhatsApp Image 2024-11-13 at 09.36.23_ba950cdb.jpg" alt="" class="light-logo" style={{height:"80px",width:"80px",marginLeft:"60px",backgroundColor:"transparent"}}/>
			</Link>
			<div class="close-sidebar" data-toggle="left-sidebar-close">
				<i class="ion-close-round"></i>
			</div>
		</div>
		<div class="menu-block customscroll">
			<div class="sidebar-menu">
				<ul id="accordion-menu">
					<li class="dropdown">
						<Link to={'/dashboard'} class="dropdown-toggle no-arrow">
							<span class="micon dw dw-house-1"></span><span class="mtext">Dashboard</span>
						</Link>
					</li>
				
					<li>
						<Link to={'/contactdetails'} class="dropdown-toggle no-arrow">
						<Icon style={{position:"absolute",marginLeft:"-50px"}} path={mdiAccountBox} size={1} /><span class="mtext">Contacts</span>
						</Link>
					</li>
					<li>
						<Link to={'/leaddetails'} class="dropdown-toggle no-arrow">
						<Icon style={{position:"absolute",marginLeft:"-50px"}} path={mdiCurrencyUsd} size={1} /><span class="mtext">Leads</span>
						</Link>
						
					</li>
				
					<li class="dropdown">
						<Link to={'/dealdetails'} class="dropdown-toggle no-arrow">
						<Icon style={{position:"absolute",marginLeft:"-50px"}}path={mdiApplication} size={1} /><span class="mtext"> Inventory </span>
						</Link>
					</li>
					<li class="dropdown">
						<Link to={'/tasks'} class="dropdown-toggle no-arrow">
						<Icon style={{position:"absolute",marginLeft:"-50px"}}path={mdiCalendarCheck} size={1} /><span class="mtext">Tasks</span>
						</Link>
					
					</li>
				
					<li class="dropdown">
						<Link to={'/bookingdetailsdata'} class="dropdown-toggle no-arrow">
						<Icon style={{position:"absolute",marginLeft:"-50px"}}path={mdiCalendarCheck} size={1} /><span class="mtext">Post Sales</span>
						</Link>
					
					</li>
					{/* <li class="dropdown">
						<Link to={'/paymentdetailsdata'} class="dropdown-toggle no-arrow">
						<Icon style={{position:"absolute",marginLeft:"-50px"}}path={mdiCalendarCheck} size={1} /><span class="mtext">Payment Details</span>
						</Link>
					
					</li> */}
					<li class="dropdown">
					<Link to={'/marketing'} class="dropdown-toggle no-arrow">
						<Icon style={{position:"absolute",marginLeft:"-50px"}}path={mdiCalendarCheck} size={1} /><span class="mtext">Marketing</span>
						</Link>
						<ul class="submenu">
						
						</ul>
					</li>
					<li class="dropdown">
						<a href="javascript:;" class="dropdown-toggle no-arrow">
						<Icon style={{position:"absolute",marginLeft:"-50px"}} path={mdiPhone} size={1} /><span class="mtext">Communication</span>
						</a>
						
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