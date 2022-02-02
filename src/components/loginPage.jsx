// @ts-check
import { useFormik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import useAuth from '../hooks/index.jsx';

const DisplayingErrorMessagesSchema = yup.object({
  userName: yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  password: yup.string().max(15, 'Must be 15 characters or less').required('Required'),
});

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: { DisplayingErrorMessagesSchema },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-group">
        <label htmlFor="userName">
          <input
            id="username"
            name="username"
            autoComplete="username"
            onChange={formik.handleChange}
            value={formik.values.userName}
            placeholder="User Name"
            className="form-control"
          />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            autoComplete="current-password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
            className="form-control"
          />
        </label>
      </div>

      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Submit</button>
    </form>
  );
};

const PictureDiv = () => (
  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
    <img src="https://www.seekpng.com/png/full/356-3562377_personal-user.png" className="rounded-circle" alt="Войти" />
  </div>
);

const NavBar = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <a className="navbar-brand" href="/">Hexlet Chat</a>
    </div>
  </nav>
);

const LoginPage = () => (
  <>
    <NavBar />
    <PictureDiv />
    <LoginForm />
  </>
);

export default LoginPage;
