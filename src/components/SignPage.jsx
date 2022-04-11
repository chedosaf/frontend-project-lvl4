// @ts-check
import React from 'react';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SignForm from './SignForm.jsx';

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
              <SignForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignPage;
