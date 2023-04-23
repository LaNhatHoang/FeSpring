import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { baseUrl } from "../../redux/apiRequest";
import { useSelector } from "react-redux";

const ItemHistory = (props) => {
    const { data, toast,render, setRender } = props
    const user = useSelector((state)=>state.auth.login.currentUser)

    const apiDelete = async (id)=>{
        const res = await axios.post(`${baseUrl}/api/v1/order/delete/${id}`,{},{
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
        setRender(!render)
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
        <div className='d-flex px-3'>
            <div className='col-3 border d-flex justify-content-center align-items-center'>
                <div className='my-2'>{data.book.name}</div>
            </div>
            <div className='col-2 border d-flex justify-content-center align-items-center'>
                <div>{data.book.author}</div>
            </div>
            <div className='col-1 border d-flex justify-content-center align-items-center'>
                <div>{data.book.category}</div>
            </div>
            <div className='col-2 border d-flex justify-content-center align-items-center'>
                <div>{new Date(data.book.releaseDate).toLocaleDateString()}</div>
            </div>
            <div className='col-1 border d-flex justify-content-center align-items-center'>
                <div>{data.quantity}</div>
            </div>
            <div className='col-2 border d-flex justify-content-center align-items-center'>
                <div>{new Date(data.timeOrder).toLocaleString()}</div>
            </div>
            <div className='col-1 border d-flex justify-content-center align-items-center'>
                <div>
                    <button onClick={()=>handleConfirmDelete(data.id)} className="border rounded-2 px-2 py-1 my-2 bg-danger">Hủy mua</button>
                </div>
            </div>
        </div>
    )
}

export default ItemHistory