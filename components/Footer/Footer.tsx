import styles from './Footer.module.scss'

function Footer (): JSX.Element {
  const actualDate = new Date().getFullYear()
  const date = actualDate !== 2022 ? `2021-${actualDate}` : actualDate

  return(
    <main className={styles.container}>
      <footer>Zigh Tech Ltda. {date}</footer>
    </main>
  )
}

export default Footer