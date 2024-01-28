// ErrorPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Упс, произошла ошибка!</h1>
      <p>Мы уже работаем над её устранением. Приносим извинения за неудобства.</p>
      <p>Попробуйте:</p>
      <ul>
        <li>Перезагрузить страницу</li>
        <li>Вернуться на <Link to="/">главную страницу</Link></li>
        <li>Связаться с нами, если проблема повторится</li>
      </ul>
    </div>
  );
};

export default ErrorPage;
