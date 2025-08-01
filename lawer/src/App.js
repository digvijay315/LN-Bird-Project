
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import AuthTabs from './components/demo';
import Header from './components/header';
import UserSidebarMenu from './components/usersidebar';
import Userdashboard from './components/userdashboard';


function App() {
  return (
    <BrowserRouter>
    <div>
     {/* <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<AuthTabs/>}></Route>
      
    </Routes>   */}
 {/* <Home/> */}
 {/* <Login/> */}
 {/* <Register/> */}
 {/* <AuthTabs/> */}
 {/* <Header/> */}
 {/* <UserSidebarMenu/> */}
 <Userdashboard/>
   </div>
   </BrowserRouter>
  );
}

export default App;
