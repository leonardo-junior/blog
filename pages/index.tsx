//vendors
import Link from 'next/link'
import { BsPlusSquareDotted } from 'react-icons/bs'

//components
import Posts from '../components/Posts/Posts'
import Layout from '../components/Layout/Layout'

//styles
import styles from '../styles/index.module.scss'

function Home (): JSX.Element {
  return (
    <Layout title='Blog' description="Página Inicial">
      <main className={styles.container}>
        <div className={styles.header}>
          <h1>Página Inicial</h1>

          <Link href="/create-post">
            <a title='Nova postagem'>
              <BsPlusSquareDotted />
            </a>
          </Link>
        </div>

        <Posts />
      </main>
    </Layout>
  )
}

export default Home