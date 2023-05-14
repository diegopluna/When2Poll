import React, {useState, useEffect} from 'react'
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

export default PollPage;