//vendors
import Head from 'next/head'

//components
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

//styles
import styles from './Layout.module.scss'

function Layout({children, title, description}){
  return(
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="images/favicon.ico" />
      </Head>

     <div className={styles.container}>
      <Header/>

      {children}

      <Footer/>
     </div>
    </>
  )
}

export default Layout