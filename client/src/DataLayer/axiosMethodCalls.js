import axios from 'axios';

// API Axios Get Call.
export const getAPICall = (url, data={}) => {
    return axios.get(url, {params: data});
}
// API Axios Post Call.
export const postAPICall = (url, data) => {
    return axios.post(url, data);
}