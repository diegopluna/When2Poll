import { createContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import axios from "axios";

const AuthContext = createContext()


export default AuthContext;


export const AuthProvider = () => {


    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true)

    let navigate = useNavigate();


    const domain = window.location.origin

    let loginUser = async (e ) => {

        e.preventDefault()
        try {
            const response = await axios.post(domain+'/api/token/',{
                email: e.target.email.value,
                password: e.target.password.value
            });
            if (response.status === 200) {
                setAuthTokens(response.data)
                setUser(jwt_decode(response.data.access))
                localStorage.setItem('authTokens', JSON.stringify(response.data))
                navigate("/");
            }
        } catch (error) {
            return ["Usuário ou senha incorreta", "danger", true]
        }   
    }

    let signUpUser = async (e ) => {

        e.preventDefault()
        if (e.target.password.value === e.target.passwordConfirm.value) {
            try {
                const response = await axios.post(domain+'/api/register/',{
                    full_name: e.target.firstName.value+' '+e.target.lastName.value,
                    email: e.target.email.value,
                    password: e.target.password.value
                })
                console.log(response.status)
                if (response.status === 201){
                    return ["Conta criada", "success", true]
                }
            } catch (error) {
                if (error.response.data.email[0] === "user with this email already exists.") {
                    return ["Email já está em uso!", "danger", true]
                }
                return ["Erro de conexão com o servidor", "danger", true]
            }
        }else{
            return ["As senhas devem ser iguais", "danger", true]
        }
        
    }

    let logoutUser = async () => {
        // const response = await axios.post(domain+'/api/logout',{
        //     refresh_token: tokens.refresh
        // });
        // await api.post("/api/logout/",{
        //     refresh_token: authTokens.refresh
        // });
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate("/login")
    }

    // let updateToken =  async ()=> {
    //     console.log('Update token called')
    //     const response = await axios.post(domain+'/api/token/refresh/',{
    //         refresh: authTokens?.refresh,
    //     });
    //     let data = await response.data

    //     if (response.status === 200) {
    //         setAuthTokens(data)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('authTokens', JSON.stringify(data))
    //     }else{
    //         logoutUser()
    //     }

    //     if (loading){
    //         setLoading(false)
    //     }
    // }

    useEffect(()=> {

        if (authTokens){
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)

    }, [authTokens, loading])

    let contextData = {
        user:user,
        authTokens:authTokens,
        setAuthTokens:setAuthTokens,
        setUser:setUser,
        loginUser:loginUser,
        logoutUser:logoutUser,
        signUpUser:signUpUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            <Outlet />
        </AuthContext.Provider>
    );
}