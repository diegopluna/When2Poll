import { Link } from 'react-router-dom'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='d-flex min-vh-100 min-vw-100 justify-content-center align-items-center' style={styles.body}>
        
      <div  style={styles.login} >
        <p className='h1 text-center' style={styles.title} >Registro</p>
        <form style={styles.form} >
            <div className='form-group' style={styles.formGroup}>
              <input className='form-control' type="text" id="firstName" placeholder="Nome" required/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <input className='form-control' type="text" id="lastName" placeholder="Sobrenome" required/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <input className='form-control' type="email" id="email" placeholder="Email" required/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <input className='form-control' type="password" id="password" placeholder="Senha" required/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <input className='form-control' type="password" id="passwordConfirm" placeholder="Confirmar senha" required/>
            </div>
            <button style={styles.button} type="submit" className="btn btn-success w-100">Criar conta</button>
            <Link to={"/"}>Login</Link>
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

export default RegisterPage