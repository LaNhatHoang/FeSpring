import { GrClose } from 'react-icons/gr'
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import axios from "axios"
import { baseUrl } from "../../redux/apiRequest"
import { confirmAlert } from 'react-confirm-alert'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BookDetail = (props) => {
    const { bookDetail, setOpenBookDetail } = props
    const user = useSelector((state) => state.auth.login.currentUser)
    const [data,setData] = useState([])
    const [edit,setEdit] = useState(true)
    const [save, setSave] = useState(false)
    const [add, setAdd] = useState(true)
    const [dislable, setDislable] = useState(true)
    const [name,setName] = useState(bookDetail.name)
    const [author, setAuthor] = useState(bookDetail.author)
    const [about, setAbout] = useState(bookDetail.about)
    const [date ,setDate] = useState(new Date(bookDetail.releaseDate).toISOString().substring(0,10))
    const [numberPage, setNumberPage] = useState(bookDetail.numberPage)
    const [category, setCategory] = useState(bookDetail.category)
    const [image, setImage] = useState(`${baseUrl}/api/v1/file/${bookDetail.urlImage}`)
    const [file, setFile] = useState(null)

    // console.log(bookDetail);

    const setAll = ()=>{
        setName("")
        setAuthor("")
        setAbout("")
        setDate("")
        setNumberPage("")
        setCategory("")
        setImage("")
        setFile(null)
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setFile(event.target.files[0])
        }
    }

    const apiAdd = async ()=>{
        let str = ""
        if( !name ){
            str += "Tiêu đề, "
        }
        if(!author){
            str += 'Tác giả, '
        }
        if(!date){
            str += 'Ngày phát hành '
        }
        if(str){
            toast.error(`Vui lòng không để trống ${str}`)
            return
        }
        if(!file){
            toast.error('Vui lòng upload ảnh')
            return
        }
        const book = {
            name: name,
            author: author,
            about: about,
            releaseDate: date,
            numberPage: numberPage,
            category: category
        }
        const res = await axios.post(`${baseUrl}/api/v1/book/add`,{
            "model" : JSON.stringify(book),
            file : file
        }
        ,{
            headers:{
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        if(res.data.status){
            setAll()
            toast.success(res.data.message)
        }
        else{
            toast.error(res.data.message)
        }
        
    }

    const handleConfirmAdd = () => {
        confirmAlert({
          overlayClassName: 'bg-op',
          customUI: ({ onClose }) => {
            return (
              <div className='mx-3 d-flex flex-column align-items-center bg-white px-5 py-4 rounded-2'>
                <h1 className="fs-4">Xác nhận</h1>
                <p className="fs-5">Bạn có chắc chắn muốn thêm mới sách ?</p>
                <div className="d-flex w-100 justify-content-evenly">
                  <button onClick={onClose} className="px-3 py-1 border border-1 rounded-2 bg-white">Không</button>
                  <button style={{ width: '80px' }} className="border border-1 rounded-2 bg-white"
                    onClick={() => {
                        onClose()
                        apiAdd()
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


    const handleEdit = ()=>{
        setEdit(false)
        setSave(true)
        setDislable(false)
    }

    const handleSave = async ()=>{
        const book = {
            name: name,
            author: author,
            about: about,
            releaseDate: date,
            numberPage: numberPage,
            category: category
        }
        if(!file){
            const res = await axios.post(`${baseUrl}/api/v1/book/update/${bookDetail.id}`, book,{
                headers :{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            if(res.data.status){
                toast.success(res.data.message)
            }
        }
        else{
            const res = await axios.post(`${baseUrl}/api/v1/book/updateWithFile/${bookDetail.id}`,{
                "model" : JSON.stringify(book),
                file : file
            }
            ,{
                headers:{
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            if(res.data.status){
                toast.success(res.data.message)
            }
            else{
                toast.error(res.data.message)
            }
        }
    }

    const handleAdd = ()=>{
        if(edit || save){
            setEdit(false)
            setSave(false)
            setDislable(false)
            setAll()
        }
        else{
            handleConfirmAdd()
        }
    }

    return (
        <div className="vh-100 flex-fill bg-white">
            <div className='d-flex justify-content-end'>
                <div onClick={() => setOpenBookDetail(false)} style={{ cursor: 'pointer' }} className='py-2 px-3 border'>
                    <GrClose />
                </div>
            </div>
            <div style={{height: '500px'}} className='d-flex mx-5 mt-4 mb-5'>
                <div className='col-4 d-flex flex-column'>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column'>
                            <label className='mb-1'>Tiêu đề</label>
                            { dislable ? 
                                <input disabled value={name} type="text" /> 
                                : <input value={name} onChange={(e)=>setName(e.target.value)} type="text" />
                            }
                        </div>
                        <div className='d-flex flex-column '>
                            <label className='mb-1'>Tác giả</label>
                            {dislable ?
                                <input disabled value={author}  type="text" />
                                : <input value={author} onChange={(e)=>setAuthor(e.target.value)} type="text"  />
                            }
                        </div>
                    </div>
                    <div className='mt-3 d-flex flex-column'>
                        <label className='mb-1'>Mô tả về sách</label>
                        {dislable ?
                            <textarea disabled value={about} rows={8}></textarea>
                            : <textarea value={about} rows={8} onChange={(e)=>setAbout(e.target.value)} ></textarea>
                        }
                    </div>
                    <div className='mt-3 d-flex justify-content-between'>
                        <div className='d-flex flex-column'>
                            <label className='mb-1'>Ngày phát hành</label>
                            {dislable ?
                                <input disabled value={date} type="date" />
                                : (!edit && !save) ? <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                                : <input value={date} onChange={(e)=>setDate(e.target.value)} type="date" />
                            }
                        </div>
                        <div className='d-flex flex-column'>
                            <label className='mb-1'>Số trang</label>
                            {dislable ?
                                <input disabled value={numberPage} type="number"  />
                                : <input value={numberPage} onChange={(e)=>setNumberPage(e.target.value)} type="number" />
                           }
                        </div>
                    </div>
                    <div className='mt-3 d-flex flex-column'>
                        <label className='mb-1'>Thể loại</label>
                        {dislable ?
                            <select disabled value={category} className='col-4'>
                                <option value=""></option>
                                <option value="Thiếu nhi">Thiếu nhi</option>
                                <option value="Văn học">Văn học</option>
                                <option value="Khoa học">Khoa học</option>
                                <option value="Công nghệ">Công nghê</option>
                            </select>
                            :
                            <select value={category} onChange={(e)=>setCategory(e.target.value)} className='col-4'>
                               <option value=""></option>
                                <option value="Thiếu nhi">Thiếu nhi</option>
                                <option value="Văn học">Văn học</option>
                                <option value="Khoa học">Khoa học</option>
                                <option value="Công nghệ">Công nghệ</option>
                            </select>
                        }
                    </div>
                </div>
                <div className='Upload mt-4 d-flex col-6 justify-content-center'>
                    <div className='col-6 d-flex flex-column align-items-center'>
                        <div className='d-flex justify-content-center'>
                            <label 
                                style={{cursor: 'pointer'}} 
                                htmlFor="inputFile" 
                                className='border px-3 py-1 rounded-1'
                            >Upload</label>
                            {dislable ?
                                <input disabled type="file" id='inputFile' onChange={onImageChange} style={{ display: 'none' }} />
                                : <input type="file" id='inputFile' onChange={onImageChange} style={{ display: 'none' }} />
                            }
                        </div>
                        <div className='w-75 mt-4'>
                            { image ?
                                <img alt="preview" src={image} className='w-100' />
                                :
                                <img  className='' />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end border-top border-2 border-black'>
                <div className='d-flex pt-3 '>
                    {edit ? <div onClick={handleEdit} style={{cursor: 'pointer'}} className='mx-2 px-3 py-1 d-flex align-items-center border border-black border-2 rounded-1 text-black'>Edit</div> : <></>}
                    {save ? <div onClick={handleSave} style={{cursor: 'pointer'}} className='mx-2 px-3 py-1 d-flex align-items-center border border-black border-2 rounded-1 text-black'>Save</div> : <></>}
                    {add ? <div onClick={handleAdd} style={{cursor: 'pointer'}} className='mx-2 px-3 py-1 d-flex align-items-center border border-black border-2 rounded-1 text-black'>Add</div> : <></>}
                    
                </div>
            </div>
            <ToastContainer
                position="top-center"
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

export default BookDetail