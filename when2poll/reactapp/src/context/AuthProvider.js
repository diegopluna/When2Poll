import { createContext, useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import axios from "axios";


const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = () => {

    let [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);

    let navigate = useNavigate();


    let loginUser = async (e ) => {

        const domain = window.location.origin

        e.preventDefault()
        const response = await axios.post(domain+'/api/token/',{
            email: e.target.email.value,
            password: e.target.password.value
        });
        let data = await response.data
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate("/");
        }else{
            alert('Usuário ou senha incorretos!')
        }
    }

    let contextData = {
        user:user,
        loginUser:loginUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            <Outlet />
        </AuthContext.Provider>
    );
}