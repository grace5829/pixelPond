import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import  { AppRoutes, Navbar, PhotoFolders } from './components/index';
import { AuthContextProvider } from './components/AuthContext';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthContextProvider>
    <Navbar/>
    <App/>
    </AuthContextProvider>
    </Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
