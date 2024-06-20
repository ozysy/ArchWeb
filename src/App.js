import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

// import all components
import UserName from './components/UserName';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import Main from './components/Main';
import Product from './components/Product';

// auth middleware
import { AuthorizeUser, ProtectRoute } from './middleware/auth';

// root routes
export default function App() {
  return (
    <main>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/username" element={<UserName />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password" element={<ProtectRoute><Password /></ProtectRoute>} />
          <Route path="/profile" element={<AuthorizeUser><Profile /></AuthorizeUser>} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HashRouter>
    </main>
  );
}