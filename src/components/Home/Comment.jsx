import { AiOutlineStar } from 'react-icons/ai'
import avatar from "../../img/OIP.jpg"
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../../redux/apiRequest'
import { useEffect } from 'react'
import ItemComment from './ItemComment'

const Comment = (props) => {
    const {bookId} = props
    const user = useSelector((state)=>state.auth.login.currentUser)
    const [comment, setComment] = useState("")
    const [star, setStar] = useState(0)
    const [listComment, setListComment] = useState([])
    const[renderComment, setRenderComment] = useState(true)


    useEffect(()=>{
        apiGetComment()
    },[renderComment])

    const apiGetComment = async ()=>{
        const res = await axios.get(`${baseUrl}/api/v1/review/get/${bookId}`,{
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        setListComment(res.data)
    }

    const apiAddComment = async (review)=>{
        const res = await axios.post(`${baseUrl}/api/v1/review/add/${bookId}`,review,{
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        if(res.data.status){
            toast.success(res.data.message)
        }
        else{
            toast.error(res.data.message)
        }
        setRenderComment(!renderComment)
        setStar(0)
        setComment("")
    }

    const handleComment = () => {
        if(star===0){
            toast.error("Vui lòng chọn số sao để đánh giá")
            return
        }
        if( !/\d/.test(comment) && !/[a-zA-Z]/.test(comment)){
            toast.error("Nội dung đánh giá không hợp lệ")
            return
        }
        const review = {
            comment: comment.trim(),
            star: star
        }
        apiAddComment(review)
    }
    const handleCancelComment = ()=>{
        setComment("")
        setStar(0)
    }

    return (
        <div className="mt-3 mx-3">
            <div className='d-flex'>
                <div className='me-2'>
                    <div className='mb-2 py-3' ></div>
                    <div style={{ width: '40px' }} className=''>
                        <img className='w-100 border rounded-circle' src={avatar} alt="" />
                    </div>
                </div>
                <div className='ms-2'>
                    <div className='d-flex mb-2'>
                        {
                            [1, 2, 3, 4, 5].map((index) => (
                                index === star ?
                                    <div onClick={() => setStar(index)} key={index} className='bg-or d-flex align-items-center px-3 py-1 border rounded-2 me-2 hover-cursor'>
                                        <div className='fs-6 me-1'>{index}</div>
                                        <AiOutlineStar className='text-warning' />
                                    </div>
                                    :
                                    <div onClick={() => setStar(index)} key={index} className='d-flex align-items-center px-3 py-1 border rounded-2 me-2 hover-cursor'>
                                        <div className='fs-6 me-1'>{index}</div>
                                        <AiOutlineStar className='text-warning' />
                                    </div>
                            ))
                        }
                    </div>
                    <div className='mb-2'>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} cols={100} rows="3" placeholder="Viết đánh giá" className="ps-2 w-75"></textarea>
                    </div>
                    <div className='d-flex mb-3'>
                        <button onClick={handleCancelComment} className='me-4 border rounded-3 px-2 py-1'>Hủy</button>
                        <button onClick={handleComment} className='border rounded-3 px-2 py-1'>Đánh giá</button>
                    </div>
                </div>
            </div>


            {
                listComment.map((item, index)=>(
                    <ItemComment key={index} item={item} />
                ))
            }

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
    )
}
export default Comment