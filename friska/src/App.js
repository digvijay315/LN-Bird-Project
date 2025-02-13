import logo from './logo.svg';
import Login from './components/login';
import Login1 from './components/login1';
import Dietform from './components/dietform';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Chatai from './components/chatai';
import AzureAIComponent from './components/test';
import MealPlanChat from './components/test';


function App() {
  return (
    <div className="App">

<BrowserRouter>
    <div>
     <Routes>
      <Route path='/' element={<Login1/>}></Route>
      <Route path='/dietform' element={<Dietform/>}></Route>
      <Route path='/chatai' element={<Chatai/>}></Route>
    </Routes> 

   </div>
   </BrowserRouter>
    {/* <Login/> */}
    {/* <Login1/> */}
    {/* <Dietform/> */}
    {/* <Chatai/> */}
    {/* <AzureAIComponent/> */}
    {/* <MealPlanChat/> */}
    </div>
  );
}

export default App;
