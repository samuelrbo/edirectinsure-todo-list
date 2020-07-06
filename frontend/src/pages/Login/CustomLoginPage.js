import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification, required } from 'react-admin';

import axios from 'axios';

export default (props) =>{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginMail, setLoginMail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const login = useLogin();
  const notify = useNotify();
  const register = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8001/api/v1/user/register', { name, email, password })
      .then(r => {
        notify('User created, now you can login')
      })
      .catch((err) => (err.response && err.response.data && err.response.data.error) ?
        notify(err.response.data.error) : notify('Invalid email or password'));
  };

  const submit = (e) => {
    e.preventDefault();

    console.log('Teste')

    login({ email: loginMail, password: loginPass })
      .catch(() => notify('Invalid email or password'));
  };

  return (
    <div>
      <fieldset>
        <legend>Login</legend>

        <form onSubmit={submit}>
          <input name="email" type="email" value={loginMail} onChange={e => setLoginMail(e.target.value)} />
          <input name="password" type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} />

          <button type="submit">Login</button>
        </form>
      </fieldset>

      <fieldset>
        <legend>Register</legend>

        <form onSubmit={register}>
          <input name="name" type="text" value={name} onChange={e => setName(e.target.value)} validate={required()} />
          <input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} validate={required()} />
          <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} validate={required()} />

          <button type="submit">Register</button>
        </form>
      </fieldset>
      <Notification />
    </div>
  );
}
