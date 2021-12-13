// Define all HTTP Axios methods.
import { getAPICall, postAPICall } from './axiosMethodCalls';
import { getAllPropertyUrl, createPropertyUrl } from '../configuration/urlConfig';
import "regenerator-runtime/runtime";

export const getAllProperty = async(data) => {
    let response = await getAPICall(getAllPropertyUrl, data);
    return response.data || [];
}
export const createProperty = async(data) => {
    let response = await postAPICall(createPropertyUrl, data);
    return response || [];
}