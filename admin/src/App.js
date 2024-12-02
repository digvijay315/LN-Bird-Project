import Addcontact from './components/addcontact';
import Call_task_complete_form from './components/call_task_complete_form';
import Call_task_form from './components/task_form.js';
import Dashboard from './components/dashboard';
import Leadinfo from './components/leadinfo';
import Leadinfo_personal from './components/leadinfo_personal';
import Leadinfo_requirment from './components/leadinfo_requirment';
import Login from './components/login';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Mail_task_form from './components/mail_task_form';
import Mail_task_complete_form from './components/mail_task_complete_form';
import Meeting_task_form from './components/meeting_task_form';
import Meeting_task_complete_form from './components/meeting_task_complete_form';
import Site_visit from './components/site_visit_form';
import Site_visit_complete_form from './components/site_visit_complete_form';
import Sale_lease from './components/sale_lease';
import Booking_details from './components/booking_details';
import Payment_details from './components/Payment_details';
import Addinventory from './components/addinventory';
import Leadfetch from './components/leaddetails';
import Fetchcontact from './components/contactdetails';
import InventoryDetails from './components/inventorydetails';
import TableComponent from './components/demo';
import CallButton from './components/demo';
import Notification from './components/demo';
import SuggestionBox from './components/demo';
import Adddcompany from './components/addcompany.js';
import Projectform from './components/projectform';
import Deal from './components/deal';
import '../src/App.css';
import BankSelector from './components/demo1';
import Tasks from './components/tasks.js';
import Task_form from './components/task_form.js';
import Paymentdetails from './components/paymentdetails.js';
import Bookingdetails from './components/bookingdetails.js';
import Marketing from './components/marketing.js';
import Dealdetails from './components/dealdetails.js';
import FlipViewComponent from './components/demo';
import AddContactForm from './components/demo';

function App() {
  return (
    <BrowserRouter>
    <div>
     <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/addcontact' element={<Addcontact/>}></Route>
      <Route path='/leadinfo' element={<Leadinfo/>}></Route>
      <Route path='/leadinfo-personal' element={<Leadinfo_personal/>}></Route>
      <Route path='/leadinfo-requirment' element={<Leadinfo_requirment/>}></Route>
      <Route path='/calltaskform' element={<Call_task_form/>}></Route>
      <Route path='/call-task-complete-form' element={<Call_task_complete_form/>}></Route>
      <Route path='/mailtaskform' element={<Mail_task_form/>}></Route>
      <Route path='/meetingtaskform' element={<Meeting_task_form/>}></Route>
      <Route path='/sitevisitform' element={<Site_visit/>}></Route>
      <Route path='/addinventory' element={<Addinventory/>}></Route>
      <Route path='/paymentdetails' element={<Payment_details/>}></Route>
      <Route path='/bookingdetails' element={<Booking_details/>}></Route>
      <Route path='/leaddetails' element={<Leadfetch/>}></Route>
      <Route path='/contactdetails' element={<Fetchcontact/>}></Route>
      <Route path='/inventorydetails' element={<InventoryDetails/>}></Route>
      <Route path='/project' element={<Projectform/>}/>
      <Route path='/addcompany' element={<Adddcompany/>}/>
      <Route path='/deal' element={<Deal/>}/>
      <Route path='/tasks' element={<Tasks/>}/>
      <Route path='/tasksform' element={<Task_form/>}/>
      <Route path='/bookingdetails' element={<Booking_details/>}/>
      <Route path='/paymentdetails' element={<Payment_details/>}/>
      <Route path='/paymentdetailsdata' element={<Paymentdetails/>}/>
      <Route path='/bookingdetailsdata' element={<Bookingdetails/>}/>
      <Route path='/marketing' element={<Marketing/>}/>
      <Route path='/dealdetails' element={<Dealdetails/>}/>
    </Routes> 
    {/* <SuggestionBox/>  */}
    {/* <Adddeveloper/> */}
    {/* <Projectform/> */}
  {/* <BankSelector/> */}
  {/* <FlipViewComponent/> */}
  {/* <AddContactForm/> */}
   </div>
   </BrowserRouter>
  );
}

export default App;
