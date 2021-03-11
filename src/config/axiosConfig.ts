import axios from 'axios'

export const axiosConfig = axios.create(
    {
        baseURL: `${process.env.REACT_APP_URL}` , 
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        }
    }
)