import styles from '../styles/form-new-user.module.css';

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

        <span>Telefone:</span>
        <input type='phone' placeholder="(xx) xxxxx-xxxx" name="phone" value={props.formValues.phone || ''} onChange={props.handleChange}/>

        <span>Mídia Social:</span>
        <select name="social" value={props.formValues.social || ''} onChange={props.handleChange} >
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
        </select>

        <span>Biografia:</span>
        <textarea name="bio" value={props.formValues.bio || ''} onChange={props.handleChange} placeholder="Diga algo sobre você!"/>

        <span>Bebida favorita:</span>
        <div className={styles.radios}>
          <label>
            <input type="radio" name="drink" value="coffee" checked={props.formValues.drink==="coffee"} onChange={props.handleChange} />
            Café
          </label>
          <label>
            <input type="radio" name="drink" value="tea" checked={props.formValues.drink==="tea"}  onChange={props.handleChange} />
            Chá
          </label>
          <label>
            <input type="radio" name="drink" value="alcool" checked={props.formValues.drink==="alcool"}  onChange={props.handleChange} />
            Álcool
          </label>
        </div>
        <button type='submit'>Submit</button>
      </form>
      <p>{props.message}</p>
  </main>
  )
}

export default Form