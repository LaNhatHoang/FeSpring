
import { useState } from 'react'
import HomeHistory from './HomeHistory'
import DetailHistory from './DetailHistory'

const History = () => {
    const[detailHistory, setDetailHistory] = useState(false)
    const[detailBook, setDetailBook] = useState({})
    return (
       <div>
            {
                detailHistory 
                ? <DetailHistory setDetailHistory={setDetailHistory} detailBook={detailBook}/> 
                : <HomeHistory setDetailHistory={setDetailHistory} setDetailBook={setDetailBook}/>
            }
       </div>
    )
}
export default History