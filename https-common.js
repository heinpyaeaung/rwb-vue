import axios from 'axios'

export default axios.create({
    // baseURL: 'http://localhost:3000/api',
    // baseURL: 'https://rwb-app.herokuapp.com/api',
    baseURL: 'https://rwb-production.up.railway.app/api',
    headers: {
        "Content-type": "application/json",
    }
})