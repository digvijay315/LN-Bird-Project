import Addcontact from './components/addcontact';
import Call_task_complete_form from './components/call_task_complete_form';
import Call_task_form from './components/call_task_form';
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
import Fetchdata from './components/lead';
import Leadfetch from './components/lead';
import Fetchcontact from './components/contactdetails';


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
      <Route path='/addproject' element={<Addinventory/>}></Route>
      <Route path='/paymentdetails' element={<Payment_details/>}></Route>
      <Route path='/bookingdetails' element={<Booking_details/>}></Route>
      <Route path='/lead' element={<Leadfetch/>}></Route>
      <Route path='/contact' element={<Fetchcontact/>}></Route>
    </Routes>
  {/* <Fetchdata/> */}
   </div>
   </BrowserRouter>
  );
}

export default App;
