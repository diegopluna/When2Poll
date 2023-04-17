import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import useAxios from "../utils/useAxios";
import Select from 'react-select'
import AsyncSelect from 'react-select/async';




const NewGroupPage = () => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const api = useAxios();

  const [items, setItems] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [selectedValue, setSelectedValue] = useState(null)


  const handleInputChange = value => {
    setInputValue(value)
  }

  const handleChange = value => {
    setSelectedValue(value)
  }

  const fetchData = async () => {
    const response = await api.get('/api/users')
    return response.data
  }


  const handleSubmit = async (e ) => {
    e.preventDefault()

    const response = await api.post('/orgs/organizations/',{
      name: e.target.name.value,
      description: e.target.description.value
    });
    const data = response.data
    for (let index = 0; index < selectedValue.length; index++) {
      const user= selectedValue[index];
      const inviteResponse = await api.post('/orgs/organizations/'+data.id+'/invite/',{
      user: user.id
      });
    }
    setDescription('')
    setName('')
    setSelectedValue(null)
    setInputValue('')
    
  }

  return (
  <div>
      <nav className='navbar navbar-expand-md navbar-light d-none d-lg-block' role='navigation'>
          <div className='container-fluid'>
          <a className='navbar-brand'>Novo Grupo</a>
          <Nav className='ml-auto'>
              <Nav.Item>
              <Nav.Link href="/groups" className='nav-link'>
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
                  <Nav.Link href="/groups" className='nav-link'>
                  Voltar
                  </Nav.Link>
              </Nav.Item>
              </div>
          </Nav>
          </div>
      </nav>

      <div className='d-flex min-vw-100 justify-content-center align-items-center' >
          <div  style={styles.login} >
              <p className='h1 text-center' style={styles.title} >Novo Grupo</p>
              <form style={styles.form} onSubmit={handleSubmit}>
                  <div className='form-group' style={styles.formGroup}>
                    <input value={name} className='form-control' type="text" name="name" placeholder="Nome" onChange={event => setName(event.target.value)} required/>
                  </div>
                  <div className='form-group' style={styles.formGroup}>
                    <textarea style={styles.desc} value={description} className='form-control' name="description" placeholder="Descrição" onChange={event => setDescription(event.target.value)} required/>
                  </div>
                    <h4 className='text-center'>Convidar pessoas</h4>
                  <div className='form-group' style={styles.formGroup}>
                    <div className='dropdown-container'>
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        isMulti
                        isSearchable
                        value={selectedValue}
                        getOptionLabel={e => e.email}
                        getOptionValue={e => e.id}
                        loadOptions={fetchData} 
                        onInputChange={handleInputChange}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button style={styles.button} type="submit" className="btn btn-success w-100" >Criar grupo</button>  
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
    }
  }

export default NewGroupPage