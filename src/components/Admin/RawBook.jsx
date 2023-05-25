import { useSelector } from "react-redux"
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import { baseUrl } from "../../redux/apiRequest";

const RawBook = (props) => {
    const { book, setOpenBookDetail, setBookDetail, toast, render, setRender } = props
    const user = useSelector((state) => state.auth.login?.currentUser)

    const apiDelete = async () => {
        const res = await axios.post(`${baseUrl}/api/v1/book/delete/${book.id}`, {}, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        if (res.data.status) {
            toast.success(res.data.message)
        }
        setRender(!render)
    }

    const handleConfirmDelete = () => {
        confirmAlert({
            overlayClassName: 'bg-op',
            customUI: ({ onClose }) => {
                return (
                    <div className='mx-3 d-flex flex-column align-items-center bg-white px-5 py-4 rounded-2'>
                        <h1 className="fs-4">Xác nhận</h1>
                        <p className="fs-5">Bạn có chắc chắn muốn xóa sách ?</p>
                        <div className="d-flex w-100 justify-content-evenly">
                            <button onClick={onClose} className="px-3 py-1 border border-1 rounded-2 bg-white">Không</button>
                            <button style={{ width: '80px' }} className="border border-1 rounded-2 bg-white"
                                onClick={() => {
                                    apiDelete()
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

    const handleDelete = () => {
        handleConfirmDelete()
    }

    return (
        <div className='d-flex px-3'>
            <div className='col-3 border d-flex justify-content-center align-items-center'>
                <div className='mx-3 my-2'>{book.name}</div>
            </div>
            <div className='col-2 border d-flex justify-content-center align-items-center'>
                <div className='mx-3 my-2'>{book.author}</div>
            </div>
            <div className='col-1 border d-flex justify-content-center align-items-center'>
                <div className='mx-3 my-2'>{book.category}</div>
            </div>
            <div className='col-2 border d-flex justify-content-center align-items-center'>
                <div className='mx-3 my-2'>{new Date(book.releaseDate).toLocaleDateString()}</div>
            </div>
            <div className='col-1 border d-flex justify-content-center align-items-center'>
                <div className='mx-3 my-2'>{book.numberPage}</div>
            </div>
            <div className='col-1 border d-flex justify-content-center align-items-center'>
                <div className='mx-3 my-2'>{book.sold}</div>
            </div>
            <div className='col-2 border d-flex justify-content-center align-items-center'>
                {
                    user?.role === 'ADMIN' ?
                        <div>
                            <button onClick={() => { setOpenBookDetail(true); setBookDetail(book) }} className="px-3 py-1 my-2 me-3 border rounded-2 bg-info">View</button>
                            <button onClick={handleDelete} className="px-3 py-1 rounded-2 border bg-danger">Delete</button>
                        </div>
                        : <></>
                }
            </div>
        </div>
    )
}
export default RawBook