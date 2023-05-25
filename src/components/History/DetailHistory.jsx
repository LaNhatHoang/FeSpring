
import axios from 'axios'
import { baseUrl } from '../../redux/apiRequest'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { AiOutlineStar } from 'react-icons/ai'
import { confirmAlert } from "react-confirm-alert";

const DetailHistory = (props) => {
    const { setDetailHistory, detailBook } = props
    const user = useSelector((state) => state.auth.login.currentUser)
    const [cancelBuy, setCancelBuy] = useState(false)

    console.log(detailBook);

    const apiDelete = async (id) => {
        const res = await axios.post(`${baseUrl}/api/v1/order/delete/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        if (res.data.status) {
            toast.success(res.data.message)
        }
        else {
            toast.error(res.data.message)
        }
    }

    const handleConfirmDelete = (id) => {
        confirmAlert({
            overlayClassName: 'bg-op',
            customUI: ({ onClose }) => {
                return (
                    <div className='mx-3 d-flex flex-column align-items-center bg-white px-5 py-4 rounded-2'>
                        <h1 className="fs-4">Xác nhận</h1>
                        <p className="fs-5">Bạn có chắc chắn muốn hủy mua ?</p>
                        <div className="d-flex w-100 justify-content-evenly">
                            <button onClick={onClose} className="px-3 py-1 border border-1 rounded-2 bg-white">Không</button>
                            <button style={{ width: '80px' }} className="border border-1 rounded-2 bg-white"
                                onClick={() => {
                                    apiDelete(id)
                                    setCancelBuy(true)
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

    return (
        <div className='w-100 vh-100 top-0 d-flex flex-column bg-white'>
            <div className="Header d-flex flex-row-reverse w-100 bg-white shadow-sm">
                <div onClick={() => setDetailHistory(false)} style={{ cursor: 'pointer' }} className="Close p-2 fs-6 border-start border-1 d-flex align-items-center">
                    <div className="mx-1 px-2">X</div>
                </div>
            </div>
            <div className='d-flex' >
                <div className='col-3'>
                    <div className='m-5'>
                        <div >
                            <img className="w-100" src={`${baseUrl}/api/v1/file/${detailBook.book.urlImage}`} alt="" />
                        </div>
                    </div>
                </div>
                <div className=" col-9">
                    <div className="d-flex flex-column">
                        <div className='mt-5'>
                            <div style={{ fontSize: '1.2rem' }} className="lh-sm fw-medium">{detailBook.book.name}</div>
                            <div className="fs-6 fst-italic my-2">Tác giả: {detailBook.book.author}</div>
                            <div >Ngày phát hành: {new Date(detailBook.book.releaseDate).toLocaleDateString()}</div>
                            <div >Thể loại: {detailBook.book.category}</div>
                            <div >Số trang: {detailBook.book.numberPage}</div>
                            <div className="my-2 ">{detailBook.book.about}</div>
                            <div className="mt-2">
                                <div className="d-flex">
                                    <div className="me-2 d-flex align-items-center">{[1, 2, 3, 4, 5].map((index) => (<AiOutlineStar key={index} className="text-warning" />))}</div>
                                    <div style={{ fontSize: '0.9rem' }} className="px-2 border-start">Đã bán {detailBook.book.sold}</div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <div>
                                Thời gian đặt mua: {new Date(detailBook.timeOrder).toLocaleString()}
                            </div>
                            <div className='mt-1'>
                                Số lượng đặt mua: {detailBook.quantity}
                            </div>
                            <div className='mt-1'>
                                {
                                    cancelBuy ? <></>
                                        : <button
                                            onClick={() => handleConfirmDelete(detailBook.id)}
                                            className='border rounded-2 px-2 py-1 my-2 bg-danger'
                                        >Hủy đặt mua</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-center"
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
        </div>
    )
}
export default DetailHistory