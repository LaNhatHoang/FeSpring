import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutStart, logoutSuccess} from "../redux/authSlice";
import axios from "axios";
import { baseUrl } from "../redux/apiRequest";
import logo from "../img/logo192.png"
import avatar from '../img/avatar.png'
import { BsSearch } from 'react-icons/bs'
import { BiMenu } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'


const NavBar = (props) => {
  const navigate = useNavigate()
  const { openProfile, setOpenProfile, filter, setFilter } = props
  const user = useSelector((state) => state.auth.login?.currentUser)
  const token = user?.token
  const dispatch = useDispatch()

  const handleSubmit = () => {
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
    <div className="Navbar px-2 py-1 bg-white d-flex justify-content-between align-items-center">
      <Link to={""}>
      <div style={{ height: '2rem' }} className="d-flex me-3 ms-sm-2 me-sm-4">
        <div onClick={() => setFilter(!filter)} className="me-3 d-lg-none">
          <BiMenu style={{ height: '100%', width: '1.8rem' }} />
        </div>
        <img className="rotate-logo" src={logo} alt="" />
      </div>
      </Link>
      <div className="w-50 me-2 d-flex border rounded-4 overflow-hidden">
        <form className="w-100">
          <input style={{ outline: 'none' }} className="w-100 border border-0 px-3 fs-6 py-1" type="text" placeholder="Search" />
        </form>
        <button className="border border-0 px-3 d-none d-sm-block"><BsSearch /></button>
      </div>
      <div className="d-flex ms-1 position-relative">
        <div className="me-4 d-sm-block d-none">
          <Link to={"/cart"}>
            <AiOutlineShoppingCart style={{ height: '100%', width: '30px' }} />
          </Link>
        </div>
        <div onClick={(e) => { e.stopPropagation(); setOpenProfile(!openProfile) }}>
          <img style={{ width: '40px' }} className="border rounded-circle me-sm-2 me-lg-4" src={avatar} alt="" />
        </div>
        {
          openProfile ?
            <div style={{ width: '9rem' }} onClick={(e) => e.stopPropagation()} className="rounded-1 p-3 z-3 d-flex flex-column position-absolute bg-white shadow-lg end-0 top-100">
              {user.role === 'ADMIN' ? <Link to={"/admin"} className="text-decoration-none fs-6 pb-1">Trang quản trị</Link> : <></>}
              <Link className="text-decoration-none fs-6 pb-1 d-sm-none">Giỏ hàng</Link>
              <Link className="text-decoration-none fs-6 pb-1">Lịch sử mua</Link>
              <Link onClick={handleSubmit} className="text-decoration-none fs-6 ">Đăng xuất</Link>
            </div> : <></>
        }
      </div>
    </div>
  );
};

export default NavBar;
