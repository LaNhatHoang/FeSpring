import { AiOutlineHome } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import avatar from '../../img/avatar.png'
import { useState, useEffect } from 'react'
import RawBook from './RawBook'
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import { baseUrl } from "../../redux/apiRequest";
import { logoutStart, logoutSuccess } from "../../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";

const BookContainer = (props) => {
    const { openProfile, setOpenProfile, setOpenLogin, setOpenBookDetail, setBookDetail } = props
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.login?.currentUser)
    const token = user?.token
    const [listBook, setListBook] = useState([])
    const [render, setRender] = useState(false)


    useEffect(() => {
        const bookApi = async () => {
            const res = await axios.get(`${baseUrl}/api/v1/book/getall`)
            setListBook(res.data)
        }
        bookApi()
    }, [render])

    const handleConfirmLogout = () => {
        confirmAlert({
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn thoát ? ',
            overlayClassName: 'bg-op',
            customUI: ({ onClose }) => {
                return (
                    <div className='mx-3 d-flex flex-column align-items-center bg-white px-5 py-4 rounded-2'>
                        <h1 className="fs-4">Xác nhận</h1>
                        <p className="fs-5">Bạn có chắc chắn muốn thoát không ?</p>
                        <div className="d-flex w-100 justify-content-evenly">
                            <button onClick={onClose} className="px-3 py-1 border border-1 rounded-2 bg-white">Không</button>
                            <button style={{ width: '80px' }} className="border border-1 rounded-2 bg-white"
                                onClick={() => {
                                    handleLogout()
                                    onClose()
                                }}
                            >
                                Có
                            </button>
                        </div>
                    </div>
                );
            },
        });
    }
    const handleLogout = async () => {
        dispatch(logoutStart())
        try {
            const res = await axios.post(`${baseUrl}/api/v1/auth/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            })
            dispatch(logoutSuccess())
        } catch (err) {
            dispatch(logoutSuccess())
        }
    }

    return (
        <div className='w-100'>
            <div className="Header d-flex justify-content-between w-100 position-fixed z-2 bg-white shadow-sm">
                <div onClick={() => navigate("/")} style={{ cursor: 'pointer' }} className="px-3 py-2 fs-6 border-end border-1 d-flex align-items-center">
                    <AiOutlineHome style={{ width: '1.8rem', height: '100%' }} />
                </div>
                <div className="d-flex ms-1 position-relative">
                    <div>
                        <img onClick={(e) => { e.stopPropagation(); setOpenProfile(!openProfile) }} style={{ width: '40px' }} className="border rounded-circle me-sm-2 me-lg-4" src={avatar} alt="" />
                    </div>
                    {
                        user?.role ? openProfile ?
                            <div style={{ width: '9rem' }} onClick={(e) => e.stopPropagation()} className="rounded-1 p-3 z-3 d-flex flex-column position-absolute bg-white shadow-lg end-0 top-100">
                                <Link onClick={(e)=>{e.stopPropagation(); handleConfirmLogout()}} className="text-decoration-none fs-6 ">Đăng xuất</Link>
                            </div> : <></>
                            : openProfile ?
                                <div style={{ width: '9rem' }} onClick={(e) => e.stopPropagation()} className="rounded-1 p-3 z-3 d-flex flex-column position-absolute bg-white shadow-lg end-0 top-100">
                                    <Link onClick={() => setOpenLogin(true)} className="text-decoration-none fs-6 ">Đăng nhập</Link>
                                </div> : <></>
                    }
                </div>
            </div>
            <div className='Body d-flex mt-5 mx-5'>
                <div style={{minHeight: '1000px'}} className='mt-5 w-100 bg-white'>
                    <div className='Table d-flex flex-column'>
                        <div className='d-flex px-3 pt-3'>
                            <div className='col-3 border d-flex justify-content-center align-items-center'>
                                <div className='mx-3 my-2'>Tiêu đề</div>
                            </div>
                            <div className='col-2 border d-flex justify-content-center align-items-center'>
                                <div className='mx-3 my-2'>Tác giả</div>
                            </div>
                            <div className='col-1 border d-flex justify-content-center align-items-center'>
                                <div className='mx-3 my-2'>Thể loại</div>
                            </div>
                            <div className='col-2 border d-flex justify-content-center align-items-center'>
                                <div className='mx-3 my-2'>Ngày phát hành</div>
                            </div>
                            <div className='col-1 border d-flex justify-content-center align-items-center'>
                                <div className='mx-3 my-2'>Số trang</div>
                            </div>
                            <div className='col-1 border d-flex justify-content-center align-items-center'>
                                <div className='mx-3 my-2'>Đã bán</div>
                            </div>
                            <div className='col-2 border d-flex justify-content-center align-items-center'>
                                <div className='mx-3 my-2'>Action</div>
                            </div>
                        </div>
                        {
                            listBook.map((book, index) => (
                                <RawBook 
                                    key={index} book={book} 
                                    setOpenBookDetail={setOpenBookDetail} 
                                    setBookDetail={setBookDetail} 
                                    toast={toast}
                                    render={render}
                                    setRender={setRender}
                                />
                            ))
                        }
                    </div>

                </div>
            </div>
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
    )
}
export default BookContainer