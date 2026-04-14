import './Index.css'
import Children from "./Pages/Children"
import { Routes, Route, useLocation } from "react-router-dom"
import NotFound from "./Pages/NotFound"
import WebLayout from "./Layout/WebLayout"
import Home from "./Pages/Home"
import Women from "./Pages/WOMEN.JSX"
import Men from "./Pages/Men"
import { AnimatePresence } from "framer-motion"
import Search from "./Pages/Search"
import ProductVew from "./Pages/ProductView"
import AddToCart from "./Pages/AddToCart"
import Wishlist from "./Pages/Wishlist"
import AdminPanel from "./Pages/DashPages/AdminPanel"
import AdminLayout from "./Layout/AdminLayout"
import Products from "./Pages/DashPages/Products"
import Dashboard from "./Pages/DashPages/Dashboard"
import Users from "./Pages/DashPages/Users"
import Contact from "./Pages/DashPages/Contact"
import UpdateProduct from "./Pages/DashPages/UpdateProduct"
import ViewProduct from "./Pages/DashPages/ViewProduct"
import ProductUpload from "./Pages/DashPages/ProductUpload"
import SignUp from './Pages/DashPages/SignUp'
import ViewUsers from './Pages/DashPages/ViewUsers'
import ViewContact from './Pages/DashPages/ViewContact'
import ProtectedRoute from './Component/ProtectedRoute'
import UpdateUsers from './Pages/DashPages/UpdateUsers'
import UserSignUp from './Pages/UserSignUp'
import UserLogin from './Pages/UserLogin'
import UserProfile from './Pages/UserProfile'
import UserAddress from './Pages/UserAddress'
import Checkout from './Pages/Checkout'
import FAQ from './Pages/FAQ'
import ContactUs from './Pages/ContactUs'


function App() {
  const location = useLocation();


  return (
    <div style={{ fontFamily: 'Space Mono' }}>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>

          {/* 🔒 ADMIN ROUTES */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route element={<AdminLayout />}>
              <Route path="/adminpanel" element={<AdminPanel />} />
              <Route path="/products" element={<Products />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/users' element={<Users />} />

              <Route path='/contact/:id' element={<ViewContact />} />
              <Route path="/contact" element={<Contact />} />

              <Route path='/products/:slug/update' element={<UpdateProduct />} />
              <Route path="/products/:slug/view" element={<ViewProduct />} />
              <Route path='/upload' element={<ProductUpload />} />

              <Route path='/users/:id' element={<ViewUsers />} />
              <Route path='/users/:id/update' element={<UpdateUsers />} />
              <Route path='/users/create' element={<SignUp />} />
            </Route>
          </Route>

          {/* 🌐 WEB LAYOUT */}
          <Route element={<WebLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/men' element={<Men />} />
            <Route path='/women' element={<Women />} />
            <Route path='/children' element={<Children />} />
            <Route path='/search' element={<Search />} />
            <Route path='/cart' element={<AddToCart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/product/:slug' element={<ProductVew />} />
            <Route path='/user/profile' element={<UserProfile />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/Checkout' element={<Checkout />} />
          </Route>

          <Route path='/login' element={<UserLogin />} />
          <Route path='/signup' element={<UserSignUp />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/address' element={<UserAddress />} />

        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App