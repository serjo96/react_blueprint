import React, { SyntheticEvent, useState } from 'react';
import { useAuth } from '~/features/auth/cotext/useAuth';
import registerSchema from '~/features/auth/copmonents/validtionRegister';

const RegistrationForm = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repeatPassword: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

 /* const handleChange = (event: SyntheticEvent) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };*/

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const { error } = registerSchema.validate(formData, { abortEarly: false });

    if (error) {
      const errorMessages: {[key: string]: string} = {};
      error.details.forEach(detail => {
        errorMessages[detail.path[0]] = detail.message;
      });
      setErrors(errorMessages);
      return;
    }

    // register(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Поля формы */}
      <button type="submit">Login</button>
    </form>
  );
};

export default RegistrationForm;
