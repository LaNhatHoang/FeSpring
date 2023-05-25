import { useSelector } from "react-redux"
import axios from "axios"
import { baseUrl } from "../../redux/apiRequest"
import { useEffect } from "react"
import { useState } from "react"
import { IoMdArrowRoundBack } from 'react-icons/io'
import { AiOutlineStar } from 'react-icons/ai'
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast } from "react-toastify"
import Comment from "./Comment"

const Book = (props) => {
    const { bookId, setBookId, scrollY } = props
    const [book, setBook] = useState({})
    const [count, setCount] = useState('1')
    const user = useSelector((state) => state.auth.login.currentUser)


    useEffect(() => {
        const bookApi = async () => {
            const res = await axios.get(`${baseUrl}/api/v1/book/${bookId}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            setBook(res.data)
        }
        window.scroll({ top: 0, behavior: 'instant' })
        bookApi()
    }, [])

    const handleClick = () => {
        const bookContainer = document.getElementById('Book-container')
        bookContainer.classList.remove('d-none')
        setBookId(0)
        window.scroll({ top: scrollY, behavior: 'instant' })
    }

    const decreCount = () => {
        if (count === '' || count === '0' || count === '1') {
            setCount('0')
        }
        else setCount((Number(count) - 1).toString())
    }
    const increCount = () => {
        if (count === '') {
            setCount('1')
        }
        else setCount((Number(count) + 1).toString())
    }
    const handleChange = (e) => {
        const str = e.target.value
        const regex = /^\d+$/
        if (regex.test(str) && !str.startsWith('0') && str.length <= 5) {
            setCount(str)
        } else if (str === "") {
            setCount("")
        }
        else return
    }

    const order = {
        quantity: Number.parseInt(count)
    }

    const apiOrder = async ()=>{
        const res = await axios.post(`${baseUrl}/api/v1/order/add/${bookId}`,order,{
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        })
        if(res.data.status){
            toast.success(res.data.message)
        }
        else{
            toast.error(res.data.message)
        }
    }
    const handleConfirm = () => {
        confirmAlert({
            title: 'Xác nhận',
            message: `Bạn có chắc chắn mua cuốn sách này với số lượng ${count} ? `,
            overlayClassName: 'bg-op',
            customUI: ({ onClose }) => {
                return (
                    <div className='mx-3 d-flex flex-column align-items-center bg-white px-5 py-4 rounded-2'>
                        <h1 className="fs-4">Xác nhận</h1>
                        <p className="fs-5">{`Bạn có chắc chắn mua cuốn sách này với số lượng ${count} ?`}</p>
                        <div className="d-flex w-100 justify-content-evenly">
                            <button onClick={onClose} className="px-3 py-1 border border-1 rounded-2 bg-white">Không</button>
                            <button style={{ width: '80px' }} className="border border-1 rounded-2 bg-white"
                                onClick={() => {
                                    apiOrder()
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

    const handleBuy = () => {
        if (count === '' || count === '0') {
            toast.error("Số lượng sách không hợp lệ")
        }
        else {
            handleConfirm()
        }
    }


    return (
        <div id="Book-detail" className="position-absolute w-100 top-0 d-flex flex-column bg-body-secondary">
            <div className="Header d-flex w-100 position-fixed bg-white shadow-sm">
                <div onClick={handleClick} style={{ cursor: 'pointer' }} className="Close p-2 fs-6 border-end border-1 d-flex align-items-center">
                    <IoMdArrowRoundBack className="" />
                    <div className="mx-1">Back</div>
                </div>
            </div>
            <div className="mx-xl-5 mx-lg-4">
                <div className="mt-4 bg-body-secondary d-sm-flex flex-sm-wrap mx-md-5">
                    <div className="mt-3 mt-sm-2 mt-xl-5 d-flex flex-column col-sm-4 col-xl-3 align-items-center align-items-sm-start bg-white">
                        <div className="d-flex my-2 mb-sm-3 mt-sm-4 col-6 col-sm-12 justify-content-center">
                            <div className="d-flex w-100 mx-sm-3 ms-md-5 my-md-4">
                                <img className="w-100" src={`${baseUrl}/api/v1/file/${book.urlImage}`} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8 flex-fill col-xl-9 mt-sm-2 mt-xl-5 d-sm-flex flex-sm-column d-md-flex bg-white">
                        <div className="mt-2 h-75 d-flex flex-column bg-white">
                            <div className="my-2 mx-2 mt-sm-4 mx-sm-4 mt-md-5 mb-sm-0">
                                <div style={{ fontSize: '1.2rem' }} className="lh-sm fw-medium">{book.name}</div>
                                <div className="fs-6 fst-italic my-2">Tác giả: {book.author}</div>
                                <div >Ngày phát hành: {new Date(book.releaseDate).toLocaleDateString()}</div>
                                <div >Thể loại: {book.category}</div>
                                <div >Số trang: {book.numberPage}</div>
                                <div className="my-2 ">
                                    {book.about}
                                </div>
                                <div className="mt-2">
                                    <div className="d-flex">
                                        <div className="me-2 d-flex align-items-center">{[1, 2, 3, 4, 5].map((index) => (<AiOutlineStar key={index} className="text-warning" />))}</div>
                                        <div style={{ fontSize: '0.9rem' }} className="px-2 border-start">Đã bán {book.sold}</div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <div className="d-flex">
                                        <div className="me-3">Số lượng:</div>
                                        <div>
                                            <button onClick={decreCount} className="border px-2 bg-white">-</button>
                                            <input
                                                onChange={handleChange}
                                                style={{ width: '5rem', textAlign: 'center' }}
                                                className="border" type="text" value={count} maxLength={6}
                                            />
                                            <button onClick={increCount} className="border bg-white">+</button>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <button
                                            onClick={handleBuy}
                                            style={{ background: "#f55d3f" }}
                                            className="py-1 px-2 hover-op border-0 rounded-2 text-light"
                                        >Đặt mua</button>
                                    </div>
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
                            </div>
                        </div>
                    </div>
                    <div style={{minHeight: '1000px'}} className="Comment mt-2 bg-white flex-fill">
                        <Comment bookId={bookId} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Book