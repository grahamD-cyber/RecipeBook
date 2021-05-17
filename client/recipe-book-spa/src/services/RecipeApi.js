import axios from "axios";

const url = window.location.origin;

export default axios.create({
    baseURL: `${url}`
})