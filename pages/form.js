//vendors
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'

//components
import Login from '../components/login.js'
import Form from '../components/form-new-user.js'

//styles
import styles from '../styles/form.module.css';

export default function UserPage () {
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
      Router.push('/userPage')
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
    <div className={styles.container}>
      <Head>
        <title>Create Account</title>
        <meta name="description" content="User create Log or Log in" />
        <link rel="icon" href="images/favicon.ico" />
      </Head>

      <Link href='/'><a>Initial Page</a></Link>

      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        message={message}
        formValues={formValues}
      />

      <Login
        handleChange={handleChange}
        handleSubmitLogin={handleSubmitLogin}
        handleLogout={handleLogout}
        formValues={formValues}
      />
    </div>
  )
}