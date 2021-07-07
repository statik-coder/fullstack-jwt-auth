import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Context } from '..';

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { store } = useContext(Context);

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button
        onClick={() => {
          store.login(email, password);
        }}>
        Login
      </button>
      <button
        onClick={() => {
          store.registration(email, password);
        }}>
        Registration
      </button>
    </div>
  );
};

export default observer(LoginForm);
