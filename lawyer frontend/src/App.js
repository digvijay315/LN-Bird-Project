
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
//import Register from './components/register';
//import AuthTabs from './components/demo';
//import Header from './components/header';
import ClientDashboard from './components/ClientDashboard';
import LawyerDashboard from './components/LawyerDashboard';
import AdminPanel from './components/AdminPanel';



function App() {
  return (
    <BrowserRouter>
    <div>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/ClientDashboard' element={<ClientDashboard/>}></Route>
      <Route path='/LawyerDashboard' element={<LawyerDashboard/>}></Route>
      <Route path='/AdminPanel' element={<AdminPanel/>}></Route>
    
      
    </Routes>  
 {/* <Home/> */}
 {/* <Login/> */}
 {/* <Register/> */}
 {/* <AuthTabs/> */}
 {/* <Header/> */}
   </div>
   </BrowserRouter>
  );
}

export default App;
