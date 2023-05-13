import React from 'react'
import DatePicker, { DateObject, Calendar } from "react-multi-date-picker";


const HomePage = () => {
  return (

    <div className='d-flex min-vh-100 min-vw-90 justify-content-center align-items-center'>
      <div  style={styles.login} >
        <h1>Próximas Reuniões</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Calendar
            readOnly 
          />
        </div>
        <table className='table mt-4'>
          <thead>
              <tr>
                  <th scope="col">Reunião</th>
                  <th scope="col">Dia</th>
                  <th scope="col">Início</th>
                  <th scope="col">Duração</th>
              </tr>
          </thead>
          {/* <tbody>
              {members.map(item => (
                  <tr>
                      <th scope="col">{item.full_name}</th>
                      <th scope="col">{item.email}</th>
                      <th scope="col">{item.type}</th>
                  </tr>
              ))}
          </tbody> */}
        </table>
        <h3 className='text-center'>Reuniões não definidas</h3>
      </div>
    </div>
  )
}

const styles = {
  body: {
    backgroundColor: '#EEEEEE'
  },
  login: {
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
    fontSize: "20px",
  },
  formGroup: {
    marginBottom: "12px",
  },
  button: {
    backgroundColor: "#00ADB5"
  },
  remember: {
    // color: '#EEEEEE'
  }
}

export default HomePage