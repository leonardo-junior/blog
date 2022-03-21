//vendors
import Link from 'next/link'

//components
import Posts from '../components/Posts/Posts.js'
import Layout from '../components/Layout/Layout.js'

//styles
import styles from '../styles/index.module.css'

function Home (){
  return (
    <Layout title={'Blog'} description={"Página Inicial"}>
      <main className={styles.container}>
        <h1>Página Inicial</h1>

        <Link href="/create-post">
          <a >CreatePostPage</a>
        </Link>

        <Posts />
      </main>
    </Layout>
  )
}

export default Home