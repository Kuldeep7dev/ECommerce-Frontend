import { lazy, Suspense } from "react";
import "./index.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

/* Layouts */
const WebLayout = lazy(() => import("./Layout/WebLayout"));
const AdminLayout = lazy(() => import("./Layout/AdminLayout"));
const ProtectedRoute = lazy(() => import("./Component/ProtectedRoute"));

/* Public Pages */
const Home = lazy(() => import("./Pages/Home"));
const Men = lazy(() => import("./Pages/Men"));
const Women = lazy(() => import("./Pages/Women"));
const Children = lazy(() => import("./Pages/Children"));
const Search = lazy(() => import("./Pages/Search"));
const ProductView = lazy(() => import("./Pages/ProductView"));
const AddToCart = lazy(() => import("./Pages/AddToCart"));
const Wishlist = lazy(() => import("./Pages/Wishlist"));
const UserLogin = lazy(() => import("./Pages/UserLogin"));
const UserSignUp = lazy(() => import("./Pages/UserSignUp"));
const UserProfile = lazy(() => import("./Pages/UserProfile"));
const UserAddress = lazy(() => import("./Pages/UserAddress"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const FAQ = lazy(() => import("./Pages/FAQ"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const ReturnPolicy = lazy(() => import("./Pages/ReturnPolicy"));
const About = lazy(() => import("./Pages/About"));
const NotFound = lazy(() => import("./Pages/NotFound"));

/* Admin Pages */
const Products = lazy(() => import("./Pages/DashPages/Products"));
const Dashboard = lazy(() => import("./Pages/DashPages/Dashboard"));
const Users = lazy(() => import("./Pages/DashPages/Users"));
const Contact = lazy(() => import("./Pages/DashPages/Contact"));
const UpdateProduct = lazy(() => import("./Pages/DashPages/UpdateProduct"));
const ViewProduct = lazy(() => import("./Pages/DashPages/ViewProduct"));
const ProductUpload = lazy(() => import("./Pages/DashPages/ProductUpload"));
const SignUp = lazy(() => import("./Pages/DashPages/SignUp"));
const ViewUsers = lazy(() => import("./Pages/DashPages/ViewUsers"));
const ViewContact = lazy(() => import("./Pages/DashPages/ViewContact"));
const UpdateUsers = lazy(() => import("./Pages/DashPages/UpdateUsers"));

function App() {
  const location = useLocation();

  return (
    <div style={{ fontFamily: "Space Mono" }}>
      <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center z-[9999]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-black border-t-transparent animate-spin"></div>
        </div>
      </div>}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            {/* Admin */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route element={<AdminLayout />}>
                <Route path="/products" element={<Products />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/contact/:id" element={<ViewContact />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products/:slug/update" element={<UpdateProduct />} />
                <Route path="/products/:slug/view" element={<ViewProduct />} />
                <Route path="/upload" element={<ProductUpload />} />
                <Route path="/users/:id" element={<ViewUsers />} />
                <Route path="/users/:id/update" element={<UpdateUsers />} />
                <Route path="/users/create" element={<SignUp />} />
              </Route>
            </Route>

            {/* Website */}
            <Route element={<WebLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/children" element={<Children />} />
              <Route path="/search" element={<Search />} />
              <Route path="/cart" element={<AddToCart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/product/:slug" element={<ProductView />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/about-us" element={<About />} />
            </Route>

            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<UserSignUp />} />
            <Route path="/address" element={<UserAddress />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
}

export default App;