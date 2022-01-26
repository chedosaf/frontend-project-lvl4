// @ts-check
import { useFormik } from 'formik';
import * as yup from 'yup';

const React = require('react');

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="userName">
        User Name
        <input
          id="userName"
          name="userName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.userName}
        />
      </label>

      <label htmlFor="password">
        Pasword
        <input
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
  <label htmlFor="email">
    Email
    <input id="email" name="email" type="email" placeholder="Email Address" />
  </label>;
