//vendors
import { useState, useEffect } from 'react'

//components
import Layout from '../components/Layout/Layout'
import Card from '../components/Card/Card'

// types
import { LoginProps } from '../typings/getTypes'

//styles
import styles from '../styles/user-page.module.scss'

function UserPage (): JSX.Element {
  const [login, setLogin] = useState<LoginProps[]>([])
  const [indexUser, setIndexUser] = useState<number>(null)

  useEffect(() => {
    const data:LoginProps[] = JSON.parse(localStorage.getItem('DataBlog')) || []
    const userLogged: string = JSON.parse(localStorage.getItem('Logged'))[1]
    const userIndex = data.findIndex((user) => user.email === userLogged)
    setIndexUser(userIndex)
    setLogin(data)
  },[])

  function deletePost(postPosition: number, index: number){
    const deletedPost= login[postPosition].post.filter((log, pos) => index !== pos)
    const actualData = [...login]
    actualData[postPosition].post = deletedPost
    const save = JSON.stringify(actualData);
    localStorage.setItem('DataBlog', save);
    setLogin(actualData)
  }

  const name = login[indexUser]?.name

  const dataPosts = login[indexUser]?.post?.map(({titulo, text, date, author}, index) => {
    const day = new Date(date).toLocaleDateString()

    return (
      <Card
        titulo={titulo}
        text={text}
        author={author}
        day={day}
        key={index}
        onClick={() => deletePost(indexUser, index)}
      />
    )
  }).reverse()

  return (
    <Layout title='Página do usuário' description='Página do usuário'>
      <main className={styles.container}>
        <h1>Olá, {name}</h1>

        {dataPosts}
      </main>
    </Layout>
  )
}

export default UserPage