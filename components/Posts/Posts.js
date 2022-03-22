// vendors
import { useState, useEffect } from 'react'

// components
import Card from '../Card/Card';

// styles
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
    // const hour = new Date(date).toLocaleTimeString()

    return (
      <Card titulo={titulo} text={text} author={author} day={day} key={index}/>
    )
  })

  return (
    <div className={styles.container}>
        {dataPosts}
    </div>
  )
}

export default Posts
