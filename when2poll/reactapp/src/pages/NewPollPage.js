import React, {useState} from 'react'
import DatePicker, { Calendar, Range } from 'react-multi-date-picker'
import { Fragment } from 'react/cjs/react.production.min'

const NewPollPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dateRanges, setDateRanges] = useState([[]])
  const [duration, setDuration] = useState('')
  const [deadline, setDeadline] = useState('')
  
  const handleDateChange = (index, value) => {
    setDateRanges(dateRanges.map((range, i) => (i === index ? value : range)));
  };

  const addDateRange = () => {
    setDateRanges([...dateRanges, []]);
  };

  const handleSubmit = async (e ) => {
    // setShow(false)
    // const signUpReturn = await signUpUser(e );
    // setAlertType(signUpReturn[1])
    // setAlertText(signUpReturn[0])
    // setShow(signUpReturn[2])
    // setFirstName('')
    // setLastName('')
    // setEmail('')
    // setPassword('')
    // setPasswordConfirm('')
  }

  return (
    <div className='d-flex min-vh-100 min-vw-100 justify-content-center align-items-center' style={styles.body}>
        <div  style={styles.login} >
        <p className='h1 text-center' style={styles.title} >Novo evento</p>
        <form style={styles.form} onSubmit={handleSubmit}>
            <div className='form-group' style={styles.formGroup}>
              <input value={name} className='form-control' type="text" name="name" placeholder="Nome" onChange={event => setName(event.target.value)} required/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <input value={description} className='form-control' type="text" name="description" placeholder="Descrição" onChange={event => setDescription(event.target.value)}/>
            </div>
            <div className='form-group' style={styles.formGroup}>
              {dateRanges.map((range, index) => (
                <Fragment key={index}>
                  <Calendar
                    value={range}
                    onChange={value => handleDateChange(index, value)}
                    plugins={[<Range />]}
                    timePicker
                  />
                  <br />
                </Fragment>
              ))}
              <button type="button" onClick={addDateRange}>
                  Add another date range
              </button>
            </div>
            {/* <div className='form-group' style={styles.formGroup}>
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
            </div>*/}
            <button style={styles.button} type="submit" className="btn btn-success w-100">Criar enquete</button>
            {/* <Link to={"/login"}>Login</Link>  */}
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
    fontSize: "20px",
  },
  formGroup: {
    marginBottom: "12px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: "#00ADB5"
  },
  remember: {
    color: '#EEEEEE'
  }
}

export default NewPollPage