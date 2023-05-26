import axios from "axios";

const apiUrl = process.env.VUE_APP_API_URL;

const condominiumApi = axios.create({
    baseURL: `${apiUrl}/api/v1`
})

export default condominiumApi;
