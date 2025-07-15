import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Component/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addproduct from "./Component/Addproduct";
import Productlist from "./Component/Productlist";
import Productgrid from "./Component/Productgrid";
import Category from "./Component/Category";
import Order from "./Component/Order";
import Brand from "./Component/Brand";
import Coupons from "./Component/Coupons";
import Profile from "./Component/Profile";
import Ourstaff from "./Component/Ourstaff";
import RegisterForm from "./Component/Register";
import LoginForm from "./Component/LoginForm";
import ResetPassword from "./Component/ResetPassword";
import EditProduct from "./Component/EditProduct";
import DeleteProduct from "./Component/DeleteProduct";
import SetNewPassword from "./Component/SetNewPassword";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterForm />}></Route>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/Addproduct" element={<Addproduct />}></Route>
          <Route path="/Productlist" element={<Productlist />}></Route>
          <Route path="/Home" element={<Dashboard />}></Route>
          <Route path="/Productgrid" element={<Productgrid />}></Route>
          <Route path="/Category" element={<Category />}></Route>
          <Route path="/Order" element={<Order />}></Route>
          <Route path="/Brand" element={<Brand />}></Route>
          <Route path="/Coupons" element={<Coupons />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/Ourstaff" element={<Ourstaff />}></Route>
          <Route path="/RegisterForm" element={<RegisterForm />}></Route>
          <Route path="/LoginForm" element={<LoginForm />}></Route>
          <Route path="/ResetPassword" element={<ResetPassword />}></Route>
          <Route path="/EditProduct" element={<EditProduct />}></Route>
          <Route path="/DeleteProduct" element={<DeleteProduct />}></Route>
          <Route path="/Setpassword" element={<SetNewPassword />} />

           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
