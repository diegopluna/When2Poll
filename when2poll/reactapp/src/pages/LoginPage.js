import { Link } from 'react-router-dom'
import React, {useContext} from 'react'
import AuthContext from '../context/AuthProvider'


const LoginPage = () => {

  let {loginUser} = useContext(AuthContext)
  return (
    <div className='d-flex min-vh-100 min-vw-100 justify-content-center align-items-center' style={styles.body} >
      <div  style={styles.login} >
        <p className='h1 text-center' style={styles.title} >When2Poll</p>
        <form style={styles.form} onSubmit={loginUser}>
            <div className='form-group' style={styles.formGroup}>
              <input className='form-control' type="email" name="email" placeholder="Email" required/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <input className='form-control' type="password" name="password" placeholder="Senha" required/>
            </div>
            <div className='form-group form-check' style={styles.formGroup}>
            <input type="checkbox" className="form-check-input" name="rememberCheck"/>
            <label style={styles.remember} className="form-check-label">Lembrar de mim</label>
            </div>
            <button style={styles.button} type="submit" className="btn btn-success w-100" >Entrar</button>
            <Link to={"/register"}>Criar conta</Link>
        </form>
      </div>
    </div>
    
  )
}

const styles = {
  body: {
    backgroundColor: '#222831'
  },
  login: {
    width: "360px",
    height: "min-content",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: '#393E46'
  },
  title: {
    fontSize: "36px",
    marginBottom: "25px",
    color:'#EEEEEE'
  },
  form: {
    fontSize: "20px"
  },
  formGroup: {
    marginBottom: "12px"
  },
  button: {
    backgroundColor: "#00ADB5"
  },
  remember: {
    color: '#EEEEEE'
  }
}

export default LoginPage