import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


import { useParams } from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import useAxios from "../utils/useAxios";
import { useNavigate } from 'react-router-dom';


const PollPage = () => {
    const [poll, setPoll] = useState(null);
    const [userData, setUserData] = useState(null);
    const api = useAxios();

    const {pollId} = useParams()
    const navigate = useNavigate()

    async function setAdmin(admin,userId){
        const data = {
          admin: admin
        }
        const response = await api.put(`/polls/${pollId}/admin/set/${userId}/`, data)
        navigate(0)
    }

    useEffect(() => {
        const fetchPollData = async () => {
          const response = await api.get(`/polls/get/?poll_id=${pollId}`);
          setPoll(response.data);
        };
        const getCurrentUser = async () => {
          const response = await api.get('/api/user/me/')
          setUserData(response.data)
        };
        fetchPollData();
        getCurrentUser();
    }, []);

    if (!poll) {
        return (
            <CircularProgress 
                size={40}
            />
        );
    }
    
    return (
    <Container 
        sx={{
            marginTop: '56px',
            marginBottom: '56px',
            paddingBottom: '56px', // Add additional padding at the bottom
            // minHeight: 'calc(100vh - 56px)', // Set a minimum height to ensure content visibility
        }}
    >
        <Typography id="title" variant='h3' sx={{textAlign: 'center'}} gutterBottom>
                {poll?.name}
        </Typography>
        <Typography id="description" variant='subtitle1' sx={{textAlign: 'center'}} gutterBottom>
            {poll?.description}
        </Typography>
    </Container>
    )
}

export default PollPage;