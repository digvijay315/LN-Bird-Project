import './App.css';
import Contact from './Components/Contact';
import Footer from './Components/footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import VitamincFacewash from './Components/vitamincFacewash';
import Antiacnefacewash from './Components/Antiacnefacewash';
import Goldscrubfacewash from './Components/Goldscrubfacewash';
import Antihairfallshampoo from './Components/Antihairfallshampoo';
import Rosemaryhairoil from './Components/Rosemaryhairoil';
import Hairserum from './Components/Hairserum';
import Glutasoap from './Components/Glutasoap';
import Home1 from './Components/home1';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from './Components/Admin/Sidebar';
import Dashboard from './Components/Admin/Dashboard';
import Addproduct from './Components/Admin/Addproduct';
import Termcondition from './Components/Termcondition';
import Privacypolicy from './Components/Privacypolicy';
import Ewaste from './Components/Ewaste';
import Cancilationpolicy from './Components/Cancilationpolicy';
import Deliverycancel from './Components/Deliverycancel';
import Aboutus from './Components/Aboutus';
import Faq from './Components/Faq';
import Allproductlist from './Components/Admin/Allproductlist';
import Banner from './Components/Admin/Banner';
import Accountsetting from './Components/Admin/Accountsetting';
import Sinup from './Components/Admin/Sinup';
import Login from './Components/Admin/Login';
import Forgatpassword from './Components/Admin/Forgatpassword';
import PrivateRoute from './Components/protectedroute';
import OAuthGuard from '../src/Components/protectedroute';
import { AuthProvider } from '../src/Components/authguard';





function App() {
  return (
    <AuthProvider>
     <BrowserRouter>

 <div>
    
     <Routes>
    <Route path='/' element={<Login/>}/>
     <Route path='/contact' element={<Contact/>}/>
     <Route path='/vitamincfacewash' element={<VitamincFacewash/>}/>
     <Route path='/antiacnefacewash' element={<Antiacnefacewash/>}/>
     <Route path='/goldscrubfacewash' element={<Goldscrubfacewash/>}/>
     <Route path='/antihairfallshampoo' element={<Antihairfallshampoo/>}/>
     <Route path='/rosemaryhairoil' element={<Rosemaryhairoil/>}/>
     <Route path='/hairserum' element={<Hairserum/>}/>
     <Route path='/glutasoap' element={<Glutasoap/>}/>
     <Route path='/addproduct' element={<PrivateRoute><Addproduct/></PrivateRoute>}/>
     <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
     <Route path='/term&condition' element={<Termcondition/>}/>
     <Route path='/privacypolicy' element={<Privacypolicy/>}/>
     <Route path='/ewaste' element={<Ewaste/>}/>
     <Route path='/cancelpolicy' element={<Cancilationpolicy/>}/>
     <Route path='/deliverycancel' element={<Deliverycancel/>}/>
     <Route path='/aboutus' element={<Aboutus/>}/>
     <Route path='/faq' element={<Faq/>}/>
     <Route path='/allproductlist' element={<PrivateRoute><Allproductlist/></PrivateRoute>}/>
     <Route path='/banner' element={<PrivateRoute><Banner/></PrivateRoute>}/>
     <Route path='/accountsetting' element={<PrivateRoute><Accountsetting/></PrivateRoute>}/>
     <Route path='/login' element={<Login/>}/>
    <Route path='/singup' element={<Sinup/>}/>
     <Route path='/forgot' element={<Forgatpassword/>}/>
     </Routes>

     </div>
     </BrowserRouter>
     
</AuthProvider>



    
  );
}

export default App;
