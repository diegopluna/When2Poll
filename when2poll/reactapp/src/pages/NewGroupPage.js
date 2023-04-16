import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav'


const NewGroupPage = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

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
                <form style={styles.form}>
                    <div className='form-group' style={styles.formGroup}>
                    <input value={name} className='form-control' type="text" name="name" placeholder="Nome" onChange={event => setName(event.target.value)} required/>
                    </div>
                    <div className='form-group' style={styles.formGroup}>
                    <textarea style={styles.desc} value={description} className='form-control' name="description" placeholder="Descrição" onChange={event => setDescription(event.target.value)} required/>
                    </div>
                    <h4 className='text-center'>Convidar pessoas</h4>

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