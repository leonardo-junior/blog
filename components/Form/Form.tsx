// types
import { FormProps } from '../../typings/getTypes'

// styles
import styles from './Form.module.scss'

function  Form ({ formValues, message , handleSubmit, handleChange}: FormProps): JSX.Element {
  return(
    <main className={styles.container}>
      <h1>Criar Perfil</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <span>Nome:</span>
        <input type='text' name="name" value={formValues.name || ''} placeholder="Nome" onChange={handleChange} required/>

        <span>E-mail:</span>
        <input type='email' name="email" value={formValues.email || ''} placeholder="E-mail" onChange={handleChange} required/>

        <span>Senha:</span>
        <input type='text' name="password" value={formValues.password || ''} placeholder="Senha" onChange={handleChange} required/>

        <button type='submit'>Criar usuário</button>
      </form>

      <p>{message}</p>
  </main>
  )
}

export default Form