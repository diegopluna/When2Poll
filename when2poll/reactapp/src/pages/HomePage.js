import React, {useState, useEffect} from 'react'
import DatePicker, { DateObject, Calendar } from "react-multi-date-picker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import useAxios from "../utils/useAxios";

const HomePage = () => {
  const api = useAxios();

  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPollData = async () => {
      const response = await api.get('/polls/get/');
      setPolls(response.data);
    };
    fetchPollData();
  }, []);

  return (

    <div className='d-flex min-vh-100 min-vw-90 justify-content-center align-items-center' style={styles.body}>
      <div  style={styles.login} >
        <h1 className='font-face-sfbold'>Próximas Reuniões</h1>
        <div className='font-face-sfregular' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Calendar
            className='red' 
            readOnly 
          />
        </div>
        <table className='table mt-4 font-face-sfregular'>
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
        <h3 className='text-center font-face-sfbold'>Reuniões não definidas</h3>
        <ul className='justify-content-center'>
          {polls.map(poll => (
              <Button style={styles.pollBtn} onClick={() => window.location.href = `/poll/${poll.id}`} variant="primary" className="d-flex align-items-center">
                <span className="mr-auto">{poll.name} </span>
                
                <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
              </Button>
          
          // <li key={poll.name} onClick={() => window.location.href = `/poll/${poll.id}`}>
          //   <h4>{poll.name}</h4>
          //   <p>Deadline: {poll.deadline}</p>
          // </li>
        ))}
        </ul>
        
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
  },
  pollBtn: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    border: "1px solid #FFFFFF",
    borderRadius: "7px",
    marginBottom: "12px"
  }
}

export default HomePage