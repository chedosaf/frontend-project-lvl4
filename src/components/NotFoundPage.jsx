// @ts-check
import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100">
      <div className="text-center">
        <img alt="Страница не найдена" className="img-fluid" src="https://cdn2.hexlet.io/assets/error-pages/404-34f20d4d98c81c575950c89d4c49027513d0bb3f6adbb3ed85ca0923496f65df.png" />
        <h1 className="h4 text-muted">
          {t('unfoundPage')}
        </h1>
        <p className="text-muted">
          {t('goTo')}
          {' '}
          <a href="/">{t('mainPageLink')}</a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
