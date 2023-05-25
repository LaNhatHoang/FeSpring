import { baseUrl } from '../../redux/apiRequest'

const ItemBook = (props) => {
    const {id, name, author, urlImage, setBookId, setScrollY} = props 
    const handleClick = ()=>{
        setBookId(id)
        setScrollY(window.scrollY)
        window.scrollBy(0,0)
        const bookContainer = document.getElementById('Book-container')
        bookContainer.classList.add('d-none')
    }
    return (
        <div className='bg-body-secondary d-flex col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3 col-xxl-2 '>
            <div onClick={handleClick} className='hover-zoom bg-white d-flex flex-column justify-content-end w-100 m-2 border'>
                <img className='w-100' src={`${baseUrl}/api/v1/file/${urlImage}`} alt="" />
                <div className='p-2'>
                    <div style={{minHeight: '48px'}} className='name text-break fs-6 fw-semibold text-line-2'>{name}</div>
                    <div className='author fs-6 fst-italic text-line-1'>{author}</div>
                </div>
            </div>
        </div>
    )
}
export default ItemBook