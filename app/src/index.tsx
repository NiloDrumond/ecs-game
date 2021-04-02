// import '@assets/fonts/C&C Red Alert [INET]13.ttf';
// import '@assets/fonts/Code16.ttf';
// import '@assets/fonts/Perfect_DOS_VGA_43716.ttf';
// import '@assets/fonts/monogram_extended.ttf';
// import '@assets/fonts/Squarewave16.ttf';
// import './index.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../localization/i18n.config.js';
import App from './App';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </I18nextProvider>,
  document.getElementById('target'),
);
