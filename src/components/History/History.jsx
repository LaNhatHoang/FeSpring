import axios from 'axios'
import { useEffect } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../redux/apiRequest'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import ItemHistory from './ItemHistory'
import { ToastContainer, toast } from 'react-toastify'

const History = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.login.currentUser)
    const [data, setData] = useState([])
    const[render, setRender] = useState(true)

    const apiOrder = async () => {
        const res = await axios.get(`${baseUrl}/api/v1/order/get`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        setData(res.data)
    }

    useEffect(() => {
        apiOrder()
    }, [render])

    return (
        <div className='w-100 h-auto top-0 d-flex flex-column bg-body-secondary'>
            <div className="Header d-flex w-100 position-fixed bg-white shadow-sm">
                <div onClick={() => navigate("/")} style={{ cursor: 'pointer' }} className="Close p-2 fs-6 border-end border-1 d-flex align-items-center">
                    <IoMdArrowRoundBack className="" />
                    <div className="mx-1">Back</div>
                </div>
            </div>
            <div className='mt-5'>
                <div style={{ height: '2000px' }} className='mt-4 mx-5 bg-white'>
                    <div>
                        <div className='d-flex px-3 pt-3'>
                            <div className='col-3 border d-flex justify-content-center align-items-center'>
                                <div className='my-2'>Tên sách</div>
                            </div>
                            <div className='col-2 border d-flex justify-content-center align-items-center'>
                                <div>Tác giả</div>
                            </div>
                            <div className='col-1 border d-flex justify-content-center align-items-center'>
                                <div>Thể loại</div>
                            </div>
                            <div className='col-2 border d-flex justify-content-center align-items-center'>
                                <div>Ngày phát hành</div>
                            </div>
                            <div className='col-1 border d-flex justify-content-center align-items-center'>
                                <div>Số lượng</div>
                            </div>
                            <div className='col-2 border d-flex justify-content-center align-items-center'>
                                <div>Thời gian đặt mua</div>
                            </div>
                            <div className='col-1 border d-flex justify-content-center align-items-center'>
                                <div>Action</div>
                            </div>
                        </div>
                        {
                            data.map((data, index) => (
                                <ItemHistory key={index} data={data} toast={toast} render={render} setRender={setRender} />
                            ))
                        }
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
                        pauseOnHover
                        theme="light"
                    />
                </div>
            </div>
        </div>
    )
}
export default History