//vendors
import Link from 'next/link'
import { BsPlusSquareDotted } from 'react-icons/bs'

//components
import Posts from '../components/Posts/Posts.js'
import Layout from '../components/Layout/Layout.js'

//styles
import styles from '../styles/index.module.scss'

function Home (){
  return (
    <Layout title='Blog' description="Página Inicial">
      <main className={styles.container}>
        <div className={styles.header}>
          <h1>Página Inicial</h1>

          <Link href="/create-post">
            <a title='Nova postagem'><BsPlusSquareDotted /></a>
          </Link>
        </div>

        <Posts />
      </main>
    </Layout>
  )
}

export default Home