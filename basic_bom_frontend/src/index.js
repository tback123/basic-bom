import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// Axios Defaults -- Means that any Axios request will have these parameters
// Taken from: https://stackoverflow.com/questions/51794553/how-do-i-create-configuration-for-axios-for-default-request-headers-in-every-htt
axios.defaults.baseURL = 'http://localhost:3001/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Request Defaults
axios.interceptors.request.use(request => {
    console.log(request); // Log Every Request
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

// Response Defaults
axios.interceptors.response.use(response => {
    console.log(response); // Log Every Response
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

// Main React Render Method
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
