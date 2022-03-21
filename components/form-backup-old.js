import { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import styles from '../styles/form.module.css';

import Login from './login.js'
import Form from '../components/formulario.js'

export default function UserPage () {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [formValues, setFormValues] = useState({social:'twitter'});

  useEffect(()=>{
    const value = JSON.parse(localStorage.getItem('DataBlog')) || []
    setData(value)
  },[])

  function handleSubmitLogin(e){
    e.preventDefault()
    const succesfullAcess = data.some((value)=>{
      if (formValues.emailLogin === value.email && formValues.passwordLogin === value.password) {
        return true
      }
    })

    if(succesfullAcess){
      const save = JSON.stringify( [ true, formValues.emailLogin ] );
      localStorage.setItem('Logged', save);
      console.log('logado')
    }else{console.log('erro')}
  }

  function handleLogout () {
    localStorage.setItem('Logged', false);
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
    <div>
      <Head>
        <title>Create Account</title>
        <meta name="description" content="User create Log or Log in" />
        <link rel="icon" href="images/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <Link href='/'><a>Initial Page</a></Link>

        <h1>Criar Perfil</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <span>Nome:</span>
          <input type='text' name="name" value={formValues.name || ''} placeholder="Nome" onChange={handleChange} required/>

          <span>E-mail:</span>
          <input type='email' name="email" value={formValues.email || ''} placeholder="E-mail" onChange={handleChange} required/>

          <span>Senha:</span>
          <input type='text' name="password" value={formValues.password || ''} placeholder="Senha" onChange={handleChange} required/>

          <span>Telefone:</span>
          <input type='phone' placeholder="(xx) xxxxx-xxxx" name="phone" value={formValues.phone || ''} onChange={handleChange}/>

          <span>Mídia Social:</span>
          <select name="social" value={formValues.social || ''} onChange={handleChange} >
              <option value="facebook">Facebook</option>
              <option value="twitter">Twitter</option>
          </select>

          <span>Biografia:</span>
          <textarea name="bio" value={formValues.bio || ''} onChange={handleChange} placeholder="Diga algo sobre você!"/>

          <span>Bebida favorita:</span>
          <div className={styles.radios}>
            <label>
              <input type="radio" name="drink" value="coffee" checked={formValues.drink==="coffee"} onChange={handleChange} />
              Café
            </label>
            <label>
              <input type="radio" name="drink" value="tea" checked={formValues.drink==="tea"}  onChange={handleChange} />
              Chá
            </label>
            <label>
              <input type="radio" name="drink" value="alcool" checked={formValues.drink==="alcool"}  onChange={handleChange} />
              Álcool
            </label>
          </div>
          <button type='submit'>Submit</button>
        </form>
        <p>{message}</p>
      </main>



      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
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