// vendors
import { AiTwotoneDelete } from 'react-icons/ai'

// styles
import styles from './Card.module.scss'

type CardProps = {
  titulo: string
  text: string
  author: string
  day: string
  onClick?: () => void
}

function Card ({ titulo, text, author, day, onClick }: CardProps): JSX.Element {
  return (
    <div className={styles.card}>
      <div>
        <h1>{titulo}</h1>
        {onClick &&
          <button onClick={onClick}>
            <AiTwotoneDelete />
          </button>
        }
      </div>
      <p>{text}</p>
      <span> {`${author} | postado em ${day}`} </span>
    </div>
  )
}

export default Card