// @ts-check
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm.jsx';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <Container fluid>
      <Row className="justify-content-center aligh-content-center">
        <Col xxl={5} md={6} sm={10} xs={12}>
          <Card className="shadow-sm text-center">
            <Container fluid>
              <Card.Img variant="top" src="https://www.seekpng.com/png/full/356-3562377_personal-user.png" className="rounded-circle" alt={t('registration.entrance')} />
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
