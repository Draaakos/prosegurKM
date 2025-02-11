import { useState } from 'react';
import authService from '../../services/auth.service.js';
import css from './index.css';



const HomeApp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    authService.login({ email, password })
      .then((response) => {
        if (response.error) {
          alert('Credenciales incorrectas')
        } else {
          window.location.href = '/dashboard'
        }
      })
  };

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
              <div><input type="text" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)}/></div>
              <div><input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/></div>
              <div><button onClick={handleLogin}>Login</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};


export default HomeApp;
