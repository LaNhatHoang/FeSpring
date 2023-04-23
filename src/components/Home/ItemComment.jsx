import { AiOutlineStar } from 'react-icons/ai'
import avatar from "../../img/OIP.jpg"

const ItemComment = (props) => {
    const {item} = props

    const createArray = (length) => {
        var arr = []
        for (let i = 1; i <= length; i++) {
            arr.push(i)
        }
        return arr
    }

    return (
        <div className='d-flex py-3 border-top border-bottom'>
            <div className='me-2'>
                <div style={{ width: '40px' }}>
                    <img src={avatar} className='w-100 rounded-circle' alt="" />
                </div>
            </div>
            <div className="d-flex flex-column flex-fill px-2 ">
                <div className="fw-semibold">{item.user.name}</div>
                <div className="mb-2 d-flex align-items-center">{createArray(item.star).map((index) => (<AiOutlineStar key={index} className="text-warning" />))}</div>
                <div className="">{item.comment}</div>
            </div>
        </div>
    )
}
export default ItemComment