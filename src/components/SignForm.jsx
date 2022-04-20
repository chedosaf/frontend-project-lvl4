// @ts-check
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form,
} from 'react-bootstrap';
import { setLocale } from 'yup';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.js';
import routes from '../routes.js';

const SignForm = () => {
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

  setLocale({
    mixed: {
      required: t('validationErrors.required'),
      oneOf: t('validationErrors.matchPassword'),
    },
    string: {
      min: ({ min }) => t('validationErrors.min', { value: min }), // Todo: использованить одно сообщение для полей username и password нет возможности, тк тесты Hexlet завязаны на разных сообщениях для каждого из полей
    },
  });

  const DisplayingErrorMessagesSchema = yup.object().shape({
    username: yup.string()
      .min(3, t('validationErrors.signMinNameValidation'))
      .max(20, t('validationErrors.signMinNameValidation'))
      .required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().when('password', {
      is: (val) => (!!(val && val.length > 0)),
      then: yup.string().oneOf(
        [yup.ref('password')],
      ),
    }).required(),
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
        const res = await axios.post(routes.signUpPath(), values);
        auth.logIn(res);
        navigate('/');
      } catch (err) {
        localStorage.clear();
        if (err.response.status === 409) {
          formik.errors.confirmPassword = t('registration.nickNameBusy');
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
        <Form.Label className="visually-hidden" htmlFor="username">{t('registration.userName')}</Form.Label>
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
      <Form.Group>
        <Form.Label className="visually-hidden" htmlFor="confirmPassword">{t('registration.passwordConferm')}</Form.Label>
        <Form.Control
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="current-password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          isInvalid={authFailed || !!formik.errors.confirmPassword}
          placeholder={t('registration.passwordConferm')}
          className="form-control mt-3"
        />
        {formik.errors.confirmPassword
          ? <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
          : null}
      </Form.Group>
      <Button type="submit" className="w-100 mt-3 outline-primary justify-content-center">{t('registration.signUpBtn')}</Button>
    </Form>
  );
};

export default SignForm;
