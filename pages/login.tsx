//vendors
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Router from 'next/router'

//components
import Login from '../components/Login/Login'
import Layout from '../components/Layout/Layout'
import Form from '../components/Form/Form'

// types
import { LoginProps } from '../typings/getTypes'

//styles
import styles from '../styles/login.module.scss'

function LoginPage (): JSX.Element {
  const [loginData, setLoginData] = useState<LoginProps[]>([])
  const [message, setMessage] = useState('')
  const [formValues, setFormValues] = useState<Record<string, string>>({})

  useEffect(() => {
    const data: LoginProps[] = JSON.parse(localStorage.getItem('DataBlog')) || []
    setLoginData(data)
  },[])

  function handleSubmitLogin(event: FormEvent){
    event.preventDefault()

    const succesfullAcess = loginData.some((value) => {
      if (formValues.emailLogin === value.email && formValues.passwordLogin === value.password) {
        return true
      }
    })

    if (succesfullAcess){
      const save = JSON.stringify( [ true, formValues.emailLogin ] )
      localStorage.setItem('Logged', save)
      Router.push('/user-page')
    } else {
      console.log('erro')
    }
  }

  function handleChange (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
   const { name, value } = event.target
   setFormValues({...formValues, [name]:value})
  }

  function handleSubmit (event: FormEvent) {
    event.preventDefault()

    const repeatedUser = loginData.some((val) => {
      return val.email === formValues.email
    })

    if(!repeatedUser){
      const createUser = JSON.stringify( [...loginData, formValues] )
      const logginUser = JSON.stringify( [true, formValues.email] )
      localStorage.setItem('DataBlog', createUser)
      localStorage.setItem('Logged', logginUser)
      setMessage('Usuário criado e logado. Redirecionando...')
      setTimeout(() => {
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
          handleSubmit={handleSubmitLogin}
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