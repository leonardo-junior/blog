//vendors
import clsx from 'clsx'
import { useState, useEffect } from "react"
import Link from "next/link"
import Router from "next/router"
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'


//styles
import styles from './Menu.module.scss'

function Menu () {
  const [isOpen, setIsOpen] = useState(false)

  function handleToggleMenu () {
    setIsOpen(!isOpen)
  }

  const [redirectUserPage, setRedirectUserPage] = useState("/login");

  useEffect(()=>{//pega dados local
    const userLogged = JSON.parse(localStorage.getItem("Logged")) || false

    if(userLogged[0]) {
      setRedirectUserPage("/user-page")
    }else{
      setRedirectUserPage("/login")
    }
  },[])

  function handleLogout (){
    localStorage.setItem("Logged", "false")
    setRedirectUserPage("/login")
    Router.push("/")
  }


  return(
    <div className={clsx({
      [styles.container]: true,
      [styles.open]: isOpen,
    })}>
      <button className={styles.button} onClick={handleToggleMenu}>
        <div className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <ul className={styles.menu}>
        <Link href={'/'}>
          <a className={styles.items}>
            <li>
              <AiOutlineHome />

              Home
            </li>
          </a>
        </Link>

        <Link href={redirectUserPage}>
          <a className={styles.items}>
            <li>
              <AiOutlineUser />

              Perfil
            </li>
          </a>
        </Link>

        {redirectUserPage === "/user-page" &&
          <span className={styles.items} onClick={handleLogout}>
            <li>
                  <FiLogOut />

                  Sair
            </li>
          </span>
        }
      </ul>
    </div>
  )
}

export default Menu