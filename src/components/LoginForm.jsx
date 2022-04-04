// @ts-check
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Button, Form, Container, Row, Col, Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, []);

  const DisplayingErrorMessagesSchema = yup.object().shape({
    username: yup.string()
      .required(t('validationErrors.required')),
    password: yup.string().required(t('validationErrors.required')),
  });

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
          formik.errors.password = t('registration.loginFailure');
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
        <Form.Label className="visually-hidden" htmlFor="username">Ваш ник</Form.Label>
        <Form.Control
          id="username"
          name="username"
          autoComplete="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder={t('registration.userNick')}
          className="form-control"
          isInvalid={authFailed || !!formik.errors.username}
          ref={inputRef}
        />
        {formik.errors.username
          ? <div className="invalid-feedback">{formik.errors.username}</div>
          : null}
      </Form.Group>
      <Form.Group>
        <Form.Label className="visually-hidden" htmlFor="password">Пароль</Form.Label>
        <Form.Control
          id="password"
          name="password"
          autoComplete="current-password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={authFailed || !!formik.errors.password}
          placeholder={t('registration.password')}
          className="form-control mt-3"
        />
        {formik.errors.password
          ? <div className="invalid-feedback">{formik.errors.password}</div>
          : null}
      </Form.Group>
      <Button type="submit" className="w-100 mt-3 outline-primary justify-content-center">{t('registration.entrance')}</Button>
    </Form>
  );
};

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <Container fluid>
      <Row className="justify-content-center aligh-content-center">
        <Col xxl={5} md={6} sm={10} xs={12}>
          <Card className="shadow-sm text-center">
            <Container fluid>
              <Card.Img variant="top" src="https://www.seekpng.com/png/full/356-3562377_personal-user.png" className="rounded-circle" alt="Войти" />
            </Container>
            <Card.Body>
              <Card.Title>{t('registration.entrance')}</Card.Title>
              <LoginForm />
            </Card.Body>
            <Card.Footer>
              <div>
                {t('registration.noAccaunt')}
                {' '}
                <Link to="/signup">{t('registration.signUp')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
