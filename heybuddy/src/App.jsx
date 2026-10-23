import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Products from "./pages/Products"
import About from "./pages/About"
import Contact from "./pages/Contact"
import { ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { initializeAuth } from "./features/auth/authSlice"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected pages */}
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

        </Routes>
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App