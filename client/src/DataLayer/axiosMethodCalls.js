import axios from 'axios';

// API Axios Get Call.
export const getAPICall = (url) => {
    return axios.get(url);
}
// API Axios Post Call.
export const postAPICall = (url, data) => {
    return axios.post(url, data);
}