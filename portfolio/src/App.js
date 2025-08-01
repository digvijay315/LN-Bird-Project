import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Components/about';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Gallary from './Components/gallary';
import Projects from './Components/projects';

function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/aboutus' element={<About/>}></Route>
    <Route path='/gallary' element={<Gallary/>}></Route>
    <Route path='/projects' element={<Projects/>}></Route>
  </Routes>
  </BrowserRouter>
  {/* <Navbar/> */}
   {/* <Home/> */}
  {/*<Footer/> */}
  {/* <About/> */}
  {/* <Gallary/> */}
 
  
  </>
  );
}

export default App;
