import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { loginUser } from "../features/auth/authSlice"

const Login = () => {

    const { user, isLoading, isError, isErrorMessage } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = formData

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(loginUser(formData))
    }

    useEffect(() => {
        if (user) {
            navigate("/", { replace: true });
        }

        if (isError && isErrorMessage) {
            toast.error(isErrorMessage, {
                position: "top-center",
            });
        }
    }, [user, isError, isErrorMessage, navigate]);

    // useEffect(() => {
    //     if (user) {
    //         navigate("/")
    //     }
    //     if (isError && isErrorMessage) {
    //         toast.error(isErrorMessage, { position: "top-center" })
    //     }
    // }, [user, isError, isErrorMessage])

    return (
        <div className="h-full w-full bg-gray-50 dark:bg-[#0a0a0f] overflow-y-auto relative flex flex-col items-center py-20 px-4">
            {/* Background elements */}
            <div className="fixed top-1/3 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"></div>
            <div className="fixed bottom-1/3 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px]"></div>

            <div className="glass-card border border-gray-200 dark:border-white/10 p-8 md:p-10 rounded-3xl w-full max-w-md relative z-10 shadow-2xl shadow-black my-auto">
                {/* <div className="flex justify-center mb-8">
                    <Link to="/" className="flex items-center gap-2 group">
                        <Sparkles className="text-violet-500 w-8 h-8 group-hover:" />
                        <span className="font-syne font-bold text-2xl text-gray-900 dark:text-white tracking-wide">Synexis</span>
                    </Link>
                </div> */}

                <h2 className="text-2xl text-gray-900 dark:text-white font-bold text-center mb-2">Create an account</h2>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-8 text-sm">Join the community of creators worldwide.</p>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">


                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input
                            name="email"
                            value={email}
                            onChange={handleChange}
                            type="email"
                            required
                            placeholder="hello@example.com"
                            className="w-full bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 "
                        />
                    </div>

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                        <input
                            value={phone}
                            onChange={handleChange}
                            name='phone'
                            type="phone"
                            required
                            placeholder="+919123456789"
                            className="w-full bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 "
                        />
                    </div> */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input
                            value={password}
                            onChange={handleChange}
                            name='password'
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 "
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600text-white font-bold py-3 rounded-xl mt-4 shadow-lg shadow-violet-600/25 flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-8">
                    Don't have an account? <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium">Register Now</Link>
                </p>
            </div>
        </div>
    )
}

export default Login