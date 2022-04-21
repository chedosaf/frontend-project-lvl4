// @ts-check
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.js';
import routes from '../routes.js';

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
        const res = await axios.post(routes.loginPath(), values);
        auth.logIn(res);
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
        <Form.Label className="visually-hidden" htmlFor="username">{t('registration.userNick')}</Form.Label>
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
        <Form.Label className="visually-hidden" htmlFor="password">{t('registration.password')}</Form.Label>
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

export default LoginForm;
