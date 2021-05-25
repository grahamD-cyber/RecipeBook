import axios from "axios";

//const url = 'http://localhost:5000';
const url = 'http://localhost:5000';

export default axios.create({
    baseURL: `${url}`
})