import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"; // Import Navbar
import Home from "./pages/Home"; // Import Home Page
import ProductPage from "./pages/Product/Product"; // Import Products Page
import Contact from "./pages/Contact/Contact"; // Import Contact Page
import About from "./pages/About/About"; // Import About Page
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CartPage from "./pages/Cart/Cart";
import AdminProducts from "./pages/Admin/Product/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct/UpdateProduct";
import AdminHome from "./pages/Admin/AdminHome/AdminHome";
import AdminUsers from "./pages/Admin/AdminUser/AdminUsers";
import AddUser from "./pages/Admin/AdminAddUsers/AddUser";
import UpdateUser from "./pages/Admin/AdminUpdateUsers/UpdateUsers";
import AdminTypes from "./pages/Admin/Types/Types";
import AddType from "./pages/Admin/Types/AddTypes";
import EditType from "./pages/Admin/Types/EditTypes";
import CreateProduct from "./pages/Admin/CreateProduct/CreateProduct";
import ProtectedAdminLayout from "./components/ProtectedRoutes";
import AdminNavbar from "./components/AdminNav/Navbar";
import Profile from "./pages/PersonalDetails/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import PaymentPage from "./pages/PaymentPage/PaymentPage";


const AppContent = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Header />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/change-password/:id" element={<ChangePassword />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/*" element={<ProtectedAdminLayout />}>
          <Route
            element={
              <>
                <AdminNavbar />
                <Outlet />
              </>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="edit-product/:id" element={<UpdateProduct />} />
            <Route path="add-product" element={<CreateProduct />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/add" element={<AddUser />} />
            <Route path="users/update/:id" element={<UpdateUser />} />
            <Route path="types" element={<AdminTypes />} />
            <Route path="types/add" element={<AddType />} />
            <Route path="types/update/:id" element={<EditType />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;