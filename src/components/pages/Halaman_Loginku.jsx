import React, { useState } from 'react';
import axios from 'axios';
import { api_url_satuadmin } from '../../api/axiosConfig';

const apiurl = import.meta.env.VITE_API_URL;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await api_url_satuadmin.post('loginuser', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      if (res.data.role === 'admin') {
        window.location.href = '/Dashboard';
      } else {
        window.location.href = '/Dashboard';
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={loginUser}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
