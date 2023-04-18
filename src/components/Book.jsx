import { useSelector } from "react-redux"
import axios from "axios"
import { baseUrl } from "../redux/apiRequest"
import { useEffect } from "react"
import { useState } from "react"
import { IoMdArrowRoundBack } from 'react-icons/io'
import { AiOutlineStar } from 'react-icons/ai'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { BsCartPlus } from 'react-icons/bs'

const Book = (props) => {
    const { setBookId, scrollY } = props
    const [book, setBook] = useState([])
    const [count, setCount] = useState('1')
    const user = useSelector((state) => state.auth.login.currentUser)
    const number = 100000

    useEffect(() => {
        const bookApi = async () => {
            const res = await axios.get(`${baseUrl}/api/v1/book/all`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            setBook(res.data[3])
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
            console.log(str)
            setCount(str)
        } else if (str === "") {
            setCount("")
        }
        else return
    }

    console.log(count);

    return (
        <div id="Book-detail" className="position-absolute w-100 h-auto top-0 d-flex flex-column bg-body-secondary">
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
                    <div className="col-sm-8 col-xl-9 mt-sm-2 mt-xl-5 d-sm-flex flex-sm-column d-md-flex bg-white">
                        <div className="mt-2 d-flex flex-column bg-white">
                            <div className="my-2 mx-2 mt-sm-4 mx-sm-4 mt-md-5 mb-sm-0">
                                <div style={{ fontSize: '1.2rem' }} className="lh-sm fw-medium">Những chú cừu vui vẻ và con sói ranh mãnh </div>
                                <div className="fs-6 fst-italic my-sm-2">Tác giả: {book.name}</div>
                                <div style={{ color: '#ee4d2d' }}>{number.toLocaleString("de-DE")}đ</div>
                                <div className="mt-2">
                                    <div className="d-flex">
                                        <div className="me-2 d-flex align-items-center">{[1, 2, 3, 4, 5].map((index) => (<AiOutlineStar key={index} className="text-warning" />))}</div>
                                        <div style={{ fontSize: '0.9rem' }} className="px-2 border-start">Đã bán {100}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 mt-sm-0   d-flex flex-column bg-white">
                            <div className="my-2 mx-2 mx-sm-4">
                                <div className="d-flex my-md-2">
                                    <div className="me-1 d-flex align-items-center"><MdOutlineLocalShipping /></div>
                                    <div className="fs-6">Phí vận chuyển: Miễn phí</div>
                                </div>
                                <div className="d-flex my-2 mt-md-4">
                                    <div className="fs-6">Số lượng: </div>
                                    <div className="ms-4">
                                        <button onClick={decreCount} className="px-2 border">-</button>
                                        <input style={{ width: '50px', outline: 'none' }} onChange={handleChange} className="text-center" type="text" value={count} />
                                        <button onClick={increCount} className="border">+</button>
                                    </div>
                                </div>
                                <div className="d-flex mt-3 mb-2 d-md-inline-flex">
                                    <div style={{ color: '#ee4d2d', border: '1px solid', background: '#ffeae5', cursor: 'pointer' }} className="d-flex px-3 py-1 rounded-1">
                                        <div className="d-flex align-items-center"><BsCartPlus /></div>
                                        <div className="ms-1 fs-6">Thêm vào giỏ hàng</div>
                                    </div>
                                    <div
                                        style={{ background: '#ee4d2d', cursor: 'pointer' }}
                                        className="d-flex align-items-center ms-4 px-2 rounded-1 text-light "
                                    >
                                        <div className="fs-6">Mua ngay</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div style={{ height: '1000px' }} className="Comment mt-2 bg-white flex-fill">
                        <div>Binh luan</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Book