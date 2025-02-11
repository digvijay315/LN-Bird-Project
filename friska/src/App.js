import logo from './logo.svg';
import Login from './components/login';
import Login1 from './components/login1';
import Dietform from './components/dietform';
import { BrowserRouter,Route,Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">

<BrowserRouter>
    <div>
     <Routes>
      <Route path='/' element={<Login1/>}></Route>
      <Route path='/dietform' element={<Dietform/>}></Route>
    </Routes> 

   </div>
   </BrowserRouter>
    {/* <Login/> */}
    {/* <Login1/> */}
    {/* <Dietform/> */}
    </div>
  );
}

export default App;
