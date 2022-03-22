//vendors
import { useState, useEffect } from 'react';
import Router from 'next/router'

//components
import Login from '../components/Login/Login'
import Layout from '../components/Layout/Layout'
import Form from '../components/Form/Form'

//styles
import styles from '../styles/login.module.scss';

function LoginPage () {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [formValues, setFormValues] = useState({social:'twitter'});

  useEffect(()=>{
    const value = JSON.parse(localStorage.getItem('DataBlog')) || []
    setData(value)
  },[])

  function handleSubmitLogin(event){
    event.preventDefault()
    const succesfullAcess = data.some((value)=>{
      if (formValues.emailLogin === value.email && formValues.passwordLogin === value.password) {
        return true
      }
    })

    if(succesfullAcess){
      const save = JSON.stringify( [ true, formValues.emailLogin ] );
      localStorage.setItem('Logged', save);
      Router.push('/user-page')
      console.log('logado')
    }else{console.log('erro')}
  }

  function handleLogout () {
    localStorage.setItem('Logged', 'false');
  }

  function handleChange (e) {
   const { name, value } = e.target
   setFormValues({...formValues, [name]:value})
  }

  function handleSubmit (e) {
    console.log(data)
    e.preventDefault()
    const repeatedUser = data.some((val)=>{
      return val.email === formValues.email
    })

    if(!repeatedUser){
      const createUser = JSON.stringify( [...data, formValues] );
      const logginUser = JSON.stringify( [true, formValues.email] );
      localStorage.setItem('DataBlog', createUser);
      localStorage.setItem('Logged', logginUser);
      setMessage('Usuário criado e logado. Redirecionando...')
      setTimeout(()=>{
        Router.push('/')
      }, 2000)
    }else{
      setMessage('Usuário já cadastrado!')
    }
  }

  return (
      <Layout title='Área de Login' description='User crete Log or Login'>
        <h1 className={styles.text}> Área de Login</h1>

        <main className={styles.login}>
          <Login
            handleChange={handleChange}
            handleSubmitLogin={handleSubmitLogin}
            handleLogout={handleLogout}
            formValues={formValues}
          />

          <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            message={message}
            formValues={formValues}
          />
        </main>
      </Layout>
  )
}

export default LoginPage