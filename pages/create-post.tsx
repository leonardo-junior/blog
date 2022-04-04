// vendors
import { useRouter } from 'next/router'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'

// components
import Layout from '../components/Layout/Layout'

// types
import { PostsProps, LoginProps } from '../typings/getTypes'

// styles
import styles from '../styles/create-post.module.scss'


function CreatePost (): JSX.Element {
  const router = useRouter()

  const [loginData, setLoginData] = useState<LoginProps []>([])
  const [indexUser, setIndexUser] = useState<number>(null)
  const [post, setPost] = useState<PostsProps>({})
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const userLogged: string[] = JSON.parse(localStorage.getItem('Logged')) || ['false']
    const dataLocalBlog: LoginProps [] = JSON.parse(localStorage.getItem('DataBlog')) || []
    const userIndex = dataLocalBlog.findIndex((data) => data.email === userLogged[1]) || 0

    if(userIndex === -1) {
      setMessage('É necessário efetuar login. Redirecionando...')
      setTimeout(() => {
        router.push(`/login`)
      }, 2000)
      return
    }

    setIndexUser(userIndex)
    setLoginData(dataLocalBlog)
  },[router])

  function handleChange (event:  ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const { name, value } : { name:string, value:string } = event.target
    const date = String(new Date())
    const author = loginData[indexUser]?.name

    setPost({...post, [name]:value, date, author})
  }

  function handleSubmit(event: FormEvent){
    event.preventDefault()

    if(indexUser === -1) {
      setMessage('Favor Logar!')
      return
    }

    const allData = [...loginData]
    const dataUser = {...allData[indexUser]}

    if(dataUser.post){
      const newPosts=[...dataUser.post, post]
      dataUser.post = newPosts
    } else {
      dataUser.post  = [post]
    }

    allData[indexUser] = dataUser

    const save = JSON.stringify( allData )
    localStorage.setItem('DataBlog', save)
    setPost({})
    setLoginData(allData)
    setMessage('Postado com sucesso!')
  }

  return (
    <Layout title='Criar Postagem' description='Área de criação de postagem'>
      <main className={styles.container}>
        <form onSubmit={handleSubmit} >
          <p>Título</p>
          <input type="text" name="titulo" value={post.titulo || ''} onChange={handleChange} required/>

          <p>Post</p>
          <textarea name='text'
            cols={45}
            rows={10}
            value={post.text ||''}
            onChange={handleChange}
            required
          />

          <button type='submit'>Postar</button>
        </form>

        <h2>{message}</h2>
      </main>
    </Layout>
  )
}

export default CreatePost