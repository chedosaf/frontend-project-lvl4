// @ts-check
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Container, Row, Col, Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';

const LoginForm = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, []);

  const DisplayingErrorMessagesSchema = yup.object().shape({
    username: yup.string()
      .min(3, t('validationErrors.min'))
      .max(20, t('validationErrors.max'))
      .required(t('validationErrors.required')),
    password: yup.string().min(6, t('validationErrors.minPassword')).required(t('validationErrors.required')),
    confirmPassword: yup.string().when('password', {
      is: (val) => (!!(val && val.length > 0)),
      then: yup.string().oneOf(
        [yup.ref('password')],
        t('validationErrors.matchPassword'),
      ),
    }),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: DisplayingErrorMessagesSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/v1/signup', values);
        auth.logIn();
        localStorage.setItem('userId', JSON.stringify(res.data));
        navigate('/');
      } catch (err) {
        localStorage.clear();
        if (err.response.status === 409) {
          formik.errors.confirmPassword = 'Имя пользователя занято';
          setAuthFailed(true);
          inputRef.current.focus();
          return;
        } if (err.isAxiosError && err.response.status === 401) {
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
          placeholder={t('registration.userName')}
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
          placeholder={t('registration.password')}
          className="form-control"
        />
        {formik.errors.password
          ? <div className="invalid-feedback">{formik.errors.password}</div>
          : null}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="confirmPassword" />
        <Form.Control
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="current-password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          isInvalid={authFailed || !!formik.errors.confirmPassword}
          placeholder={t('registration.passwordConferm')}
          className="form-control"
        />
        {formik.errors.confirmPassword
          ? <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
          : null}
      </Form.Group>
      <Button type="submit" className="w-100 mt-3 outline-primary justify-content-center">{t('registration.signUp')}</Button>
    </Form>
  );
};

const SignPage = () => {
  const { t } = useTranslation();
  return (
    <Container fluid>
      <Row className="justify-content-center aligh-content-center">
        <Col xxl={5} md={6} sm={10} xs={12}>
          <Card className="shadow-sm text-center">
            <Container fluid>
              <Card.Img variant="top" src="https://icons.veryicon.com/png/o/miscellaneous/esgcc-basic-icon-library/register-14.png" className="rounded-circle" alt="Войти" />
            </Container>
            <Card.Body>
              <Card.Title>{t('registration.signUp')}</Card.Title>
              <LoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignPage;
