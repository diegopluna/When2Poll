import React from 'react'

const LoginPage = () => {
  return (
    <div className='d-flex min-vh-100 min-vw-100 justify-content-center align-items-center' style={styles.body}>
      <div  style={styles.login} >
        <p className='h1 text-center' style={styles.title} >When2Poll</p>
        <form className='needs-validation' style={styles.form} >
            <div className='form-group was-validated' style={styles.formGroup}>
              <input className='form-control' type="email" id="email" placeholder="Email" required/>
              <div className='invalid-feedback'>
                Insira seu email!
              </div>
            </div>
            <div className='form-group was-validated' style={styles.formGroup}>
              <input className='form-control' type="password" id="password" placeholder="Senha" required/>
              <div className='invalid-feedback'>
                Insira sua senha!
              </div>
            </div>
            <div className='form-group form-check' style={styles.formGroup}>
            <input type="checkbox" class="form-check-input" id="rememberCheck"/>
            <label style={styles.remember} className="form-check-label" htmlFor="rememberCheck">Lembrar de mim</label>
            </div>
            <button style={styles.button} type="submit" className="btn btn-success w-100">Entrar</button>
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

// const bgStyle = {
//   backgroundColor: '#222831'
// }
// const formStyle = {
//   backgroundColor: '#393E46'
// }
// const title = {
//   color: '#EEEEEE'
// }
export default LoginPage