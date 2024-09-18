import axios from 'axios';

const conf = {
    baseURL: 'http://localhost:8500',
    email: String(process.env.EMAIL),
    password: String(process.env.PASSWORD)
};


console.log(conf);

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: conf.baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    maxBodyLength: Infinity,
});





export { conf, axiosInstance };
