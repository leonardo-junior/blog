//vendors
// import { useState, useEffect } from "react"
import Link from "next/link"
// import Router from "next/router"

//components
import Menu from '../Menu/Menu.js'

//styles
import styles from '../Header/Header.module.scss'

function Header(){
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