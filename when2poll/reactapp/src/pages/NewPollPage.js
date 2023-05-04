import React, {useState} from 'react'
import DatePicker, { DateObject, Calendar } from "react-multi-date-picker";
import TimeInput from '../components/TimeInput';
import useAxios from "../utils/useAxios";
import AsyncSelect from 'react-select/async';

const NewPollPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dateRanges, setDateRanges] = useState([[]])
  const [earliest, setEarliest] = useState('')
  const [latest, setLatest] = useState('')
  const [duration, setDuration] = useState('')
  const [timeError, setTimeError] = useState('')
  const [deadline, setDeadline] = useState('')
  const [selectedGroups, setSelectedGroups] = useState(null)

  const api = useAxios();

  const handleEarliestChange = (value) => {
    setEarliest(value);
    validateTimes(value, latest, duration);
  };

  const handleLatestChange = (value) => {
    setLatest(value);
    validateTimes(earliest, value, duration);
  };

  const handleDurationChange = (value) => {
    setDuration(value);
    validateTimes(earliest, latest, value);
  };

  const handleDateChange = (value) => {
    setDateRanges(value)
    handleDeadline()
  }

  const fetchGroupData = async () => {
    const response = await api.get('/orgs/organizations/')
    return response.data
  }

  const validateTimes = (start, end, dur) => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    const [durHour, durMinute] = dur.split(':').map(Number);

    if (startHour > endHour || (startHour === endHour && startMinute > endMinute)) {
      setTimeError('O horário mais cedo não pode ser mais tarde que o horário mais tarde.');
      return;
    }

    const rangeInMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
    const durationInMinutes = durHour * 60 + durMinute;

    if (durationInMinutes > rangeInMinutes) {
      setTimeError('A duração não pode ser mais longa que a margem de horários.');
      return;
    }

    setTimeError('');
    handleDeadline()
  }

  const handleDeadline = () => {
    let earliestDate = new Date(dateRanges[0][0]);
    for (const range of dateRanges) {
      const startDate = new Date(range[0]);
      if (startDate < earliestDate) {
        earliestDate = startDate;
      }
    }

    earliestDate.setDate(earliestDate.getDate() - 1);
    const year = earliestDate.getFullYear();
    const month = ('0' + (earliestDate.getMonth() + 1)).slice(-2);
    const date = ('0' + earliestDate.getDate()).slice(-2);
    const deadline = `${year}-${month}-${date}T${earliest}`;

    setDeadline(deadline);
  }
  

  const getParticipantIds = async (selectedGroups) => {
    let participantsTemp = []
    for (const group of selectedGroups) {
      const response = await api.get(`/orgs/organizations/${group.id}/members/`);
      const participants = response.data;
      participantsTemp = [...participantsTemp, ...participants.map(participant => participant.id)];
    }
    //participantsTemp = [...new Set(participantsTemp)];
    console.log('participantsTemp:', participantsTemp);
    return participantsTemp
  }

  const handleSubmit = async (e ) => {
    e.preventDefault()

    const datetimeRangesData = dateRanges.flatMap(range => {
      const [startDate, endDate] = range;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const result = [];
      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        const dateString = date.toISOString().split('T')[0];
        result.push({
          start_time: new Date(dateString + 'T' + earliest + 'Z').toISOString().slice(0,16)+'Z',
          end_time: new Date(dateString + 'T' + latest + 'Z').toISOString().slice(0,16)+'Z'
        });
      }
      return result;
    });

    let participantIds = await getParticipantIds(selectedGroups)

    if (deadline) {
      let deadlineAux = new Date(deadline).toISOString().slice(0,16) + 'Z';
      setDeadline(deadlineAux);
    } else {
        console.log('Invalid deadline value:', deadline);
    }

    const data = {
      name,
      description,
      duration,
      datetime_ranges: datetimeRangesData,
      participants: participantIds,
      deadline
    }

    const verify = await api.post('/polls/post/', data);
    console.log(verify.data)

    setName('')
    setDescription('')
    setEarliest('')
    setLatest('')
    setDuration('')
    setDeadline('')
    setDateRanges([[]])
    setSelectedGroups(null)
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
              <textarea value={description} className='form-control' type="text" name="description" placeholder="Descrição" onChange={event => setDescription(event.target.value)}/>
            </div>
            <div className='form-group' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className='form-group' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <p className='h4 text-center' style={{color:'#EEEEEE'}}>Seleção de datas</p>
                  <Calendar
                    style={{ display:'column', alignItems: 'center', justifyContent: 'center' }}
                    value={dateRanges}
                    onChange={handleDateChange}
                    range
                    multiple
                  />
                  <br/>
                  <label style={styles.remember}>Duração pretendida</label>
                  <TimeInput defaultHour={1} defaultMinute={0} onChange={handleDurationChange}/>
                  <label style={styles.remember}>Horário mais cedo (início)</label>
                  <TimeInput defaultHour={9} defaultMinute={0} onChange={handleEarliestChange}/>
                  <label style={styles.remember}>Horário mais tarde (fim)</label>
                  <TimeInput defaultHour={17} defaultMinute={0} onChange={handleLatestChange}/>
                  <p style={{ color: 'red' }}>{timeError}</p>
              </div>
            </div>
            <div>
              <label>Responder até: {deadline}</label>
            </div>
            <div className='form-group' style={styles.formGroup}>
              <div className='dropdown-container'>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  isMulti
                  isSearchable
                  value={selectedGroups}
                  getOptionLabel={e => e.name}
                  getOptionValue={e => e.id}
                  loadOptions={fetchGroupData}
                  onChange={setSelectedGroups}
                />
              </div>
            </div>
          <div>
            <button style={styles.button} type="submit" className="btn btn-success w-100" disabled={timeError !== '' || dateRanges === null}>Criar enquete</button>
          </div>
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

export default NewPollPage