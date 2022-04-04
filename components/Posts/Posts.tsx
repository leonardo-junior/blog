// vendors
import { useState, useEffect } from 'react'

// components
import Card from '../Card/Card'

// types
import { LoginProps, PostsProps } from '../../typings/getTypes'

// styles
import styles from './Posts.module.scss'

function Posts() {
  const [allData, setAllData] = useState<LoginProps[]>([])

  useEffect(() => {//pega dados local
    const saved = JSON.parse(localStorage.getItem('DataBlog'))
    setAllData(saved)
  },[])

  const posts = allData?.filter((userInfo) => userInfo.post)
    .flatMap((userInfo) => {
      return userInfo.post
    })
    .sort((a:PostsProps, b:PostsProps) => {
      const firstDate = +new Date(a.date)
      const secondDate = +new Date(b.date)
      return secondDate - firstDate
    })
    // .sort((a, b) => {
    //   return b.number.localeCompare(a.number)
    // })

  const dataPosts = posts?.map(( { titulo, text, date, author }, index ) => {
    const day = new Date(date).toLocaleDateString()

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
