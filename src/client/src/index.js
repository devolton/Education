import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/linearicons.css';
import './style/font-awesome.min.css';
import './style/bootstrap.css';
import './style/magnific-popup.css';
import './style/nice-select.css';
import './style/animate.min.css';
import './style/owl.carousel.css';
import './style/jquery-ui.css';


import './style/index.css';
import App from './view/Common/containers/App/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
