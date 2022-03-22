//vendors
import { useState, useEffect } from 'react'

//components
import Layout from '../components/Layout/Layout.js'
import Card from '../components/Card/Card';

//styles
import styles from '../styles/user-page.module.scss'

function UserPage () {
  const [allData, setAllData] = useState([])
  const [indexUser, setIndexUser] = useState()

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem('DataBlog')) || []
    const userLogged = JSON.parse(localStorage.getItem('Logged'))[1]
    const userIndex = data.findIndex((val)=>val.email === userLogged)
    setIndexUser(userIndex)
    setAllData(data)
  },[])

  const name = allData[indexUser]?.name

  function deletePost(key, index){
    const deletedPost= allData[key].post.filter((val, pos)=> index !== pos)
    const actualData = [...allData]
    actualData[key].post = deletedPost
    const save = JSON.stringify(actualData);
    localStorage.setItem('DataBlog', save);
    setAllData(actualData)
  }

  const dataPosts = allData[indexUser]?.post?.map(({titulo, text, date, author}, index)=>{
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