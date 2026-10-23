import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logoutUser } from "../features/auth/authSlice"

const Navbar = () => {

    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            navigate("/login")
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="flex justify-between items-center bg-blue-500 px-4 py-2 text-white">
            <Link to="/"><h1 className="text-white text-3xl font-bold">Go Food</h1></Link>
            <ul className="flex space-x-4">
                {
                    user ? (
                        <>
                            <Link className="font-bold text-white" to="/products">Products</Link>
                            <Link className="font-bold text-white" to="/about">About</Link>
                            <Link className="font-bold text-white" to="/contact">Contact</Link>
                            <li onClick={handleLogout}><Link className="font-bold text-red-800" to="/logout">LogOut</Link></li>
                        </>
                    ) : (
                        <>
                            < Link className="font-bold text-white" to="/register">Register</Link>
                            <Link className="font-bold text-white" to="/login">Login</Link>
                        </>
                    )
                }
            </ul>
        </div >
    )
}

export default Navbar