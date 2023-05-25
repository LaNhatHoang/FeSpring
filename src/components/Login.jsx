import { useState } from "react";
import { baseUrl } from '../redux/apiRequest'
import { useDispatch } from "react-redux";
import { loginFailed, loginStart, loginSuccess } from "../redux/authSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Register from "./Register";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [openRegister, setOpenRegister] = useState(false)
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        if(username===""){
            toast.error("Vui lòng không để trống Email")
            return
        }
        if(password===""){
            toast.error("Vui lòng không để trống Mật khẩu")
            return
        }
        const newUser = {
            email: username,
            password: password
        }
        try {
            dispatch(loginStart())
            const res = await axios.post(`${baseUrl}/api/v1/auth/login`, newUser, { withCredentials: true })
            if (!res.data.status) {
                const noti = () => {
                    toast.error(res.data.message);
                }
                noti()
                dispatch(loginFailed())
            }
            else {
                const user = {
                    id: res.data.id,
                    token: res.data.accessToken,
                    role: res.data.role
                }
                dispatch(loginSuccess(user))
            }
        } catch (err) {
            dispatch(loginFailed())
        }
    }
    return (
        <>{openRegister ? <Register openRegister={openRegister} setOpenRegister={setOpenRegister} /> :
            <div className=" d-flex justify-content-center">
                <div className="mt-5">
                    <div style={{ width: '300px' }} className="border rounded-4 mt-5  bg-white shadow-lg  d-flex flex-column align-items-center">
                        <div className="p-2 fs-5 fw-medium"></div>
                        <form className="w-100 px-4 d-flex flex-column justify-content-start"
                            onSubmit={handleLogin}>
                            <label className="py-1 fs-6">Email</label>
                            <input className="px-2 py-1 mb-3 fs-6 border rounded-1"
                                type="text" requred
                                placeholder="Enter your username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label className="py-1 fs-6">Mật khẩu </label>
                            <input className="px-2 py-1 mb-3 fs-6 border rounded-1"
                                type="password" 
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="my-2 d-flex justify-content-center">
                                <button 
                                    className="border border-0 px-2 py-1 rounded-2 bg-primary text-light fs-6" 
                                    type="submit" 
                                > Đăng nhập </button>
                                <ToastContainer
                                    position="top-right"
                                    autoClose={1000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss={false}
                                    draggable
                                    pauseOnHover
                                    theme="light"
                                />
                            </div>
                        </form>
                        <div className="my-2 fs-6"> Nếu bạn chưa có tài khoản </div>
                        <button
                            className="mb-4 border px-2 py-1 rounded-1 bg-success text-light fs-6"
                            onClick={() => setOpenRegister(!openRegister)}>Tạo tài khoản
                        </button>
                    </div>
                </div>
            </div>
        }
        </>
    );
}

export default Login;