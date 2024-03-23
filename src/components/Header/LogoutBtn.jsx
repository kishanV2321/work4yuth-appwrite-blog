import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout as storeLogout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(
            () => {
                dispatch(storeLogout())
            }
        ).catch( (error) => console.log(error))
    }
    return (
        <button onClick={logoutHandler}
        className='inline-bock ml-2 px-4 py-2 duration-200 text-white bg-[#ee0404] hover:scale-110 hover:shadow-lg rounded'
        >Logout</button>
    )
}

export default LogoutBtn

//text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2