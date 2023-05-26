import axios from "axios";

const condominiumApi = axios.create({
    baseURL: "https://condominium.tecnolip.com/api/v1"
})

export default condominiumApi;
