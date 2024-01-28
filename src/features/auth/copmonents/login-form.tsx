import React, { SyntheticEvent, useState } from 'react';
import { useAuth } from '~/features/auth/cotext/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      // Используем значения состояния name и password
      await login({ name, password });
      // Обработка ответа от login
      navigate('/calendar')
    } catch (error) {

    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
