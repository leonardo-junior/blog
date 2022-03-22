// vendors
import {useState, useEffect} from 'react'

// components
import Layout from '../components/Layout/Layout.js'

// styles
import styles from '../styles/create-post.module.scss'

function CreatePost() {
  const [data, setData] = useState([])
  const [indexUser, setIndexUser] = useState([])
  const [post, setPost] = useState({})
  const [message, setMessage] = useState('')
  const [needLogin, setNeedLogin]= useState(false)

  useEffect(()=>{
    const userLogged = JSON.parse(localStorage.getItem('Logged')) || [false]
    const dataLocalBlog = JSON.parse(localStorage.getItem('DataBlog')) || []
    const userIndex = dataLocalBlog.findIndex((val)=>val.email === userLogged[1]) || 0

    if(userIndex === -1) {
      setNeedLogin(true)
    }

    setIndexUser(userIndex)
    setData(dataLocalBlog);
  },[])

  function handleChange (event) {
    const {name,value} = event.target
    const date = new Date()
    const author = data[indexUser]?.name
    setPost({...post, [name]:value, date, author})
  }

  function handleSubmit(event){
    event.preventDefault()

    if(indexUser === -1) {
      setMessage('Favor Logar!')
      return
    }

    const allData = [...data]
    const dataUser = {...allData[indexUser]}

    if(dataUser.post){
      const newPosts=[...dataUser.post, post]
      dataUser.post = newPosts
    } else {
      dataUser.post  = [post]
    }

    allData[indexUser] = dataUser

    const save = JSON.stringify( allData );
    localStorage.setItem('DataBlog', save);
    setPost({})
    setData(allData)
    setMessage('Postado com sucesso!')
  }

  return (
    <Layout title={'Criar Postagem'} description={'Área de criação de postagem'}>
      <main className={styles.container}>
        <form onSubmit={handleSubmit} >
          <p>Título</p>
          <input type="text" name="titulo" value={post.titulo || ''} onChange={handleChange} required/>

          <p>Post</p>
          <textarea name='text'
            cols="45"
            rows="10"
            value={post.text ||''}
            onChange={handleChange}
            required
          />

          <button type='submit' onSubmit={handleSubmit}>Postar</button>
        </form>

        <h2>{message}</h2>
      </main>
    </Layout>
  )
}

export default CreatePost