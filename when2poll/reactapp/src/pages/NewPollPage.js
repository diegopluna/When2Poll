import React, {useState} from 'react'
import DatePicker, { Calendar } from 'react-multi-date-picker'
import TimePicker from "react-multi-date-picker/plugins/time_picker"
import { eachDayOfInterval, format } from 'date-fns'

const NewPollPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dateRanges, setDateRanges] = useState([[]])
  const [duration, setDuration] = useState('')
  const [deadline, setDeadline] = useState('')

  const handleSubmit = async (e ) => {
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
              <div className='form-group' style={{display:'block'}}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p className='h4 text-center' style={styles.form}>Seleção de datas</p>
                    <Calendar
                      value={dateRanges}
                      onChange={setDateRanges}
                      range
                      multiple
                    />
                  </div>
              </div>
            </div>
            <button style={styles.button} type="submit" className="btn btn-success w-100">Criar enquete</button>
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