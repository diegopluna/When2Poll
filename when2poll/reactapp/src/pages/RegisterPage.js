import { Link } from 'react-router-dom'
import React, {useContext, useState} from 'react'
import Alert from 'react-bootstrap/Alert';
import AuthContext from '../context/AuthProvider'

const RegisterPage = () => {

  let {signUpUser} = useContext(AuthContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [show, setShow] = useState(false);
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('success')

  const handleSubmit = async (e ) => {
    setShow(false)
    const signUpReturn = await signUpUser(e );
    setAlertType(signUpReturn[1])
    setAlertText(signUpReturn[0])
    setShow(signUpReturn[2])
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setPasswordConfirm('')
  }

  return (
    <div className='d-flex min-vh-100 min-vw-100 justify-content-center align-items-center' style={styles.body}>

      <div  style={styles.login} >
        <p className='h1 text-center' style={styles.title} >Registro</p>
        <Alert show={show} variant={alertType}>
          <p >{alertText}</p>
        </Alert> 
        <form style={styles.form} onSubmit={handleSubmit}>
            <div className='form-group' style={styles.formGroup}>
              <input value={firstName} className='form-control' type="text" name="firstName" placeholder="Nome" onChange={event => setFirstName(event.target.value)} required/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <input value={lastName} className='form-control' type="text" name="lastName" placeholder="Sobrenome" onChange={event => setLastName(event.target.value)} required/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <input value={email} className='form-control' type="email" name="email" placeholder="Email" onChange={event => setEmail(event.target.value)} required/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <input value={password} className='form-control' type="password" name="password" placeholder="Senha" onChange={event => setPassword(event.target.value)} required/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <input value={passwordConfirm} className='form-control' type="password" name="passwordConfirm" placeholder="Confirmar senha" onChange={event => setPasswordConfirm(event.target.value)} required/>
            </div>
            <button style={styles.button} type="submit" className="btn btn-success w-100">Criar conta</button>
            <Link to={"/login"}>Login</Link>
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