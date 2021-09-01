import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

// temporarily cancel all requests until backend is ready
const CancelToken = axios.CancelToken;

axios.interceptors.request.use((request) => {
    return request;
});

const responseHandler = (response) => {
    return response;
}

axios.interceptors.response.use(responseHandler);