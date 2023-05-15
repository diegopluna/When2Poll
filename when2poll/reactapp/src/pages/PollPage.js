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
          <h1>{poll.name}</h1>
          <h2>Deadline: {poll.deadline}</h2>
          <h3>Participants:</h3>
          <ul>
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
          </ul>
          <h3>Datetime Ranges:</h3>
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