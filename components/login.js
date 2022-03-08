import styles from '../styles/form-new-user.module.css';

export default function Login (props) {
    return (
    <main className={styles.container}>
      <h1>Logar</h1>
      <form  onSubmit={props.handleSubmitLogin} className={styles.form}>
        <span>E-mail:</span>
        <input type="text" name="emailLogin" value={props.formValues.emailLogin || ''} placeholder="Usuário" onChange={props.handleChange} />
        <span>Senha:</span>
        <input type="text" name="passwordLogin" value={props.formValues.passwordLogin || ''} placeholder="Password" onChange={props.handleChange} />
        <button type="submit">Verificar</button>
      </form>
      {/* <button onClick={props.handleLogout}>Logout</button> */}
    </main>
  )
}