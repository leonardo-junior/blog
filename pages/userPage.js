import { useState, useEffect } from 'react'

import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'

export default function UserPage () {
  const [allData, setAllData] = useState([])
  const [indexUser, setIndexUser] = useState()

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem('DataBlog')) || []
    const userLogged = JSON.parse(localStorage.getItem('Logged'))[1]
    const userIndex = data.findIndex((val)=>val.email === userLogged)
    setIndexUser(userIndex)
    setAllData(data)
  },[])

  const name = allData[indexUser]?.name || ''

  function deletePost(key, index){
    const deletedPost= allData[key].post.filter((val, pos)=> index !== pos)
    const actualData = [...allData]
    actualData[key].post = deletedPost
    const save = JSON.stringify(actualData);
    localStorage.setItem('DataBlog', save);
    setAllData(actualData)
  }

  const dataPosts = allData[indexUser]?.post?.map(({titulo, text, date}, index)=>{
    const day = new Date(date).toLocaleDateString()
    const hour = new Date(date).toLocaleTimeString()
    return (
      <div key={ index }>
        <h1>{titulo}</h1>
        <h2>{text}</h2>
        <h3>{allData[indexUser].name}</h3>
        <h4>{day}</h4>
        <h4>{hour}</h4>
        <button onClick={()=>deletePost(indexUser, index)}>Deletar Post</button>
      </div>
    )
  }).reverse()

  function handleLogout (){
    localStorage.setItem('Logged', 'false');
    Router.push('/')
  }

  return (
    <div>
      <Head>
        <title>User Page</title>
        <meta name="description" content="User page" />
        <link rel="icon" href="images/favicon.ico" />
      </Head>
      <main>
        <Link href='/'><a>Página Inicial</a></Link>
        <button onClick={handleLogout}>Logout</button>
        <h1>Olá, {name}</h1>
        <h2>{dataPosts}</h2>
      </main>
    </div>
  )
}