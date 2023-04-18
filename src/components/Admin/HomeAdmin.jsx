import { useState} from 'react'
import BookDetail from './BookDetail'
import BookContainer from './BookContainer'

const HomeAdmin = (props) => {
    const { setOpenLogin } = props
    const [openProfile, setOpenProfile] = useState(false)
    const [openBookDetail, setOpenBookDetail] = useState(false)
    const [ bookDetail, setBookDetail] = useState({})

    return (
        <div onClick={() => setOpenProfile(false)} className='d-flex'>
            {openBookDetail ? 
                <BookDetail bookDetail={bookDetail} setOpenBookDetail={setOpenBookDetail} /> 
                :
                <BookContainer 
                    openProfile={openProfile} setOpenProfile={setOpenProfile} 
                    setOpenLogin={setOpenLogin} 
                    setOpenBookDetail={setOpenBookDetail} 
                    setBookDetail={setBookDetail} 
                />
            }
        </div>
    )
}

export default HomeAdmin