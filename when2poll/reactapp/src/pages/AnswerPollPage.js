import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import { useParams } from 'react-router-dom'
import useAxios from '../utils/useAxios'
import PrimaryButton from '../components/Button'
import {useNavigate } from 'react-router-dom'


const AnswerPollPage = () => {
    const [data, setData] = useState(null)
    const [justification, setJustification] = useState('')
    const [isAbsent, setIsAbsent] = useState(false);
    const {pollId} = useParams()
    const api = useAxios()

    let navigate = useNavigate();


    useEffect(() => {
        async function fetchPageData() {
            const groupdata = await api.get(`/polls/${pollId}/`)
            setData(groupdata.data)
        }

        fetchPageData()
    },[])

    const handleCheckboxChange = () => {
        setIsAbsent(!isAbsent);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        // const postData = {
        //     user,
        //     poll,
        //     available: !isAbsent,
        //     matrix,
        //     justification: justification
        // }

        // const response = await api.post(`/polls/answer/${pollId}/`, postData)
        // if (response.status === 200) {
        //     navigate("/invites")
        // }

    }

  return (
    <div>
        <nav className='navbar navbar-expand-md navbar-light d-none d-lg-block' role='navigation'>
          <div className='container-fluid'>
          <a style={styles.links} className='navbar-brand font-face-sfbold'>{data?.name}</a>
            <Nav className='ml-auto'>
              <Nav.Item>
                <Nav.Link style={styles.links} href="/invites" className='nav-link font-face-sfbold'>
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
                    <Nav.Link style={styles.links} href="/invites" className='nav-link font-face-sfbold'>
                        Voltar
                    </Nav.Link>
                    </Nav.Item>
                </div>
                </Nav>
            </div>
        </nav>
        <div className='d-flex min-vw-100 justify-content-center align-items-center' >
          <div  style={styles.login} >
                <h1 className='display-1 text-center font-face-sfbold' style={styles.title} >{data?.name}</h1>
                <p className='h3 text-center mt-2 font-face-sfregular'>{data?.description}</p>
                <p className='h3 text-center mt-2 font-face-sfregular'>Duração: {data?.duration}</p>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup} className='form-group form-check'>
                        <label className="form-check-label font-face-sfregular">Ausente</label>
                        <input type='checkbox' checked={isAbsent} onChange={handleCheckboxChange} className="form-check-input" name="absentCheck" />
                    </div>
                    {isAbsent && (
                        <div style={styles.formGroup} className='form-group'>
                            <textarea className='form-control font-face-sfregular' type='text' value={justification} name='justification' placeholder='Justificativa' onChange={event => setJustification(event.target.value)}></textarea>
                        </div>
                    )}
                    <div>
                        <PrimaryButton>Responder</PrimaryButton>
                    </div>
                </form>
          </div>
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

export default AnswerPollPage