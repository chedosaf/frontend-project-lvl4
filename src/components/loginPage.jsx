// @ts-check
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Container, Row, Col,
} from 'react-bootstrap';
import useAuth from '../hooks/index.jsx';

const DisplayingErrorMessagesSchema = yup.object().shape({
  username: yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  password: yup.string().max(15, 'Must be 15 characters or less').required('Required'),
});

const LoginForm = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: DisplayingErrorMessagesSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/v1/login', values);
        auth.logIn();
        localStorage.setItem('userId', JSON.stringify(res.data));
        navigate('/');
      } catch (err) {
        localStorage.clear();
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.focus();
          return;
        }
        throw err;
      }
    },
  });
  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="mt-3 mt-mb-0">
      <Form.Group>
        <Form.Label htmlFor="userName" />
        <Form.Control
          id="username"
          name="username"
          autoComplete="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="User Name"
          className="form-control"
          isInvalid={authFailed || !!formik.errors.username}
          ref={inputRef}
        />
        {formik.errors.username
          ? <div className="invalid-feedback">{formik.errors.username}</div>
          : null}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password" />
        <Form.Control
          id="password"
          name="password"
          autoComplete="current-password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={authFailed || !!formik.errors.password}
          placeholder="Password"
          className="form-control"
        />
        {formik.errors.password
          ? <div className="invalid-feedback">{formik.errors.password}</div>
          : null}
      </Form.Group>
      <Button type="submit" className="w-100 mt-3 outline-primary justify-content-center">Submit</Button>
    </Form>
  );
};

const PictureDiv = () => (
  <div className=" d-flex justify-content-center">
    <img src="https://www.seekpng.com/png/full/356-3562377_personal-user.png" className="rounded-circle" alt="Войти" />
  </div>
);

const LoginPage = () => (
  <Container>
    <Row className="justify-content-center">
      <Col md={8}>
        <PictureDiv />
        <LoginForm />
      </Col>
    </Row>
  </Container>
);

export default LoginPage;
