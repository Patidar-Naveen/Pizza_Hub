import axios from 'axios';
import {MAIN_URL} from './Url'  
 
export function getPosts(){
    return axios.get(`${MAIN_URL}posts/getpost`)
}
export function addUser(data){
    return axios.post(`${MAIN_URL}posts/addUser`,data)
}

// export function fetchdata(){ changed to validation
//     return axios.get(`${MAIN_URL}posts/fetchdata`)
// }
export function placeOrder(data){
    return axios.post(`${MAIN_URL}posts/placeorder`,data) 
}
export function allorders(){
    return axios.get(`${MAIN_URL}posts/allorders`) 
}
export function validation(data){
    return axios.post(`${MAIN_URL}posts/validate`,data) 
}