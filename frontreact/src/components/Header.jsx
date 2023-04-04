import React, {useContext} from 'react'
import { Link, Outlet } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <div>
            <Link to="/">Home</Link>
            <span> | </span>
            <Link to="/login">Login</Link>
        </div>
        <Outlet />
    </>
    
  )
}

export default Header