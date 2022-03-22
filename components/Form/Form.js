import styles from './Form.module.scss';

function  Form(props) {
  return(
    <main className={styles.container}>
      <h1>Criar Perfil</h1>

      <form onSubmit={props.handleSubmit} className={styles.form}>
        <span>Nome:</span>
        <input type='text' name="name" value={props.formValues.name || ''} placeholder="Nome" onChange={props.handleChange} required/>

        <span>E-mail:</span>
        <input type='email' name="email" value={props.formValues.email || ''} placeholder="E-mail" onChange={props.handleChange} required/>

        <span>Senha:</span>
        <input type='text' name="password" value={props.formValues.password || ''} placeholder="Senha" onChange={props.handleChange} required/>

        <button type='submit'>Submit</button>
      </form>
      <p>{props.message}</p>
  </main>
  )
}

export default Form