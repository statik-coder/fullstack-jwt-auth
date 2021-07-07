import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { Context } from '.';
import './App.css';
import LoginForm from './components/LoginForm';
import { IUser } from './models/IUser';
import UserService from './service/UserService';

function App() {
  const { store } = useContext(Context);

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuth) {
    return (
      <>
        <h1>Not logined</h1>
        <LoginForm />
        <button onClick={() => getUsers()}>Get all users</button>
      </>
    );
  }

  return (
    <div className="App">
      <h1>{`Logined as ${store.user.email}`}</h1>
      <h4>{store.user.isActivated ? 'User is activated' : 'NOT ACTIVATED'}</h4>
      <button onClick={() => store.logout()}>Logout</button>
      <button onClick={() => getUsers()}>Get all users</button>
      <div>
        {users.map((user) => (
          <div key={user.email}>{user.email}</div>
        ))}
      </div>
    </div>
  );
}

export default observer(App);
