import { useState } from "react";
import { useDispatch } from "react-redux";
import { baseUrl } from "../redux/apiRequest";
import { registerFailed, registerStart, registerSuccess } from "../redux/authSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const Register = (props) => {
    const { openRegister, setOpenRegister } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [matchPassword, setMatchPassword] = useState("")
    const dispatch = useDispatch()

    const handleRegister = async (e) => {
        e.preventDefault()
        if (password !== matchPassword) {
            toast.error("Password is not matches")
            return
        }
        const newUser = {
            email: email,
            password: password
        }
        try {
            dispatch(registerStart())
            const res = await axios.post(`${baseUrl}/api/v1/auth/register`, newUser)
            if (res.data.status) {
                dispatch(registerSuccess())
                toast.success(res.data.message)
            }
            else {
                dispatch(registerFailed())
                toast.error(res.data.message)
            }
        } catch (err) {

        }

    }
    return (
        <div className=" d-flex justify-content-center">
            <div className="mt-5">
                <div style={{ width: '300px' }} className="border rounded-4 mt-5  bg-white shadow-lg  d-flex flex-column align-items-center">
                    <div className="p-2 fs-5 fw-medium">Sign up</div>
                    <form className="w-100 px-4 d-flex flex-column justify-content-start"
                        onSubmit={handleRegister}>
                        <label className="py-1 fs-6">Email</label>
                        <input className="px-2 py-1 mb-3 fs-6 border rounded-1"
                            type="text" required
                            placeholder="Enter your username"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="py-1 fs-6">Password</label>
                        <input className="px-2 py-1 mb-3 fs-6 border rounded-1"
                            type="password" required
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="py-1 fs-6">Matches Password</label>
                        <input className="px-2 py-1 mb-3 fs-6 border rounded-1"
                            type="password" required
                            placeholder="Enter your password"
                            onChange={(e) => setMatchPassword(e.target.value)}
                        />
                        <div className="my-2 d-flex justify-content-center">
                            <button
                                className="border border-0 px-3 py-1 rounded-2 bg-primary text-light fs-6"
                                type="submit"
                            > Create account </button>
                            <ToastContainer
                                position="top-right"
                                autoClose={1000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover={false}
                                theme="light"
                            />
                        </div>
                    </form>
                    <button
                        className="mt-2 mb-4 border px-3 py-1 rounded-1 bg-success text-light fs-6"
                        onClick={() => setOpenRegister(!openRegister)}>Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;
