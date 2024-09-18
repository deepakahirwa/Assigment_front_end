import axios from 'axios';

const conf = {
    baseURL: 'https://walrus-app-jxzri.ondigitalocean.app/',
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
