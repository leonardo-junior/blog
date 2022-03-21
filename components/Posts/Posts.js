import { useState, useEffect } from 'react'

import styles from './Posts.module.scss'

function Posts() {
  const [allData, setAllData] = useState()

  useEffect(()=>{//pega dados local
    const saved = JSON.parse(localStorage.getItem('DataBlog')) || []
    setAllData(saved)
  },[])

  const postOnly = allData?.filter((val)=>val.post)
    .flatMap((val)=>{
      return val.post
    })
    .sort((a,b)=>new Date(b.date)- new Date(a.date))

    // .sort((a, b) => {
    //   return b.number.localeCompare(a.number)
    // })

  const dataPosts = postOnly?.map(( { titulo, text, date, author }, index )=>{
  const day = new Date(date).toLocaleDateString()
  const hour = new Date(date).toLocaleTimeString()
    return (
      <div key={index}>
        <h1>{titulo}</h1>
        <h2>{text}</h2>
        <h4>{author}</h4>
        <h4>{day}</h4>
        <h4>{hour}</h4>
      </div>
    )
  })

  return (
    <div className={styles.container}>
      <h1>Últimos Posts</h1>
      <div>
        {dataPosts}
      </div>
    </div>
  )
}

export default Posts
