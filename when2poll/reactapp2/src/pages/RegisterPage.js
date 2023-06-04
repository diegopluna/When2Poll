import { Link } from 'react-router-dom'
import React, {useContext, useState} from 'react'
import Alert from 'react-bootstrap/Alert';
import AuthContext from '../context/AuthProvider'
import PrimaryButton from '../components/Button';


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
    if (signUpReturn[3] === 1)
    {
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setPasswordConfirm('')
    } else if (signUpReturn[3] === 2) {
      setEmail('')
      setPassword('')
      setPasswordConfirm('')
    } else if (signUpReturn[3] === 3) {
      setPassword('')
      setPasswordConfirm('')
    }
  }

  return (
    <div className='d-flex min-vh-100 min-vw-100 justify-content-center align-items-center' style={styles.body}>

      <div  style={styles.login} >
        <p className='h1 text-center font-face-sfbold' style={styles.title} >Registro</p>
        <Alert show={show} variant={alertType}>
          <p >{alertText}</p>
        </Alert> 
        <form style={styles.form} onSubmit={handleSubmit}>
            <div className='form-group' style={styles.formGroup}>
              <input value={firstName} className='form-control font-face-sfregular' type="text" name="firstName" placeholder="Nome" onChange={event => setFirstName(event.target.value)} required/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <input value={lastName} className='form-control font-face-sfregular' type="text" name="lastName" placeholder="Sobrenome" onChange={event => setLastName(event.target.value)} required/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <input value={email} className='form-control font-face-sfregular' type="email" name="email" placeholder="Email" onChange={event => setEmail(event.target.value)} required/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <input value={password} className='form-control font-face-sfregular' type="password" name="password" placeholder="Senha" onChange={event => setPassword(event.target.value)} required/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <input value={passwordConfirm} className='form-control font-face-sfregular' type="password" name="passwordConfirm" placeholder="Confirmar senha" onChange={event => setPasswordConfirm(event.target.value)} required/>
              <div id="passwordHelpBlock" className="form-text font-face-sfregular">
                A senha deve ter pelo menos 8 caracteres.
              </div>
            </div>
            <PrimaryButton>Criar conta</PrimaryButton>
            <Link style={styles.links} className='font-face-sfbold' to={"/login"}>Login</Link>
        </form>
      </div>
    </div>
    
  )
}

const styles = {
  body: {
    backgroundColor: '#EEEEEE'
  },
  login: {
    width: "360px",
    height: "min-content",
    padding: "20px",
    // borderRadius: "12px",
    // backgroundColor: '#393E46'
  },
  title: {
    fontSize: "36px",
    marginBottom: "25px",
    // color:'#EEEEEE'
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
    // color: '#EEEEEE'
  },
  links: {
    color: "#ffb638"
  }
}

export default RegisterPage