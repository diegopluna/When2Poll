import React, {useState, useEffect} from 'react'
import Nav from 'react-bootstrap/Nav'
import DatePicker, { DateObject, Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css"
import useAxios from "../utils/useAxios";
import { useParams } from 'react-router-dom'

const PollPage = () => {
  const [poll, setPoll] = useState(null);

  const api = useAxios();

  const {pollId} = useParams()

  useEffect(() => {
    const fetchPollData = async () => {
      const response = await api.get(`/polls/get/?poll_id=${pollId}`);
      setPoll(response.data);
    };
    fetchPollData();
  }, []);

  if (!poll) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav className='navbar navbar-expand-md navbar-light d-none d-lg-block' role='navigation'>
        <div className='container-fluid'>
        <a style={styles.links} className='navbar-brand font-face-sfbold'>{poll.name}</a>
          <Nav className='ml-auto'>
            <Nav.Item>
              <Nav.Link style={styles.links} href="/" className='nav-link font-face-sfbold'>
                Voltar
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </nav>
      <nav className='navbar navbar-light d-block d-lg-none' role='navigation'>
        <div className='container-fluid'>
          <Nav className='w-100'>
            <div className='d-flex flex-row justify-content-around w-100'>
              <Nav.Item>
                <Nav.Link style={styles.links} href="/" className='nav-link font-face-sfbold'>
                  Voltar
                </Nav.Link>
              </Nav.Item>
            </div>
          </Nav>
        </div>
      </nav>
      <div className='d-flex min-vw-100 justify-content-center align-items-center'>
        <div  style={styles.login}>
          <h1 className='display-1 text-center font-face-sfbold' style={styles.title}>{poll.name}</h1>
          <p className='h3 text-center mt-2 font-face-sfregular'>{poll?.description}</p>
          <p className='h4 text-center mt-2 font-face-sfregular'>Deadline: {poll.deadline}</p>
          <table className='table mt-4 font-face-sfregular'>
            <thead>
              <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="col">{poll.owner.name}</th>
                <th scope="col">{poll.owner.email}</th>
                <th scope="col">Criador</th>
              </tr>
              {poll.participants.map(participant => (
                <tr key={participant.pk}>
                  <th scope="col">{participant.name}</th>
                  <th scope="col">{participant.email}</th>
                  {participant.admin ?
                  <th scope="col">Administrador</th>
                  :
                  <th scope="col">Membro</th>
                  }
                  {/* <th scope="col">{participant.admin ? "Administrador": "Membro"}</th> */}
                </tr>
              ))}
              {poll.invited_users.map(user => (
                <tr>
                  <th scope="col">{user.name}</th>
                  <th scope="col">{user.email}</th>
                  <th scope="col">Convidado</th>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <ul>
            {poll.participants.map(participant => (
              <li key={participant.pk}>
                {participant.name} {participant.admin ? '(admin)' : ''}
              </li>
            ))}
          </ul>
          <h3>Invited (pending):</h3>
          <ul>
            {poll.invited_users.map(user => (
              <li key={user}>
                {user.name}
              </li>
            ))}
          </ul> */}
          {/* <h3>Datetime Ranges:</h3> */}
        </div>        
      </div>
      
      
      {/* <ul>
        {poll.datetime_ranges.map(range => (
          <li key={range.start_time}>
            {range.start_time} - {range.end_time}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: '#222831'
  },
  login: {
    width: "360px",
    height: "min-content",
    padding: "20px",
  //   borderRadius: "12px",
  //   backgroundColor: '#393E46'
  },
  title: {
    fontSize: "36px",
    marginBottom: "25px",
  //   color:'#EEEEEE'
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
  },
  desc : {
      resize: 'none'
  },
  links: {
    color: "#ff735c"
  },
}

export default PollPage;