import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import './global.scss';
import { AuthProvider } from './context/AuthContext'; // <-- импортируем провайдер

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>           {/* <-- оборачиваем всё в AuthProvider */}
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
);
