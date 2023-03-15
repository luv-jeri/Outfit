import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/app/home/Home';
import Orders from './pages/app/orders/Orders';
import ProductDetails from './pages/app/product_detail/ProductDetails';
import Cart from './pages/app/cart/Cart';
import Profile from './pages/app/profile/Profile';
import SignIn from './pages/auth/sign_in/SignIn';
import SignUp from './pages/auth/sign_up/SignUp';
import SendOtp from './pages/auth/send_otp/SendOTP';
import ResetPassword from './pages/auth/reset_password/ResetPassword';

function App() {
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/sign_in' element={<SignIn />} />
        <Route path='/sign_up' element={<SignUp />} />
        <Route path='/send_otp' element={<SendOtp />} />
        <Route path='/reset_password' element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
