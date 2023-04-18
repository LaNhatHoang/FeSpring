import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from '../Login'
import HomeAdmin from './HomeAdmin'
import { useState } from 'react'

const Admin = (props) => {
    const [openLogin, setOpenLogin] = useState(false)
    const user = useSelector((state) => state.auth.login?.currentUser)

    return (
        <div className='Admin'>
            {user ? <HomeAdmin/> : openLogin ? <Login/> : <HomeAdmin setOpenLogin={setOpenLogin} />}
        </div>

    )
}

export default Admin