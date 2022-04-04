// types
import { FormProps } from '../../typings/getTypes'

// styles
import styles from '../Login/Login.module.scss'

function Login ({ formValues, handleSubmit, handleChange }: FormProps): JSX.Element {
    return (
    <main className={styles.container}>
      <h1>Logar</h1>
      <form  onSubmit={handleSubmit} className={styles.form}>
        <span>E-mail:</span>
        <input type="text" name="emailLogin" value={formValues.emailLogin || ''} placeholder="Usuário" onChange={handleChange} />

        <span>Senha:</span>
        <input type="text" name="passwordLogin" value={formValues.passwordLogin || ''} placeholder="Password" onChange={handleChange} />

        <button type="submit">Verificar</button>
      </form>
    </main>
  )
}

export default Login