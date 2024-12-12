import css from './index.css';


const HomeApp = () => {
  return (
    <div className={css.page}>
      <div className={css.content}>
        <div className={css.leftContent}>
          <div>
            <div className={css.title}>Bienvenido de vuelta!</div>
            <div>Para mantenerte conectado con nosotros, inicia sesión con tus datos personales.</div>
          </div>
        </div>
        <div className={css.rightContent}>
          <div className={css.formContent}>
            <div className={css.title}>INICIAR SESION</div>
            <div>
              <div><input type="text" placeholder="example@gmail.com"/></div>
              <div><input type="password" placeholder="password"/></div>
              <div><button>Login</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};


export default HomeApp;
