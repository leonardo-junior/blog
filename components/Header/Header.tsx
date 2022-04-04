//vendors
import Link from "next/link"

//components
import Menu from '../Menu/Menu'

//styles
import styles from '../Header/Header.module.scss'

function Header (): JSX.Element {
  return(
    <nav className={styles.container}>
      <div className={styles.content}>
        <Link href="/">
          <a>Blog Page</a>
        </Link>

        <Menu />
      </div>
    </nav>
  )
}

export default Header