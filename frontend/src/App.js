import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const Login = lazy(() => import('./component/Login'));
const Registration = lazy(() => import('./component/Registration'));
const Home = lazy(() => import('./component/Home'));
const Dash = lazy(() => import('./component/Dash'));
const Cart = lazy(() => import('./component/Cart'));
const Order = lazy(() => import('./component/Order'));
const Profile = lazy(() => import('./component/Profile'));

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<img width="100%" height="655px" src="./images/wating.jpg" alt="Loading.." />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<img width="100%" height="655px" src="./images/notfound.gif" alt="not found" />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
  );
}

export default App;
